/**
 * ANS profile hook
 */
export default function useAns(): AnsProfile | undefined;
interface AnsProfile {
    user: string;
    currentLabel: string;
    ownedLabels?: {
        domain: string;
        color: string;
        subdomains: unknown[];
        record: string | null;
        created_at: number;
        label: string;
    }[];
    nickname?: string;
    address_color: string;
    bio?: string;
    avatar?: string;
    links?: {
        [key: string]: string;
    };
}
export {};
