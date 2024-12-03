import ArweaveWebWalletStrategy from "./strategies/ArweaveWebWallet";
import BrowserWalletStrategy from "./strategies/BrowserWallet";
import ArConnectStrategy from "./strategies/ArConnect";
import OthentStrategy from "./strategies/Othent";
import type { PermissionType } from "arconnect";
declare const strategies: (ArConnectStrategy | BrowserWalletStrategy | ArweaveWebWalletStrategy | OthentStrategy)[];
export declare const STRATEGY_STORE = "wallet_kit_strategy_id";
/**
 * On page mount, sync the logged in strategy
 *
 * @param requiredPermissions The permissions required by this app
 * @param enforcePermissions Should the strategy be active only if the required permissions are gived or not
 */
export declare function syncStrategies(requiredPermissions: PermissionType[], enforcePermissions: boolean): Promise<false | ArConnectStrategy | BrowserWalletStrategy | ArweaveWebWalletStrategy | OthentStrategy | undefined>;
/**
 * Save active strategy to localstorage
 */
export declare function saveStrategy(active: string): void;
/**
 * Get strategy by id
 */
export declare function getStrategy(id: string | false): ArConnectStrategy | BrowserWalletStrategy | ArweaveWebWalletStrategy | OthentStrategy | undefined;
export default strategies;
