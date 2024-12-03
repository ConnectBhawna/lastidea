/**
 * Active strategy (wallet) identifier
 */
export declare function useStrategy(): string | false;
export default function useActiveStrategy(): import("../strategy/strategies/ArConnect").default | import("../strategy/strategies/BrowserWallet").default | import("../strategy/strategies/ArweaveWebWallet").default | import("../strategy/strategies/Othent").default | undefined;
/**
 * Strategy API
 */
export declare function useApi(): import("../strategy/strategies/ArConnect").default | import("../strategy/strategies/BrowserWallet").default | import("../strategy/strategies/ArweaveWebWallet").default | import("../strategy/strategies/Othent").default | undefined;
