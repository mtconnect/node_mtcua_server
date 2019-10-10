"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_opcua_address_space_1 = require("node-opcua-address-space");
const node_opcua_debug_1 = require("node-opcua-debug");
const node_opcua_nodeid_1 = require("node-opcua-nodeid");
const debugLog = node_opcua_debug_1.make_debugLog("ServerConfiguration");
const errorLog = node_opcua_debug_1.make_errorLog("ServerConfiguration");
const doDebug = node_opcua_debug_1.checkDebugFlag("ServerConfiguration");
function installCertificateExpirationAlarm(addressSpace) {
    debugLog("installCertificateExpirationAlarm");
    const server = addressSpace.rootFolder.objects.server;
    const namespace = addressSpace.getOwnNamespace();
    const certificateExpirationAlarmType = addressSpace.findEventType("CertificateExpirationAlarmType");
    const options = {
        browseName: "ServerCertificateAlarm",
        conditionSource: null,
        eventSourceOf: server,
        inputNode: node_opcua_nodeid_1.NodeId.nullNodeId,
        normalState: node_opcua_nodeid_1.NodeId.nullNodeId
    };
    const data = {};
    const alarm = node_opcua_address_space_1.UACertificateExpirationAlarm.instantiate(namespace, options, data);
    // const alarm = namespace.instantiateOffNormalAlarm({) as UACertificateExpirationAlarm;
    alarm.currentBranch().setRetain(true);
    alarm.activeState.setValue(true);
}
exports.installCertificateExpirationAlarm = installCertificateExpirationAlarm;
//# sourceMappingURL=install_CertificateAlarm.js.map