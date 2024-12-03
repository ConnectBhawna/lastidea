/// <reference types="react" />
import { DefaultTheme } from "../theme";
export declare const Title: import("react").ComponentType<Pick<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & {
    small?: boolean | undefined;
    themed?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}, "small" | "as" | "themed" | keyof import("react").ClassAttributes<HTMLHeadingElement> | keyof import("react").HTMLAttributes<HTMLHeadingElement>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<DefaultTheme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<import("react").ComponentType<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & {
    small?: boolean | undefined;
    themed?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}> & import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & {
    small?: boolean | undefined;
    themed?: boolean | undefined;
    theme: DefaultTheme;
} & {
    as?: import("react").ElementType<any> | undefined;
}>, {}>;
export declare const TitleWithParagraph: import("@linaria/react").StyledMeta & import("react").FunctionComponent<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & Record<never, unknown> & {
    as?: import("react").ElementType<any> | undefined;
}>;
