/// <reference types="node" />
/**
 * @module node-opcua-server-configuration-server
 */
import { EventEmitter } from "events";
import { ByteString } from "node-opcua-basic-types";
import { Certificate, PrivateKey } from "node-opcua-crypto";
import { NodeId } from "node-opcua-nodeid";
import { CertificateManager } from "node-opcua-pki";
import { StatusCode } from "node-opcua-status-code";
import { CreateSigningRequestResult, GetRejectedListResult, PushCertificateManager, UpdateCertificateResult } from "../push_certificate_manager";
export declare function certificateMatchesPrivateKey(certificate: Certificate, privateKey: PrivateKey): boolean;
export interface PushCertificateManagerServerOptions {
    applicationGroup?: CertificateManager;
    userTokenGroup?: CertificateManager;
    httpsGroup?: CertificateManager;
}
export declare function copyFile(source: string, dest: string): Promise<void>;
export declare function deleteFile(file: string): Promise<void>;
export declare function moveFile(source: string, dest: string): Promise<void>;
export declare function moveFileWithBackup(source: string, dest: string): Promise<void>;
export declare type ActionQueue = Array<() => Promise<void>>;
export declare class PushCertificateManagerServerImpl extends EventEmitter implements PushCertificateManager {
    applicationGroup?: CertificateManager;
    userTokenGroup?: CertificateManager;
    httpsGroup?: CertificateManager;
    private readonly _map;
    private readonly _pendingTasks;
    private $$actionQueue;
    constructor(options?: PushCertificateManagerServerOptions);
    initialize(): Promise<void>;
    readonly supportedPrivateKeyFormats: string[];
    getSupportedPrivateKeyFormats(): Promise<string[]>;
    createSigningRequest(certificateGroupId: NodeId | string, certificateTypeId: NodeId | string, subjectName: string, regeneratePrivateKey?: boolean, nonce?: Buffer): Promise<CreateSigningRequestResult>;
    getRejectedList(): Promise<GetRejectedListResult>;
    updateCertificate(certificateGroupId: NodeId | string, certificateTypeId: NodeId | string, certificate: Buffer, issuerCertificates: ByteString[]): Promise<UpdateCertificateResult>;
    applyChanges(): Promise<StatusCode>;
    private getCertificateManager;
    private addPendingTask;
    private applyPendingTasks;
    private flushActionQueue;
}
