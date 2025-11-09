import React, {useEffect, useRef, useState} from 'react'
import AccountName from './AccountName'
import DeleteIcon from '../../widgets/DeleteIcon'
import styles from './Account.module.css'
import classNames from 'classnames'
import {deleteAccount, selectPayoutCompany} from '../../state/actions'
import {useDispatch} from 'react-redux'
import AccountValue from './AccountValue'
import {useSelector} from '../../state/useSelector'

export default function Account({id}: { id: number }) {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.config)
    const account = useSelector(state => state.accounts.find(account => account.id === id))
    const drag = useSelector(state => state.drag)
    const payout = useSelector(state => state.payout)

    const [showPayoutAnimation, setShowPayoutAnimation] = useState(false)
    const prevBalance = useRef(account.balance)

    useEffect(() => {
        if (account.balance > prevBalance.current) {
            setShowPayoutAnimation(true)
            const timer = setTimeout(() => setShowPayoutAnimation(false), 1200)
            return () => clearTimeout(timer)
        }
        prevBalance.current = account.balance
    }, [account.balance])

    function onDelete() {
        if (account.balance !== 0) {
            alert('Can not delete accounts with non-zero balance.')
            return
        }
        dispatch(deleteAccount({id}))
    }

    function onPayoutClick() {
        if (payout.active && account.type === 'company') {
            dispatch(selectPayoutCompany(account.id))
        }
    }

    let selected = !editing && (drag.from === account.id || drag.dragOver === account.id)
    let payoutDimmed = payout.active && account.type === 'company' && payout.selectedCompany !== account.id
    let payoutSelected = payout.active && payout.selectedCompany === account.id

    const deleteElement = account.id !== 0 && editing && (
        <DeleteIcon className={styles.deleteIcon} onClick={onDelete}/>
    )

    return (
        <div
            className={classNames(styles.body, payoutDimmed && styles.payoutDimmed, payoutSelected && styles.payoutSelected, showPayoutAnimation && styles.shine)}
            onClick={onPayoutClick}
        >
            <div className={classNames(styles.innerBorder)}>
                <AccountName id={id}/>
                {deleteElement}
                <div data-id={account.id} className={classNames(
                    styles.balance,
                    selected && styles.balanceSelected,
                    payoutSelected && styles.payoutSelected

                )}>
                    <AccountValue id={account.id}/>
                </div>
            </div>
        </div>
    )
}
