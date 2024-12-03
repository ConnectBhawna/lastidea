import type { PropsWithChildren } from "react";
import { MotionProps } from "framer-motion";
export declare function Modal({ open, onClose, children, className, variants, noWatermark }: PropsWithChildren<Props>): JSX.Element;
interface Props extends MotionProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    noWatermark?: boolean;
}
export {};
