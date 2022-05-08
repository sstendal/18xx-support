import {accountAdjust, addTransaction, setBaseValue, setMultiplier} from '../state/actions'
import moment from 'moment'
import typedNumber from './typedNumber'

const DIGITS = ['0','1','2','3','4','5','6','7','8','9']

export const transfer = (from, to, value) => dispatch => {
    if (from === to) return
    dispatch(accountAdjust({id: from, value: -value}))
    dispatch(accountAdjust({id: to, value: value}))
    dispatch(addTransaction({from, to, value, time: moment().format('HH:mm:ss')}))
}

export function listenToKeyEvents() {
    return (dispatch, getState) => {


        window.addEventListener('keydown', function (e) {
            console.log('Keydown', e.key, e.shiftKey)

            // Arrow keys change the selected multiplier
            if (e.key === 'ArrowRight') {
                const currentMultiplier = getState().multiplier
                const newMultiplier = Math.min(currentMultiplier + 1, 10)
                if (currentMultiplier !== newMultiplier) {
                    dispatch(setMultiplier(newMultiplier))
                }
            }
            if (e.key === 'ArrowLeft') {
                const currentMultiplier = getState().multiplier
                const newMultiplier = Math.max(currentMultiplier - 1, 1)
                if (currentMultiplier !== newMultiplier) {
                    dispatch(setMultiplier(newMultiplier))
                }
            }

            // Digits change the base value
            if (DIGITS.includes(e.key)) {
                dispatch(setBaseValue(typedNumber(e.key)))
            }

            if (e.key === 'Backspace' || e.key === 'Delete') {
                dispatch(setBaseValue(1))
            }

        }, true)


    }
}