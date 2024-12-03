/// <reference types="react" />
import { DefaultTheme } from "../theme";
export declare const Paragraph: import("react").ComponentType<Pick<import("react").ClassAttributes<HTMLParagraphElement> & import("react").HTMLAttributes<HTMLParagraphElement> & {
    small?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}, "small" | "as" | keyof import("react").ClassAttributes<HTMLParagraphElement> | keyof import("react").HTMLAttributes<HTMLParagraphElement>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<DefaultTheme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react").ClassAttributes<HTMLParagraphElement> & import("react").HTMLAttributes<HTMLParagraphElement> & {
    small?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}> & import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLParagraphElement> & import("react").HTMLAttributes<HTMLParagraphElement> & {
    small?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}>, {}>;
