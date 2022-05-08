const DIGITS = ['0','1','2','3','4','5','6','7','8','9']

let cache = ''
let timer

/**
 * Accumulates input digits and returns the accumulated number
 * The accumulator is cleared after 1000 ms of inactivity
 */
export default function typedNumber(nextDigit: string, maxLength = 3) {
    if (DIGITS.includes(nextDigit)) {
        if (cache.length <= maxLength) {
            cache += nextDigit
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                cache = ''
            }, 1000)
        }
    }
    return parseInt(cache)
}