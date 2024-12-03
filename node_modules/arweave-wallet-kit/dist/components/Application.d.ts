import { DefaultTheme } from "../theme";
import type { MouseEventHandler } from "react";
export declare function Application({ logo, name, description, onClick, theme }: Props): JSX.Element;
export declare const Logo: import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLImageElement> & import("react").ImgHTMLAttributes<HTMLImageElement> & Record<never, unknown> & {
    as?: import("react").ElementType<any> | undefined;
}>;
export declare const AppIcon: import("react").ComponentType<Pick<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    colorTheme?: string | undefined;
    clickable?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}, "colorTheme" | "clickable" | keyof import("react").ClassAttributes<HTMLDivElement> | keyof import("react").HTMLAttributes<HTMLDivElement> | "as"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<DefaultTheme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    colorTheme?: string | undefined;
    clickable?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}> & import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    colorTheme?: string | undefined;
    clickable?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}>, {}>;
interface Props {
    logo: string;
    name: string;
    description: string;
    theme?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export {};
