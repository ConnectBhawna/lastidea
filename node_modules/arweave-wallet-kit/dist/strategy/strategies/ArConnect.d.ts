import BrowserWalletStrategy from "./BrowserWallet";
import type Strategy from "../Strategy";
export default class ArConnectStrategy extends BrowserWalletStrategy implements Strategy {
    id: "arconnect";
    name: string;
    description: string;
    theme: string;
    logo: string;
    url: string;
    constructor();
    isAvailable(): Promise<boolean>;
    addToken(id: string): Promise<void>;
}
