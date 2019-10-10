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
const node_opcua_nodeid_1 = require("node-opcua-nodeid");
const node_opcua_status_code_1 = require("node-opcua-status-code");
const node_opcua_variant_1 = require("node-opcua-variant");
const node_opcua_data_model_1 = require("node-opcua-data-model");
const serverConfigurationNodeId = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration");
const createSigningRequestMethod = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CreateSigningRequest");
const getRejectedListMethod = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_GetRejectedList");
const updateCertificateMethod = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_UpdateCertificate");
const certificateGroups = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups");
const applyChangesMethod = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_ApplyChanges");
const supportedPrivateKeyFormatsNodeId = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_SupportedPrivateKeyFormats");
const defaultApplicationGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultApplicationGroup");
const defaultHttpsGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultHttpsGroup");
const defaultUserTokenGroup = node_opcua_nodeid_1.resolveNodeId("ServerConfiguration_CertificateGroups_DefaultUserTokenGroup");
function findCertificateGroupName(certificateGroupNodeId) {
    return "todo";
}
function findCertificateGroupNodeId(certificateGroup) {
    if (certificateGroup instanceof node_opcua_nodeid_1.NodeId) {
        return certificateGroup;
    }
    switch (certificateGroup) {
        case "DefaultApplicationGroup":
            return defaultApplicationGroup;
        case "DefaultHttpsGroup":
            return defaultHttpsGroup;
        case "DefaultUserTokenGroup":
            return defaultUserTokenGroup;
        default:
            return node_opcua_nodeid_1.resolveNodeId(certificateGroup);
    }
}
function findCertificateTypeIdNodeId(certificateTypeId) {
    if (certificateTypeId instanceof node_opcua_nodeid_1.NodeId) {
        return certificateTypeId;
    }
    return node_opcua_nodeid_1.resolveNodeId(certificateTypeId);
}
class ClientPushCertificateManagement {
    constructor(session) {
        this.session = session;
    }
    /**
     * CreateSigningRequest Method asks the Server to create a PKCS #10 DER encoded
     * Certificate Request that is signed with the Server’s private key. This request can be then used
     * to request a Certificate from a CA that expects requests in this format.
     * This Method requires an encrypted channel and that the Client provide credentials with
     * administrative rights on the Server.
     *
     * @param certificateGroupId  - The NodeId of the Certificate Group Object which is affected by the request.
     *                              If null the DefaultApplicationGroup is used.
     * @param certificateTypeId   - The type of Certificate being requested. The set of permitted types is specified by
     *                              the CertificateTypes Property belonging to the Certificate Group.
     * @param subjectName         - The subject name to use in the Certificate Request.
     *                              If not specified the SubjectName from the current Certificate is used.
     *                              The subjectName parameter is a sequence of X.500 name value pairs separated by a ‘/’. For
     *                              example: CN=ApplicationName/OU=Group/O=Company.
     *                              If the certificateType is a subtype of ApplicationCertificateType the Certificate subject name
     *                              shall have an organization (O=) or domain name (DC=) field. The public key length shall meet
     *                              the length restrictions for the CertificateType. The domain name field specified in the subject
     *                              name is a logical domain used to qualify the subject name that may or may not be the same
     *                              as a domain or IP address in the subjectAltName field of the Certificate.
     *                              If the certificateType is a subtype of HttpsCertificateType the Certificate common name (CN=)
     *                              shall be the same as a domain from a DiscoveryUrl which uses HTTPS and the subject name
     *                              shall have an organization (O=) field.
     *                              If the subjectName is blank or null the CertificateManager generates a suitable default.
     * @param regeneratePrivateKey  If TRUE the Server shall create a new Private Key which it stores until the
     *                              matching signed Certificate is uploaded with the UpdateCertificate Method.
     *                              Previously created Private Keys may be discarded if UpdateCertificate was not
     *                              called before calling this method again. If FALSE the Server uses its existing
     *                              Private Key.
     * @param nonce                 Additional entropy which the caller shall provide if regeneratePrivateKey is TRUE.
     *                              It shall be at least 32 bytes long.
     *
     * @return                      The PKCS #10 DER encoded Certificate Request.
     *
     * Result Code                  Description
     * BadInvalidArgument          The certificateTypeId, certificateGroupId or subjectName is not valid.
     * BadUserAccessDenied          The current user does not have the rights required.
     */
    createSigningRequest(certificateGroupId, certificateTypeId, subjectName, regeneratePrivateKey, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            nonce = nonce || Buffer.alloc(0);
            const inputArguments = [
                { dataType: node_opcua_variant_1.DataType.NodeId, value: findCertificateGroupNodeId(certificateGroupId) },
                { dataType: node_opcua_variant_1.DataType.NodeId, value: findCertificateTypeIdNodeId(certificateTypeId) },
                { dataType: node_opcua_variant_1.DataType.String, value: subjectName },
                { dataType: node_opcua_variant_1.DataType.Boolean, value: !!regeneratePrivateKey },
                { dataType: node_opcua_variant_1.DataType.ByteString, value: nonce }
            ];
            const methodToCall = {
                inputArguments,
                methodId: createSigningRequestMethod,
                objectId: serverConfigurationNodeId
            };
            const callMethodResult = yield this.session.call(methodToCall);
            if (callMethodResult.statusCode === node_opcua_status_code_1.StatusCodes.Good) {
                // xx console.log(callMethodResult.toString());
                return {
                    certificateSigningRequest: callMethodResult.outputArguments[0].value,
                    statusCode: callMethodResult.statusCode
                };
            }
            else {
                return { statusCode: callMethodResult.statusCode };
            }
        });
    }
    /**
     * GetRejectedList Method returns the list of Certificates that have been rejected by the Server.
     * rules are defined for how the Server updates this list or how long a Certificate is kept in
     * the list. It is recommended that every valid but untrusted Certificate be added to the rejected
     * list as long as storage is available. Servers should omit older entries from the list returned if
     * the maximum message size is not large enough to allow the entire list to be returned.
     * This Method requires an encrypted channel and that the Client provides credentials with
     * administrative rights on the Server
     *
     * @return certificates The DER encoded form of the Certificates rejected by the Server
     */
    getRejectedList() {
        return __awaiter(this, void 0, void 0, function* () {
            const inputArguments = [];
            const methodToCall = {
                inputArguments,
                methodId: getRejectedListMethod,
                objectId: serverConfigurationNodeId
            };
            const callMethodResult = yield this.session.call(methodToCall);
            if (callMethodResult.statusCode === node_opcua_status_code_1.StatusCodes.Good) {
                if (callMethodResult.outputArguments[0].dataType !== node_opcua_variant_1.DataType.ByteString) {
                    return { statusCode: node_opcua_status_code_1.StatusCodes.BadInvalidArgument };
                }
                return {
                    certificates: callMethodResult.outputArguments[0].value,
                    statusCode: callMethodResult.statusCode
                };
            }
            else {
                return {
                    statusCode: callMethodResult.statusCode
                };
            }
        });
    }
    updateCertificate(certificateGroupId, certificateTypeId, certificate, issuerCertificates, privateKeyFormat, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputArguments = [
                { dataType: node_opcua_variant_1.DataType.NodeId, value: findCertificateGroupNodeId(certificateGroupId) },
                { dataType: node_opcua_variant_1.DataType.NodeId, value: findCertificateTypeIdNodeId(certificateTypeId) },
                { dataType: node_opcua_variant_1.DataType.ByteString, value: certificate },
                { dataType: node_opcua_variant_1.DataType.ByteString, arrayType: node_opcua_variant_1.VariantArrayType.Array, value: issuerCertificates },
                { dataType: node_opcua_variant_1.DataType.String, value: privateKeyFormat || "" },
                { dataType: node_opcua_variant_1.DataType.ByteString, value: privateKeyFormat ? privateKey : Buffer.alloc(0) }
            ];
            const methodToCall = {
                inputArguments,
                methodId: updateCertificateMethod,
                objectId: serverConfigurationNodeId
            };
            const callMethodResult = yield this.session.call(methodToCall);
            if (callMethodResult.statusCode === node_opcua_status_code_1.StatusCodes.Good) {
                if (!callMethodResult.outputArguments || callMethodResult.outputArguments.length !== 1) {
                    return {
                        statusCode: node_opcua_status_code_1.StatusCodes.BadInternalError
                    };
                    // throw Error("Internal Error, expecting 1 output result");
                }
                return {
                    applyChangesRequired: callMethodResult.outputArguments[0].value,
                    statusCode: callMethodResult.statusCode
                };
            }
            else {
                return { statusCode: callMethodResult.statusCode };
            }
        });
    }
    /**
     * ApplyChanges tells the Server to apply any security changes.
     * This Method should only be called if a previous call to a Method that changed the
     * configuration returns applyChangesRequired=true (see 7.7.4).
     * If the Server Certificate has changed, Secure Channels using the old Certificate will
     * eventually be interrupted. The only leeway the Server has is with the timing. In the best case,
     * the Server can close the TransportConnections for the affected Endpoints and leave any
     * Subscriptions intact. This should appear no different than a network interruption from the
     * perspective of the Client. The Client should be prepared to deal with Certificate changes
     * during its reconnect logic. In the worst case, a full shutdown which affects all connected
     * Clients will be necessary. In the latter case, the Server shall advertise its intent to interrupt
     * connections by setting the SecondsTillShutdown and ShutdownReason Properties in the
     * ServerStatus Variable.
     * If the Secure Channel being used to call this Method will be affected by the Certificate change
     * then the Server shall introduce a delay long enough to allow the caller to receive a reply.
     * This Method requires an encrypted channel and that the Client provide credentials with
     * administrative rights on the Server.
     *
     * Result Code            Description
     * BadUserAccessDenied   The current user does not have the rights required.
     */
    applyChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            const methodToCall = {
                inputArguments: [],
                methodId: applyChangesMethod,
                objectId: serverConfigurationNodeId
            };
            const callMethodResult = yield this.session.call(methodToCall);
            if (callMethodResult.outputArguments && callMethodResult.outputArguments.length) {
                throw new Error("Invalid  output arguments");
            }
            return callMethodResult.statusCode;
        });
    }
    getSupportedPrivateKeyFormats() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = yield this.session.read({
                attributeId: node_opcua_data_model_1.AttributeIds.Value,
                nodeId: supportedPrivateKeyFormatsNodeId
            });
            return dataValue.value.value;
        });
    }
    getCertificateGroupId(certificateGroupName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (certificateGroupName === "DefaultApplicationGroup") {
                return defaultApplicationGroup;
            }
            // toDO
            throw new Error("Not Implemented yet");
        });
    }
}
exports.ClientPushCertificateManagement = ClientPushCertificateManagement;
ClientPushCertificateManagement.rsaSha256ApplicationCertificateType = node_opcua_nodeid_1.resolveNodeId("i=12560");
//# sourceMappingURL=push_certificate_management_client.js.map