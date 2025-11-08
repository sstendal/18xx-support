import React from 'react'
import {accountSet} from '../../state/actions'
import {useDispatch} from 'react-redux'
import styles from './Account.module.css'
import {useSelector} from '../../state/useSelector'

export default function AccountValue({id}: {id: number}) {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.config)
    const account = useSelector(state => state.accounts.find(account => account.id === id))
    const drag = useSelector(state => state.drag)
    const baseValue = useSelector(state => state.baseValue)
    const multiplier = useSelector(state => state.multiplier)
    const payout = useSelector(state => state.payout)

    function onChange(e) {
        dispatch(accountSet({id: account.id, value: parseInt(e.target.value)}))
    }

    let value

    // In payout mode with a selected company, show shares instead of balance
    if (payout.active && payout.selectedCompany !== null) {
        // Non-selected companies should not show any number
        if (account.type === 'company' && account.id !== payout.selectedCompany) {
            value = '\u00A0'  // Non-breaking space
        } else {
            let shares = account.shares[payout.selectedCompany] || 0

            // Show drag preview for shares
            if (drag.from === account.id) {
                shares = shares - 1
            } else if (drag.dragOver === account.id) {
                shares = shares + 1
            }

            // Companies don't have room for the suffix, only show it for players and bank
            if (account.type === 'company') {
                value = shares
            } else {
                value = `${shares} ${shares === 1 ? 'share' : 'shares'}`
            }
        }
    } else if (payout.active && payout.selectedCompany === null) {
        // In payout mode but no company selected - show space to maintain layout
        value = '\u00A0'  // Non-breaking space
    } else if (editing) {
        value = <input className={styles.editingFontSize} onChange={onChange} type={'number'} value={account.balance}/>
    } else {
        value = account.balance
        if (drag.from === account.id) {
            value = value - (baseValue * multiplier)
        } else if (drag.dragOver === account.id) {
            value = value + (baseValue * multiplier)
        }
    }

    return (
        <>
            {value}
        </>
    )

}

