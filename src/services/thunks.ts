import {accountAdjust, addTransaction, setBaseValue, setMultiplier, selectPayoutCompany, saveCompanyPayoutValues, adjustBaseValue} from '../state/actions'
import moment from 'moment'
import typedNumber from './typedNumber'

const DIGITS = ['0','1','2','3','4','5','6','7','8','9']

export const transfer = (from, to, value) => dispatch => {
    if (from === to) return
    dispatch(accountAdjust({id: from, value: -value}))
    dispatch(accountAdjust({id: to, value: value}))
    dispatch(addTransaction({
        type: 'manual',
        from,
        to,
        value,
        time: moment().format('HH:mm:ss')
    }))
}

export const selectPayoutCompanyAndRestore = (companyId) => (dispatch, getState) => {
    const state = getState()
    const savedValues = state.companyPayoutHistory[companyId]

    // Select the company
    dispatch(selectPayoutCompany(companyId))

    // Restore saved values if they exist
    if (savedValues) {
        dispatch(setMultiplier(savedValues.multiplier))
        dispatch(setBaseValue(savedValues.baseValue))
    }
}

export const setMultiplierAndSave = (multiplier) => (dispatch, getState) => {
    const state = getState()
    dispatch(setMultiplier(multiplier))

    // Save values if in payout mode
    if (state.payout.active && state.payout.selectedCompany !== null) {
        dispatch(saveCompanyPayoutValues({
            companyId: state.payout.selectedCompany,
            multiplier,
            baseValue: state.baseValue
        }))
    }
}

export const adjustBaseValueAndSave = (adjustment) => (dispatch, getState) => {
    const state = getState()
    dispatch(adjustBaseValue(adjustment))

    // Get the new base value from state after adjustment
    const newState = getState()

    // Save values if in payout mode
    if (state.payout.active && state.payout.selectedCompany !== null) {
        dispatch(saveCompanyPayoutValues({
            companyId: state.payout.selectedCompany,
            multiplier: state.multiplier,
            baseValue: newState.baseValue
        }))
    }
}

export const makePayout = (companyId, baseValue, multiplier) => (dispatch, getState) => {
    const state = getState()
    const accounts = state.accounts
    const bankId = 0
    const payoutPerShare = baseValue * multiplier
    const transfers = []

    // Save the payout values for this company
    dispatch(saveCompanyPayoutValues({
        companyId,
        multiplier,
        baseValue
    }))

    // Pay out to all accounts except the bank
    accounts.forEach(account => {
        if (account.id === bankId) return  // Skip bank

        const shares = account.shares[companyId] || 0
        if (shares > 0) {
            const payoutAmount = shares * payoutPerShare

            // Adjust account balances
            dispatch(accountAdjust({id: bankId, value: -payoutAmount}))
            dispatch(accountAdjust({id: account.id, value: payoutAmount}))

            // Collect transfer data
            transfers.push({
                toAccountId: account.id,
                amount: payoutAmount,
                shares: shares
            })
        }
    })

    // Create a single payout transaction
    if (transfers.length > 0) {
        dispatch(addTransaction({
            type: 'payout',
            time: moment().format('HH:mm:ss'),
            companyId: companyId,
            baseValue: baseValue,
            multiplier: multiplier,
            transfers: transfers
        }))
    }
}

export function listenToKeyEvents() {
    return (dispatch, getState) => {


        window.addEventListener('keydown', function (e) {
            console.log('Keydown', e.key, e.shiftKey)

            // Ignore keyboard events when typing in input fields or in edit mode
            const state = getState()
            const activeElement = document.activeElement
            const isTypingInInput = activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                (activeElement as HTMLElement).isContentEditable
            )

            if (isTypingInInput || state.config) {
                return
            }

            // Arrow keys change the selected multiplier
            if (e.key === 'ArrowRight') {
                const currentMultiplier = state.multiplier
                const newMultiplier = Math.min(currentMultiplier + 1, 10)
                if (currentMultiplier !== newMultiplier) {
                    dispatch(setMultiplier(newMultiplier))
                    // Save values if in payout mode
                    if (state.payout.active && state.payout.selectedCompany !== null) {
                        dispatch(saveCompanyPayoutValues({
                            companyId: state.payout.selectedCompany,
                            multiplier: newMultiplier,
                            baseValue: state.baseValue
                        }))
                    }
                }
            }
            if (e.key === 'ArrowLeft') {
                const currentMultiplier = state.multiplier
                const newMultiplier = Math.max(currentMultiplier - 1, 1)
                if (currentMultiplier !== newMultiplier) {
                    dispatch(setMultiplier(newMultiplier))
                    // Save values if in payout mode
                    if (state.payout.active && state.payout.selectedCompany !== null) {
                        dispatch(saveCompanyPayoutValues({
                            companyId: state.payout.selectedCompany,
                            multiplier: newMultiplier,
                            baseValue: state.baseValue
                        }))
                    }
                }
            }

            // Digits change the base value
            if (DIGITS.includes(e.key)) {
                const newBaseValue = typedNumber(e.key)
                dispatch(setBaseValue(newBaseValue))
                // Save values if in payout mode
                if (state.payout.active && state.payout.selectedCompany !== null) {
                    dispatch(saveCompanyPayoutValues({
                        companyId: state.payout.selectedCompany,
                        multiplier: state.multiplier,
                        baseValue: newBaseValue
                    }))
                }
            }

            if (e.key === 'Backspace' || e.key === 'Delete') {
                dispatch(setBaseValue(1))
                // Save values if in payout mode
                if (state.payout.active && state.payout.selectedCompany !== null) {
                    dispatch(saveCompanyPayoutValues({
                        companyId: state.payout.selectedCompany,
                        multiplier: state.multiplier,
                        baseValue: 1
                    }))
                }
            }

        }, true)


    }
}
