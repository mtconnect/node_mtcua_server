/// <reference types="node" />
/**
 * @module node-opcua-server-configuration
 */
import { ITrustList } from "./trust_list";
export declare class TrustList implements ITrustList {
    closeAndUpdate(fileHandle: number): Promise<boolean>;
    addCertificate(certificate: Buffer, isTrustedCertificate: boolean): Promise<void>;
    removeCertificate(thumbprint: string, isTrustedCertificate: boolean): Promise<void>;
}
