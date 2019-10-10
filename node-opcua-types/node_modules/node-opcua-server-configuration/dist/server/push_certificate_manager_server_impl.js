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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module node-opcua-server-configuration-server
 */
const events_1 = require("events");
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const node_opcua_assert_1 = require("node-opcua-assert");
const node_opcua_basic_types_1 = require("node-opcua-basic-types");
const node_opcua_crypto_1 = require("node-opcua-crypto");
const node_opcua_crypto_2 = require("node-opcua-crypto");
const node_opcua_debug_1 = require("node-opcua-debug");
const node_opcua_nodeid_1 = require("node-opcua-nodeid");
const node_opcua_pki_1 = require("node-opcua-pki");
const debugLog = node_opcua_debug_1.make_debugLog("ServerConfiguration");
const errorLog = node_opcua_debug_1.make_errorLog("ServerConfiguration");
const doDebug = node_opcua_debug_1.checkDebugFlag("ServerConfiguration");
const defaultApplicationGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultApplicationGroup");
const defaultHttpsGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultHttpsGroup");
const defaultUserTokenGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultUserTokenGroup");
/**
 * check that the given certificate matches the given private key
 * @param certificate
 * @param privateKey
 */
function certificateMatchesPrivateKeyPEM(certificate, privateKey) {
    const initialBuffer = Buffer.from("Lorem Ipsum");
    const encryptedBuffer = node_opcua_crypto_2.publicEncrypt_long(initialBuffer, certificate, 256, 11);
    const decryptedBuffer = node_opcua_crypto_2.privateDecrypt_long(encryptedBuffer, privateKey, 256);
    return initialBuffer.toString("ascii") === decryptedBuffer.toString("ascii");
}
function certificateMatchesPrivateKey(certificate, privateKey) {
    const certificatePEM = node_opcua_crypto_1.toPem(certificate, "CERTIFICATE");
    const privateKeyPEM = node_opcua_crypto_1.toPem(privateKey, "RSA PRIVATE KEY");
    return certificateMatchesPrivateKeyPEM(certificatePEM, privateKeyPEM);
}
exports.certificateMatchesPrivateKey = certificateMatchesPrivateKey;
function findCertificateGroupName(certificateGroupNodeId) {
    if (typeof certificateGroupNodeId === "string") {
        return certificateGroupNodeId;
    }
    if (node_opcua_nodeid_1.sameNodeId(certificateGroupNodeId, node_opcua_nodeid_1.NodeId.nullNodeId) ||
        node_opcua_nodeid_1.sameNodeId(certificateGroupNodeId, defaultApplicationGroup)) {
        return "DefaultApplicationGroup";
    }
    if (node_opcua_nodeid_1.sameNodeId(certificateGroupNodeId, defaultHttpsGroup)) {
        return "DefaultHttpsGroup";
    }
    if (node_opcua_nodeid_1.sameNodeId(certificateGroupNodeId, defaultUserTokenGroup)) {
        return "DefaultUserTokenGroup";
    }
    return "";
}
function copyFile(source, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            debugLog("copying file \n source ", source, "\n =>\n dest ", dest);
            const sourceExist = yield util_1.promisify(fs.exists)(source);
            if (sourceExist) {
                yield util_1.promisify(fs.copyFile)(source, dest);
            }
        }
        catch (err) {
            errorLog(err);
        }
    });
}
exports.copyFile = copyFile;
function deleteFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield util_1.promisify(fs.exists)(file);
            if (exists) {
                debugLog("deleting file ", file);
                yield util_1.promisify(fs.unlink)(file);
            }
        }
        catch (err) {
            errorLog(err);
        }
    });
}
exports.deleteFile = deleteFile;
function moveFile(source, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        debugLog("moving file file \n source ", source, "\n =>\n dest ", dest);
        try {
            yield copyFile(source, dest);
            yield deleteFile(source);
        }
        catch (err) {
            errorLog(err);
        }
    });
}
exports.moveFile = moveFile;
function moveFileWithBackup(source, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        // let make a copy of the destination file
        debugLog("moveFileWithBackup file \n source ", source, "\n =>\n dest ", dest);
        yield copyFile(dest, dest + "_old");
        yield moveFile(source, dest);
    });
}
exports.moveFileWithBackup = moveFileWithBackup;
let fileCounter = 0;
class PushCertificateManagerServerImpl extends events_1.EventEmitter {
    constructor(options) {
        super();
        this._map = {};
        this._pendingTasks = [];
        this.$$actionQueue = [];
        if (options) {
            this.applicationGroup = options.applicationGroup;
            this.userTokenGroup = options.userTokenGroup;
            this.httpsGroup = options.httpsGroup;
            if (this.userTokenGroup) {
                this._map.DefaultUserTokenGroup = this.userTokenGroup;
                // istanbul ignore next
                if (!(this.userTokenGroup instanceof node_opcua_pki_1.CertificateManager)) {
                    errorLog("Expecting this.userTokenGroup to be instanceof CertificateManager :", this.userTokenGroup.constructor.name);
                    throw new Error("Expecting this.userTokenGroup to be instanceof CertificateManager ");
                }
            }
            if (this.applicationGroup) {
                this._map.DefaultApplicationGroup = this.applicationGroup;
                node_opcua_assert_1.assert(this.applicationGroup instanceof node_opcua_pki_1.CertificateManager);
            }
            if (this.httpsGroup) {
                this._map.DefaultHttpsGroup = this.httpsGroup;
                node_opcua_assert_1.assert(this.httpsGroup instanceof node_opcua_pki_1.CertificateManager);
            }
        }
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.applicationGroup) {
                yield this.applicationGroup.initialize();
            }
            if (this.userTokenGroup) {
                yield this.userTokenGroup.initialize();
            }
            if (this.httpsGroup) {
                yield this.httpsGroup.initialize();
            }
        });
    }
    get supportedPrivateKeyFormats() {
        return ["PEM"];
    }
    getSupportedPrivateKeyFormats() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportedPrivateKeyFormats;
        });
    }
    createSigningRequest(certificateGroupId, certificateTypeId, subjectName, regeneratePrivateKey, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificateManager = this.getCertificateManager(certificateGroupId);
            if (!certificateManager) {
                debugLog(" cannot find group ", certificateGroupId);
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.BadInvalidArgument
                };
            }
            // todo : at this time regenerate PrivateKey is not supported
            if (regeneratePrivateKey) {
                // The Server shall create a new Private Key which it stores until the
                // matching signed Certificate is uploaded with the UpdateCertificate Method.
                // Previously created Private Keys may be discarded if UpdateCertificate was not
                // called before calling this method again.
                debugLog(" regeneratePrivateKey = true not supported yet");
                // debugLog("generating a new private key ...");
                // setEnv("RANDFILE", certificateManager.randomFile);
                // await createPrivateKey(certificateManager.privateKey, certificateManager.keySize);
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.BadInvalidArgument
                };
            }
            else {
                // The Server uses its existing Private Key
            }
            const options = {
                subject: subjectName
            };
            const csrfile = yield certificateManager.createCertificateRequest(options);
            const csrPEM = yield util_1.promisify(fs.readFile)(csrfile, "utf8");
            const certificateSigningRequest = node_opcua_crypto_1.convertPEMtoDER(csrPEM);
            this.addPendingTask(() => deleteFile(csrfile));
            return {
                certificateSigningRequest,
                statusCode: node_opcua_basic_types_1.StatusCodes.Good
            };
        });
    }
    getRejectedList() {
        return __awaiter(this, void 0, void 0, function* () {
            // rejectedList comes from each group
            function extractRejectedList(group, certificateList) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!group) {
                        return;
                    }
                    const rejectedFolder = path.join(group.rootDir, "rejected");
                    const files = yield util_1.promisify(fs.readdir)(rejectedFolder);
                    const stat = util_1.promisify(fs.stat);
                    const promises1 = [];
                    for (const certFile of files) {
                        // read date
                        promises1.push(stat(path.join(rejectedFolder, certFile)));
                    }
                    const stats = yield Promise.all(promises1);
                    for (let i = 0; i < stats.length; i++) {
                        certificateList.push({
                            filename: path.join(rejectedFolder, files[i]),
                            stat: stats[i]
                        });
                    }
                });
            }
            const list = [];
            yield extractRejectedList(this.applicationGroup, list);
            yield extractRejectedList(this.userTokenGroup, list);
            yield extractRejectedList(this.httpsGroup, list);
            // now sort list from newer file to older file
            list.sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());
            const readFile = util_1.promisify(fs.readFile);
            const promises = [];
            for (const item of list) {
                promises.push(readFile(item.filename, "utf8"));
            }
            const certificatesPEM = yield Promise.all(promises);
            const certificates = certificatesPEM.map(node_opcua_crypto_1.convertPEMtoDER);
            return {
                certificates,
                statusCode: node_opcua_basic_types_1.StatusCodes.Good
            };
        });
    }
    updateCertificate(certificateGroupId, certificateTypeId, certificate, issuerCertificates, privateKeyFormat, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // Result Code                Description
            // BadInvalidArgument        The certificateTypeId or certificateGroupId is not valid.
            // BadCertificateInvalid     The Certificate is invalid or the format is not supported.
            // BadNotSupported           The PrivateKey is invalid or the format is not supported.
            // BadUserAccessDenied       The current user does not have the rights required.
            // BadSecurityChecksFailed   Some failure occurred verifying the integrity of the Certificate.
            const certificateManager = this.getCertificateManager(certificateGroupId);
            if (!certificateManager) {
                debugLog(" cannot find group ", certificateGroupId);
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.BadInvalidArgument
                };
            }
            function preinstallCertificate(self) {
                return __awaiter(this, void 0, void 0, function* () {
                    const certFolder = path.join(certificateManager.rootDir, "own/certs");
                    const certificateFileDER = path.join(certFolder, `_pending_certificate${fileCounter++}.der`);
                    const certificateFilePEM = path.join(certFolder, `_pending_certificate${fileCounter++}.pem`);
                    yield util_1.promisify(fs.writeFile)(certificateFileDER, certificate, "binary");
                    yield util_1.promisify(fs.writeFile)(certificateFilePEM, node_opcua_crypto_1.toPem(certificate, "CERTIFICATE"));
                    const destDER = path.join(certFolder, "certificate.der");
                    const destPEM = path.join(certFolder, "certificate.pem");
                    // put existing file in security by backing them up
                    self.addPendingTask(() => moveFileWithBackup(certificateFileDER, destDER));
                    self.addPendingTask(() => moveFileWithBackup(certificateFilePEM, destPEM));
                });
            }
            function preinstallPrivateKey(self) {
                return __awaiter(this, void 0, void 0, function* () {
                    node_opcua_assert_1.assert(privateKeyFormat.toUpperCase() === "PEM");
                    node_opcua_assert_1.assert(privateKey instanceof Buffer); // could be DER or PEM in a buffer ?
                    const ownPrivateFolder = path.join(certificateManager.rootDir, "own/private");
                    const privateKeyFilePEM = path.join(ownPrivateFolder, `_pending_private_key${fileCounter++}.pem`);
                    const privateKeyPEM = node_opcua_crypto_1.toPem(privateKey, "RSA PRIVATE KEY");
                    yield util_1.promisify(fs.writeFile)(privateKeyFilePEM, privateKeyPEM, "utf-8");
                    // console.log("KYKY ", privateKeyPEM);
                    // console.log("KYKY certificateManager.privateKey = ", certificateManager.privateKey);
                    self.addPendingTask(() => moveFileWithBackup(privateKeyFilePEM, certificateManager.privateKey));
                });
            }
            // OPC Unified Architecture, Part 12 42 Release 1.04:
            //
            // UpdateCertificate is used to update a Certificate for a Server.
            // There are the following three use cases for this Method:
            //
            //  - The new Certificate was created based on a signing request created with the Method
            //    In this case there is no privateKey provided.
            //  - A new privateKey and Certificate was created outside the Server and both are updated
            //    with this Method.
            //  - A new Certificate was created and signed with the information from the old Certificate.
            //    In this case there is no privateKey provided.
            // The Server shall do all normal integrity checks on the Certificate and all of the issuer
            // Certificates. If errors occur the BadSecurityChecksFailed error is returned.
            // todo : all normal integrity check on the certificate
            const certInfo = node_opcua_crypto_1.exploreCertificate(certificate);
            const now = new Date();
            if (certInfo.tbsCertificate.validity.notBefore.getTime() > now.getTime()) {
                // certificate is not yet valid
                debugLog("Certificate is not yet valid");
                return { statusCode: node_opcua_basic_types_1.StatusCodes.BadSecurityChecksFailed };
            }
            if (certInfo.tbsCertificate.validity.notAfter.getTime() < now.getTime()) {
                // certificate is already out of date
                debugLog("Certificate is already out of date");
                return { statusCode: node_opcua_basic_types_1.StatusCodes.BadSecurityChecksFailed };
            }
            // If the Server returns applyChangesRequired=FALSE then it is indicating that it is able to
            // satisfy the requirements specified for the ApplyChanges Method.
            debugLog(" updateCertificate ", node_opcua_crypto_1.makeSHA1Thumbprint(certificate).toString("hex"));
            if (!privateKeyFormat || !privateKey) {
                // The Server shall report an error if the public key does not match the existing Certificate and
                // the privateKey was not provided.
                // privateKey is not provided, so check that the public key matches the existing certificate
                const privateKeyDER = node_opcua_crypto_1.readPrivateKey(certificateManager.privateKey);
                if (!certificateMatchesPrivateKey(certificate, privateKeyDER)) {
                    // certificate doesn't match privateKey
                    debugLog("certificate doesn't match privateKey");
                    return { statusCode: node_opcua_basic_types_1.StatusCodes.BadSecurityChecksFailed };
                }
                // a new certificate is provided for us,
                // we keep our private key
                // we do this in two stages
                yield preinstallCertificate(this);
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.Good
                };
            }
            else if (privateKey) {
                // a private key has been provided by the caller !
                if (!privateKeyFormat) {
                    debugLog("the privateKeyFormat must be specified " + privateKeyFormat);
                    return { statusCode: node_opcua_basic_types_1.StatusCodes.BadNotSupported };
                }
                if (privateKeyFormat !== "PEM" && privateKeyFormat !== "PFX") {
                    debugLog(" the private key format is invalid privateKeyFormat =" + privateKeyFormat);
                    return { statusCode: node_opcua_basic_types_1.StatusCodes.BadNotSupported };
                }
                if (privateKeyFormat !== "PEM") {
                    debugLog("in NodeOPCUA we only support PEM for the moment privateKeyFormat =" + privateKeyFormat);
                    return { statusCode: node_opcua_basic_types_1.StatusCodes.BadNotSupported };
                }
                // privateKey is  provided, so check that the public key matches provided private key
                if (!certificateMatchesPrivateKey(certificate, privateKey)) {
                    // certificate doesn't match privateKey
                    debugLog("certificate doesn't match privateKey");
                    return { statusCode: node_opcua_basic_types_1.StatusCodes.BadSecurityChecksFailed };
                }
                yield preinstallPrivateKey(this);
                yield preinstallCertificate(this);
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.Good
                };
            }
            else {
                // todo !
                return {
                    statusCode: node_opcua_basic_types_1.StatusCodes.BadNotSupported
                };
            }
        });
    }
    applyChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            // ApplyChanges is used to tell the Server to apply any security changes.
            // This Method should only be called if a previous call to a Method that changed the
            // configuration returns applyChangesRequired=true.
            //
            // If the Server Certificate has changed, Secure Channels using the old Certificate will
            // eventually be interrupted.
            this.emit("CertificateAboutToChange", this.$$actionQueue);
            yield this.flushActionQueue();
            try {
                yield this.applyPendingTasks();
            }
            catch (err) {
                debugLog("err ", err);
                return node_opcua_basic_types_1.StatusCodes.BadInternalError;
            }
            this.emit("CertificateChanged", this.$$actionQueue);
            yield this.flushActionQueue();
            // The only leeway the Server has is with the timing.
            // In the best case, the Server can close the TransportConnections for the affected Endpoints and leave any
            // Subscriptions intact. This should appear no different than a network interruption from the
            // perspective of the Client. The Client should be prepared to deal with Certificate changes
            // during its reconnect logic. In the worst case, a full shutdown which affects all connected
            // Clients will be necessary. In the latter case, the Server shall advertise its intent to interrupt
            // connections by setting the SecondsTillShutdown and ShutdownReason Properties in the
            // ServerStatus Variable.
            // If the Secure Channel being used to call this Method will be affected by the Certificate change
            // then the Server shall introduce a delay long enough to allow the caller to receive a reply.
            return node_opcua_basic_types_1.StatusCodes.Good;
        });
    }
    getCertificateManager(certificateGroupId) {
        const groupName = findCertificateGroupName(certificateGroupId);
        return this._map[groupName] || null;
    }
    addPendingTask(functor) {
        this._pendingTasks.push(functor);
    }
    applyPendingTasks() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            debugLog("start applyPendingTasks");
            const promises = [];
            const t = this._pendingTasks.splice(0);
            if (false) {
                try {
                    // node 10.2 and above
                    for (var t_1 = __asyncValues(t), t_1_1; t_1_1 = yield t_1.next(), !t_1_1.done;) {
                        const task = t_1_1.value;
                        yield task();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (t_1_1 && !t_1_1.done && (_a = t_1.return)) yield _a.call(t_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                while (t.length) {
                    const task = t.shift();
                    yield task();
                }
            }
            yield Promise.all(promises);
            debugLog("end applyPendingTasks");
        });
    }
    flushActionQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.$$actionQueue.length) {
                const first = this.$$actionQueue.pop();
                yield first();
            }
        });
    }
}
exports.PushCertificateManagerServerImpl = PushCertificateManagerServerImpl;
//# sourceMappingURL=push_certificate_manager_server_impl.js.map