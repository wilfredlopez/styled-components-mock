
import { LETTERS, } from './constants'


let index = 0
export function generateClassName(componentName?: string) {
    let className = ''
    index++

    for (let i = 0; i < 10; i++) {
        const rand = randomInt(0, LETTERS.length - 1)
        className += LETTERS[rand]
    }
    if (componentName) {
        return componentName + "_" + className + index
    }
    return className + index
}








export function randomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}




export function replaceAnd(string: string, className: string) {
    return string.replace(/&/gm, `.${className}`)
}