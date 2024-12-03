/// <reference types="react" />
import { DefaultTheme } from "../theme";
export declare const Button: import("react").ComponentType<Pick<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}, "as" | keyof import("react").ClassAttributes<HTMLButtonElement> | keyof import("react").ButtonHTMLAttributes<HTMLButtonElement>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<DefaultTheme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}> & import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}>, {}>;
