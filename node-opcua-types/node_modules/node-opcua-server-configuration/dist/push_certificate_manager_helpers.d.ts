/**
 * @module node-opcua-server-configuration
 */
import { AddressSpace } from "node-opcua-address-space";
import { PushCertificateManagerServerOptions } from "./server/push_certificate_manager_server_impl";
export declare function installPushCertificateManagement(addressSpace: AddressSpace, options: PushCertificateManagerServerOptions): void;
