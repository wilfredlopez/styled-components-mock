import { makeStyles } from './makeStyles'
import { DOM_ELEMENTS } from './dom-elements'
import type { TemplateType, TemplateFunction, ObjectStyledType } from './types'


const StyledObject = {
    h1: <TemplateProps extends {}>(template: TemplateType, ...fns: Array<TemplateFunction<TemplateProps>>) => makeStyles('h1', template, ...fns),
} as ObjectStyledType


//fill styled object with all dom elements.
for (const elementKey of DOM_ELEMENTS) {
    StyledObject[elementKey] = (template: TemplateType, ...fn: Array<TemplateFunction<any>>) => makeStyles(elementKey, template, ...fn)
}

function StyledFunction<P extends { className?: string }>(Comp: React.ComponentType<P>) {
    const TComp: any = Comp as any
    return <TemplateProps extends {}>(template: TemplateType, ...fns: Array<TemplateFunction<TemplateProps & P>>) => makeStyles<P & TemplateProps, React.ComponentType<P & TemplateProps>>(TComp, template, ...fns)
}

/**
 * Function to get styles and also object with all DOMElements properties.
 *  `Styled.div` `Styled.h1` and also `Styled(MyComponent)`. The component needs to accept className as prop.
 * 
 */
export type StyledType = typeof StyledFunction & typeof StyledObject

/**
 * style-components-clone
 */
const Styled: StyledType = Object.assign(StyledFunction, StyledObject)
export default Styled






// const Link = (props: React.PropsWithChildren<{ title: string, className?: string }>) => {
//     return <a className={props.className}>{props.title}</a>
// }

// const StyledL = StyledFunction(Link)``



// const Title = Styled.h1`
//     color: red;
// `


// function TestCom() {
//     // return <Title>Hello</Title>
//     return <StyledL title="TEST" />
// }