import type { HTMLProps } from "react";
export default function ConnectButton({ accent, showBalance, showProfilePicture, onClick, useAns: ansOption, profileModal: showProfileModal, ...props }: HTMLProps<HTMLButtonElement> & Props): JSX.Element;
interface Props {
    accent?: string;
    showBalance?: boolean;
    showProfilePicture?: boolean;
    useAns?: boolean;
    profileModal?: boolean;
}
export {};
