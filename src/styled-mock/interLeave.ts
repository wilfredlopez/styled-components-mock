import type { Interpolation, TemplateFunction } from './types'
import { appendStylesWithString } from './appendStyles'
/**
 * keeps all functions in template string to be called later with component props
 * @param strings template string
 * @param interpolations functions in template string that takes prop as argument. {}
 */
export function interLeave<T extends {}>(
    strings: TemplateStringsArray,
    ...interpolations: Array<TemplateFunction<T>>
): Array<Interpolation<T>> {
    // keeps all functions in template string to be called later with component props...
    const result: Array<Interpolation<T>> = [strings[0]]

    for (let i = 0, len = interpolations.length; i < len; i += 1) {
        result.push(interpolations[i], strings[i + 1])
    }
    return result
}

export function transformString<T extends {}>(result: Array<Interpolation<T>>, props: T) {
    let str = ''
    for (let val of result) {
        if (typeof val === 'function') {
            str += String(val(props))
        } else {
            str += val
        }
    }
    return str
}

export function getClassName<P extends {}>(props: P, Tag: React.ComponentType<any> | string, data: Interpolation<P>[]) {
    const value = transformString(data, props)
    return mergeClasses(appendStylesWithString(value, Tag), props)
}

export function mergeClasses(className: string, props: { className?: string }) {
    return className.concat(" " + (props.className || "")).trim()
}
