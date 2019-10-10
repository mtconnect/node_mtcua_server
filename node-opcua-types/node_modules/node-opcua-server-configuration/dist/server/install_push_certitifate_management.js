"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module node-opcua-server-configuration-server
 */
const chalk_1 = require("chalk");
const fs = require("fs");
const os = require("os");
const path = require("path");
const util_1 = require("util");
const node_opcua_assert_1 = require("node-opcua-assert");
const node_opcua_crypto_1 = require("node-opcua-crypto");
const node_opcua_debug_1 = require("node-opcua-debug");
const node_opcua_hostname_1 = require("node-opcua-hostname");
const push_certificate_manager_helpers_1 = require("../push_certificate_manager_helpers");
const debugLog = node_opcua_debug_1.make_debugLog("ServerConfiguration");
const errorLog = node_opcua_debug_1.make_errorLog("ServerConfiguration");
const doDebug = node_opcua_debug_1.checkDebugFlag("ServerConfiguration");
function getCertificate() {
    if (!this.$$certificate) {
        const certificateChain = getCertificateChain.call(this);
        this.$$certificate = node_opcua_crypto_1.split_der(certificateChain)[0];
    }
    return this.$$certificate;
}
function getCertificateChain() {
    if (!this.$$certificateChain) {
        throw new Error("internal Error. cannot find $$certificateChain");
    }
    return this.$$certificateChain;
}
function getPrivateKey() {
    if (!this.$$privateKeyPEM) {
        throw new Error("internal Error. cannot find $$privateKeyPEM");
    }
    return this.$$privateKeyPEM;
}
function getIpAddresses() {
    return __awaiter(this, void 0, void 0, function* () {
        const ipAddresses = [];
        const ifaces = os.networkInterfaces();
        for (const ifname of Object.keys(ifaces)) {
            for (const iface of ifaces[ifname]) {
                if ("IPv4" !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    continue;
                }
                ipAddresses.push(iface.address);
            }
        }
        return ipAddresses;
    });
}
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.$$privateKeyPEM) {
            this.$$privateKeyPEM =
                yield util_1.promisify(fs.readFile)(this.serverCertificateManager.privateKey, "utf8");
        }
        if (!this.$$certificateChain) {
            const certificateFile = path.join(this.serverCertificateManager.rootDir, "own/certs/certificate.pem");
            const exists = yield (util_1.promisify(fs.exists)(certificateFile));
            if (!exists) {
                // this is the first time server is launch
                // let's create a default self signed certificate with limited validity
                const fqdn = yield node_opcua_hostname_1.getFullyQualifiedDomainName();
                const ipAddresses = yield getIpAddresses();
                const applicationUri = (this.serverInfo ? this.serverInfo.applicationUri : null) || "uri:MISSING";
                const options = {
                    applicationUri: this.serverInfo.applicationUri,
                    dns: [fqdn],
                    ip: ipAddresses,
                    subject: "/CN=MyCommonName;/L=Paris",
                    startDate: new Date(),
                    validity: 365 * 5,
                    /* */
                    outputFile: certificateFile
                };
                debugLog("creating self signed certificate", options);
                yield this.serverCertificateManager.createSelfSignedCertificate(options);
            }
            const certificatePEM = yield util_1.promisify(fs.readFile)(certificateFile, "utf8");
            this.$$certificateChain = node_opcua_crypto_1.convertPEMtoDER(certificatePEM);
        }
    });
}
function getCertificateChainEP() {
    const certificateFile = path.join(this.certificateManager.rootDir, "own/certs/certificate.pem");
    const certificatePEM = fs.readFileSync(certificateFile, "utf8");
    const $$certificateChain = node_opcua_crypto_1.convertPEMtoDER(certificatePEM);
    const thumbprint = node_opcua_crypto_1.makeSHA1Thumbprint($$certificateChain);
    return $$certificateChain;
}
function getPrivateKeyEP() {
    const $$privateKeyPEM = fs.readFileSync(this.certificateManager.privateKey, "utf8");
    return $$privateKeyPEM;
}
function onCertificateAboutToChange(server) {
    return __awaiter(this, void 0, void 0, function* () {
        debugLog(chalk_1.default.yellow(" onCertificateAboutToChange => Suspending End points"));
        yield server.suspendEndPoints();
        debugLog(chalk_1.default.yellow(" onCertificateAboutToChange => End points suspended"));
    });
}
/**
 * onCertificateChange is called when the serverConfiguration notifies
 * that the server certificate and/or private key has changed.
 *
 * this function suspends all endpoint listeners and stop all existing channels
 * then start all endpoint listener
 *
 * @param server
 */
