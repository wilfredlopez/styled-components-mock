export type TemplateType = TemplateStringsArray
export type TemplateFunction<TemplateProps> = (props: TemplateProps) => any

export type Interpolation<T extends {}> = Interpolation<T>[]
    | ((executionContext: T) => Interpolation<T>)
    | string


export type ObjectStyledType<P extends { className?: string } = { className?: string }, K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> = {
    [T in K]: <TemplateProps extends {}>(template: TemplateType, ...fns: Array<TemplateFunction<TemplateProps & T extends keyof JSX.IntrinsicElements ? React.ComponentProps<T> & TemplateProps : P>>) => (props: T extends keyof JSX.IntrinsicElements ? React.ComponentProps<T> & TemplateProps : any) => React.ReactElement<P, string | React.JSXElementConstructor<any>>
}
