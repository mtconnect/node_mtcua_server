"use strict";
/**
 * @module node-opcua-server-configuration
 */
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
const util_1 = require("util");
const node_opcua_debug_1 = require("node-opcua-debug");
const node_opcua_status_code_1 = require("node-opcua-status-code");
const node_opcua_variant_1 = require("node-opcua-variant");
const install_CertificateAlarm_1 = require("./server/install_CertificateAlarm");
const push_certificate_manager_server_impl_1 = require("./server/push_certificate_manager_server_impl");
const debugLog = node_opcua_debug_1.make_debugLog("ServerConfiguration");
const doDebug = node_opcua_debug_1.checkDebugFlag("ServerConfiguration");
const errorLog = debugLog;
function hasExpectedUserAccess(context) {
    if (!context ||
        !context.session ||
        !context.session.userIdentityToken) {
        return false;
    }
    const currentUserRole = context.getCurrentUserRole();
    return !!currentUserRole.match("SecurityAdmin");
}
function hasEncryptedChannel(context) {
    // todo
    return true;
}
function expected(variant, dataType, variantArrayType) {
    if (!variant) {
        return false;
    }
    if (variant.dataType !== dataType) {
        return false;
    }
    if (variant.arrayType !== variantArrayType) {
        return false;
    }
    return true;
}
function getPushCertificateManager(method) {
    const serverConfiguration = method.addressSpace.rootFolder.objects.server.serverConfiguration;
    const serverConfigurationPriv = serverConfiguration;
    if (serverConfigurationPriv.$pushCertificateManager) {
        return serverConfigurationPriv.$pushCertificateManager;
    }
    // throw new Error("Cannot find pushCertificateManager object");
    return null;
}
function _createSigningRequest(inputArguments, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const certificateGroupIdVariant = inputArguments[0];
        const certificateTypeIdVariant = inputArguments[1];
        const subjectNameVariant = inputArguments[2];
        const regeneratePrivateKeyVariant = inputArguments[3];
        const nonceVariant = inputArguments[4];
        if (!expected(certificateGroupIdVariant, node_opcua_variant_1.DataType.NodeId, node_opcua_variant_1.VariantArrayType.Scalar)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        if (!expected(certificateTypeIdVariant, node_opcua_variant_1.DataType.NodeId, node_opcua_variant_1.VariantArrayType.Scalar)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        if (!expected(subjectNameVariant, node_opcua_variant_1.DataType.String, node_opcua_variant_1.VariantArrayType.Scalar)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        if (!expected(regeneratePrivateKeyVariant, node_opcua_variant_1.DataType.Boolean, node_opcua_variant_1.VariantArrayType.Scalar)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        if (!expected(regeneratePrivateKeyVariant, node_opcua_variant_1.DataType.Boolean, node_opcua_variant_1.VariantArrayType.Scalar)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        if (!hasEncryptedChannel(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadSecurityModeInsufficient };
        }
        if (!hasExpectedUserAccess(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadUserAccessDenied };
        }
        const certificateGroupId = certificateGroupIdVariant.value;
        const certificateTypeId = certificateTypeIdVariant.value;
        const subjectName = subjectNameVariant.value;
        const regeneratePrivateKey = regeneratePrivateKeyVariant.value;
        const nonce = nonceVariant.value;
        const pushCertificateManager = getPushCertificateManager(this);
        if (!pushCertificateManager) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadNotImplemented };
        }
        const result = yield pushCertificateManager.createSigningRequest(certificateGroupId, certificateTypeId, subjectName, regeneratePrivateKey, nonce);
        if (result.statusCode !== node_opcua_status_code_1.StatusCodes.Good) {
            return { statusCode: result.statusCode };
        }
        const callMethodResult = {
            outputArguments: [
                {
                    dataType: node_opcua_variant_1.DataType.ByteString,
                    value: result.certificateSigningRequest
                }
            ],
            statusCode: result.statusCode
        };
        return callMethodResult;
    });
}
function _updateCertificate(inputArguments, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const certificateGroupId = inputArguments[0].value;
        const certificateTypeId = inputArguments[1].value;
        const certificate = inputArguments[2].value;
        const issuerCertificates = inputArguments[3].value;
        const privateKeyFormat = inputArguments[4].value;
        const privateKey = inputArguments[5].value;
        // This Method requires an encrypted channel and that the Client provides credentials with
        // administrative rights on the Server
        if (!hasEncryptedChannel(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadSecurityModeInsufficient };
        }
        if (!hasExpectedUserAccess(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadUserAccessDenied };
        }
        if (privateKeyFormat && privateKeyFormat !== "" && privateKeyFormat.toLowerCase() !== "pem") {
            errorLog("_updateCertificate: Invalid PEM format requested " + privateKeyFormat);
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
        }
        const pushCertificateManager = getPushCertificateManager(this);
        if (!pushCertificateManager) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadNotImplemented };
        }
        const result = yield pushCertificateManager.updateCertificate(certificateGroupId, certificateTypeId, certificate, issuerCertificates, privateKeyFormat, privateKey);
        // todo   raise a CertificateUpdatedAuditEventType
        if (result.statusCode !== node_opcua_status_code_1.StatusCodes.Good) {
            return { statusCode: result.statusCode };
        }
        const callMethodResult = {
            outputArguments: [
                {
                    dataType: node_opcua_variant_1.DataType.Boolean,
                    value: !!result.applyChangesRequired
                }
            ],
            statusCode: result.statusCode
        };
        return callMethodResult;
    });
}
function _getRejectedList(inputArguments, context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hasEncryptedChannel(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadSecurityModeInsufficient };
        }
        if (!hasExpectedUserAccess(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadUserAccessDenied };
        }
        const pushCertificateManager = getPushCertificateManager(this);
        if (!pushCertificateManager) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadNotImplemented };
        }
        const result = yield pushCertificateManager.getRejectedList();
        if (result.statusCode !== node_opcua_status_code_1.StatusCodes.Good) {
            return { statusCode: result.statusCode };
        }
        return {
            outputArguments: [
                {
                    arrayType: node_opcua_variant_1.VariantArrayType.Array,
                    dataType: node_opcua_variant_1.DataType.ByteString,
                    value: result.certificates
                }
            ],
            statusCode: node_opcua_status_code_1.StatusCodes.Good
        };
    });
}
function _applyChanges(inputArguments, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // This Method requires an encrypted channel and that the Client provide credentials with
        // administrative rights on the Server.
        if (!hasEncryptedChannel(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadSecurityModeInsufficient };
        }
        if (!hasExpectedUserAccess(context)) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadUserAccessDenied };
        }
        const pushCertificateManager = getPushCertificateManager(this);
        if (!pushCertificateManager) {
            return { statusCode: node_opcua_status_code_1.StatusCodes.BadNotImplemented };
        }
        const statusCode = yield pushCertificateManager.applyChanges();
        return { statusCode };
    });
}
function installPushCertificateManagement(addressSpace, options) {
    const serverConfiguration = addressSpace.rootFolder.objects.server.serverConfiguration;
    const serverConfigurationPriv = serverConfiguration;
    if (serverConfigurationPriv.$pushCertificateManager) {
        return;
        throw new Error("PushCertificateManagement has already been installed");
    }
    serverConfigurationPriv.$pushCertificateManager = new push_certificate_manager_server_impl_1.PushCertificateManagerServerImpl(options);
    serverConfiguration.supportedPrivateKeyFormats.setValueFromSource({
        arrayType: node_opcua_variant_1.VariantArrayType.Array,
        dataType: node_opcua_variant_1.DataType.String,
        value: ["PEM"]
    });
    serverConfiguration.createSigningRequest.bindMethod(util_1.callbackify(_createSigningRequest));
    serverConfiguration.updateCertificate.bindMethod(util_1.callbackify(_updateCertificate));
    serverConfiguration.getRejectedList.bindMethod(util_1.callbackify(_getRejectedList));
    if (serverConfiguration.applyChanges) {
        serverConfiguration.applyChanges.bindMethod(util_1.callbackify(_applyChanges));
    }
    install_CertificateAlarm_1.installCertificateExpirationAlarm(addressSpace);
}
exports.installPushCertificateManagement = installPushCertificateManagement;
//# sourceMappingURL=push_certificate_manager_helpers.js.map