import { createElement, Component } from 'react'
import type { TemplateType, TemplateFunction } from './types'
import { interLeave, getClassName } from './interLeave'

/**
 * Mimic styled-components API by asiging a class to the tag or component and adding to document's head.
 */
export function makeStyles<P extends { className?: string }, T extends keyof JSX.IntrinsicElements | React.ComponentType<P>>(Tag: T, template: TemplateType, ...fns: (TemplateFunction<P>)[]) {
    const data = interLeave(template, ...fns)
    //Return Component
    if (Tag instanceof Component || typeof Tag === 'function') {
        const Comp = Tag as React.ComponentClass<P>
        // const Comp = Tag as React.FC<P>
        return (props: P) => {
            const className = getClassName(props, Tag, data)
            return <Comp {...props} className={className} />
        }
    }
    //Create Element
    const Element = (props: T extends keyof JSX.IntrinsicElements ? React.ComponentProps<T> : any) => {
        const className = getClassName(props, Tag, data)
        return createElement(Tag, { ...props, className: className }, props.children)
    }
    return Element
}