function onCertificateChange(server) {
    return __awaiter(this, void 0, void 0, function* () {
        debugLog("on CertificateChanged");
        const _server = server;
        _server.$$privateKeyPEM = fs.readFileSync(server.serverCertificateManager.privateKey, "utf8");
        const certificateFile = path.join(server.serverCertificateManager.rootDir, "own/certs/certificate.pem");
        const certificatePEM = fs.readFileSync(certificateFile, "utf8");
        const privateKeyFile = server.serverCertificateManager.privateKey;
        const privateKeyPEM = fs.readFileSync(privateKeyFile, "utf8");
        // also reread the private key
        _server.$$certificateChain = node_opcua_crypto_1.convertPEMtoDER(certificatePEM);
        _server.$$privateKeyPEM = privateKeyPEM;
        // note : $$certificate will be reconstructed on demand
        _server.$$certificate = undefined;
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                debugLog(chalk_1.default.yellow(" onCertificateChange => shutting down channels"));
                yield server.shutdownChannels();
                debugLog(chalk_1.default.yellow(" onCertificateChange => channels shut down"));
                debugLog(chalk_1.default.yellow(" onCertificateChange => resuming end points"));
                yield server.resumeEndPoints();
                debugLog(chalk_1.default.yellow(" onCertificateChange => end points resumed"));
                debugLog(chalk_1.default.yellow("channels have been closed -> client should reconnect "));
            }
            catch (err) {
                // tslint:disable:no-console
                errorLog("Error in CertificateChanged handler ", err.message);
                debugLog("err = ", err);
            }
        }), 2000);
    });
}
function installPushCertificateManagementOnServer(server) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!server.engine.addressSpace) {
            throw new Error("Server must have a valid address space." +
                "you need to call installPushCertificateManagementOnServer after server has been initialized");
        }
        yield install.call(server);
        server.getCertificate = getCertificate;
        server.getCertificateChain = getCertificateChain;
        server.getPrivateKey = getPrivateKey;
        for (const endpoint of server.endpoints) {
            const endpointPriv = endpoint;
            endpointPriv._certificateChain = null;
            endpointPriv._privateKey = null;
            endpoint.getCertificateChain = getCertificateChainEP;
            endpoint.getPrivateKey = getPrivateKeyEP;
            for (const e of endpoint.endpointDescriptions()) {
                // e.serverCertificate = null;
                e.__defineGetter__("serverCertificate", function () {
                    return endpoint.getCertificateChain();
                });
            }
        }
        yield push_certificate_manager_helpers_1.installPushCertificateManagement(server.engine.addressSpace, {
            applicationGroup: server.serverCertificateManager,
            userTokenGroup: server.userCertificateManager
        });
        const serverConfiguration = server.engine.addressSpace.rootFolder.objects.server.serverConfiguration;
        const serverConfigurationPriv = serverConfiguration;
        node_opcua_assert_1.assert(serverConfigurationPriv.$pushCertificateManager);
        serverConfigurationPriv.$pushCertificateManager.on("CertificateAboutToChange", (actionQueue) => {
            actionQueue.push(() => __awaiter(this, void 0, void 0, function* () {
                debugLog("CertificateAboutToChange Event received");
                yield onCertificateAboutToChange(server);
                debugLog("CertificateAboutToChange Event processed");
            }));
        });
        serverConfigurationPriv.$pushCertificateManager.on("CertificateChanged", (actionQueue) => {
            actionQueue.push(() => __awaiter(this, void 0, void 0, function* () {
                debugLog("CertificateChanged Event received");
                yield onCertificateChange(server);
                debugLog("CertificateChanged Event processed");
            }));
        });
    });
}
exports.installPushCertificateManagementOnServer = installPushCertificateManagementOnServer;
//# sourceMappingURL=install_push_certitifate_management.js.map