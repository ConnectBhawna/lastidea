import type { SignatureOptions } from "arweave/node/lib/crypto/crypto-interface";
import type { DispatchResult, GatewayConfig, PermissionType } from "arconnect";
import type Transaction from "arweave/web/lib/transaction";
import type { AppInfo } from "arweave-wallet-connector";
import type Strategy from "../Strategy";
import { queryWalletAddressTxnsProps, readCustomContractProps, SendTransactionArweaveProps, SendTransactionBundlrProps, SendTransactionWarpProps, SignTransactionBundlrProps, SignTransactionWarpProps, verifyArweaveDataProps, verifyBundlrDataProps } from "othent";
export default class OthentStrategy implements Strategy {
    #private;
    id: "othent";
    name: string;
    description: string;
    theme: string;
    logo: string;
    url: string;
    constructor();
    /**
     * Advanced function to override the default API ID
     * Othent uses.
     */
    __overrideApiID(othentApiID: string): void;
    isAvailable(): Promise<boolean>;
    ping(): Promise<import("othent").PingReturnProps>;
    connect(permissions: PermissionType[], appInfo?: AppInfo, gateway?: GatewayConfig): Promise<void>;
    disconnect(): Promise<void>;
    getPermissions(): Promise<PermissionType[]>;
    getActiveAddress(): Promise<string>;
    getAllAddresses(): Promise<string[]>;
    /**
     * Same as "sendTransactionArweave()" of the Othent SDK
     */
    sign(transaction: Transaction, options?: SignatureOptions): Promise<import("othent").SignTransactionArweaveReturnProps>;
    signTransactionBundlr(params: SignTransactionBundlrProps): Promise<import("othent").SignTransactionBundlrReturnProps>;
    signTransactionWarp(params: SignTransactionWarpProps): Promise<import("othent").SignTransactionWarpReturnProps>;
    sendTransactionArweave(params: SendTransactionArweaveProps): Promise<import("othent").SendTransactionArweaveReturnProps>;
    sendTransactionBundlr(params: SendTransactionBundlrProps): Promise<import("othent").SendTransactionBundlrReturnProps>;
    sendTransactionWarp(params: SendTransactionWarpProps): Promise<import("othent").SendTransactionWarpReturnProps>;
    verifyArweaveData(params: verifyArweaveDataProps): Promise<import("othent").verifyArweaveDataReturnProps>;
    verifyBundlrData(params: verifyBundlrDataProps): Promise<import("othent").verifyBundlrDataReturnProps>;
    dispatch(transaction: Transaction): Promise<DispatchResult>;
    queryWalletAddressTxns(params: queryWalletAddressTxnsProps): Promise<import("othent").queryWalletAddressTxnsReturnProps>;
    userDetails(): Promise<import("othent").UserDetailsReturnProps>;
    readContract(): Promise<import("othent").ReadContractReturnProps>;
    readCustomContract(params: readCustomContractProps): Promise<import("othent").readCustomContractReturnProps>;
    addAddressEvent(listener: ListenerFunction): any;
    removeAddressEvent(listener: (e: CustomEvent<{
        address: string;
    }>) => void): void;
}
declare type ListenerFunction = (address: string) => void;
export {};
