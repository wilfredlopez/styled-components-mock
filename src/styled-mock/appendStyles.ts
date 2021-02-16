import { replaceAnd, generateClassName } from './utils'
import { AND_STYLES_REGEX, ATTR, MEDIA_REGEX, } from './constants'


//get the style tag in head or create new one.
export function getStyleTag(): HTMLStyleElement {
    let existing = document.querySelector(`style[${ATTR}]`) as HTMLStyleElement | null
    if (!existing) {
        existing = document.createElement('style')
        existing.setAttribute(ATTR, '')
    }
    return existing
}


function getMediaStyles(styleString: string, className: string) {
    let mediaStyles = ''
    const media = styleString.match(MEDIA_REGEX)


    if (media) {
        mediaStyles = media.join('')
        styleString = styleString.replace(mediaStyles, '')
        mediaStyles = mediaStyles.replace("{", `{ .${className} {`)
        mediaStyles += "}"
    }
    return [mediaStyles, styleString]
}

function getAndStyles(styleString: string, className: string) {
    let andStyles = ''
    const match = styleString.match(AND_STYLES_REGEX)
    if (match) {
        andStyles = match.join('')
    }

    const [d] = getMediaStyles(styleString, className)
    let deep = replaceAnd(d, className).replace(`.${className}`, "").replace("{", '')
    deep = deep.substring(0, deep.length - 1)
    // const deepMedia = andStyles.match(AND_STYLES_REGEX)?.join() || ""
    styleString = styleString.replace(andStyles, '')
    andStyles = replaceAnd(andStyles, className) + deep
    return [andStyles, styleString]
}



function addStylesToClassName(styles: string, className: string) {

    let [andStyles, stylesWithoutAnd] = getAndStyles(styles, className)
    styles = stylesWithoutAnd

    const [mediaStyles, styledWithoutmedia] = getMediaStyles(styles, className)
    styles = styledWithoutmedia.replace(AND_STYLES_REGEX, '')

    const thisStyles = `
    .${className}{
        ${styles.trim()}
    }
    ${andStyles.trim()}
    ${mediaStyles.trim()}
    `
    return thisStyles
}

export function appendStylesWithString(template: string, Tag: React.ComponentType<any> | string) {
    const styleTag = getStyleTag()

    const comName = typeof Tag === 'string' ? Tag : (Tag as any).displayName || Tag.name
    //unique className
    const className = generateClassName(comName)

    //exising content in the style tag
    const inner = styleTag.innerHTML

    const thisStyles = addStylesToClassName(template, className)
    //concat the existing styles to the new ones.
    styleTag.innerHTML = inner.concat(thisStyles)
    //Append to DOM.
    //it looks like this doesnt lead to any dupplicates.
    //if the styleTag was an exising one in the DOM. it will just be replaced.
    document.head.append(styleTag)
    return className
}


