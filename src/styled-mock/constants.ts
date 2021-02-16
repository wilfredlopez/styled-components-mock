



const UPPER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const LOWER = UPPER.map(l => l.toLowerCase())
export const LETTERS = [...UPPER, ...LOWER]

export const ATTR = 'wl-data-css' as const


/**
 * regex to match `&:hover{
 * ...
 * }`
 * or `& h1{
 *  ...
 * }`
 */
export const AND_STYLES_REGEX = /(&.*)(\{)([\s].*)+(\}$)/gm
export const MEDIA_REGEX = /(@media.*)(\{)([\s].*)+(\}$)/gm