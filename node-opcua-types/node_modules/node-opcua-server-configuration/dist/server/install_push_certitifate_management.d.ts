import { OPCUACertificateManager } from "node-opcua-certificate-manager";
import { Certificate, PrivateKeyPEM } from "node-opcua-crypto";
import { ICertificateKeyPairProvider } from "node-opcua-secure-channel";
import { OPCUAServer } from "node-opcua-server";
import { ApplicationDescriptionOptions } from "node-opcua-types";
export interface OPCUAServerPartial extends ICertificateKeyPairProvider {
    serverInfo?: ApplicationDescriptionOptions;
    serverCertificateManager: OPCUACertificateManager;
    $$privateKeyPEM: PrivateKeyPEM;
    $$certificate?: Certificate;
    $$certificateChain: Certificate;
}
export declare function installPushCertificateManagementOnServer(server: OPCUAServer): Promise<void>;
