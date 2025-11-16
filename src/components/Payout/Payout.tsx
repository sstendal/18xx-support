import React from 'react'
import styles from './Payout.module.css'
import {useDispatch, useSelector} from '../../state/useSelector'
import {startPayout, stopPayout, startPayoutPreview, stopPayoutPreview} from '../../state/actions'
import {makePayout} from '../../services/thunks'
import Button from '../Button/Button'

export default function Payout() {

    const dispatch = useDispatch()
    const payoutActive = useSelector(state => state.payout.active)
    const selectedCompany = useSelector(state => state.payout.selectedCompany)
    const preview = useSelector(state => state.payout.preview)
    const baseValue = useSelector(state => state.baseValue)
    const multiplier = useSelector(state => state.multiplier)
    const bankShares = useSelector(state => state.accounts[0].shares[selectedCompany])

    function onStart() {
        dispatch(startPayout())
    }

    function onStop() {
        dispatch(stopPayout())
    }

    function onShowPreview() {
        if (selectedCompany !== null) {
            dispatch(startPayoutPreview())
        }
    }

    function onCancelPreview() {
        dispatch(stopPayoutPreview())
    }

    function onConfirmPayout() {
        if (selectedCompany !== null) {
            dispatch(stopPayoutPreview())
            dispatch(makePayout(selectedCompany, baseValue, multiplier))
        }
    }

    const showMakePayoutButton = payoutActive && selectedCompany !== null && (!bankShares || bankShares < 10) && !preview
    const showConfirmButton = payoutActive && selectedCompany !== null && preview
    const showInstruction = payoutActive && selectedCompany === null && !preview
    const showShareInstruction = payoutActive && selectedCompany !== null && bankShares === 10 && !preview

    return (
        <>
            {!payoutActive && (
                <Button className={styles.payoutButton} onClick={onStart}>Payout</Button>
            )}
            {payoutActive && (
                <Button className={styles.payoutButton} onClick={onStop}>Done</Button>
            )}
            {showInstruction && (
                <div className={styles.instruction}>Select a company</div>
            )}
            {showShareInstruction && (
                <div className={styles.instruction}>Distribute the shares</div>
            )}
            {showMakePayoutButton && (
                <Button className={styles.makePayoutButton} onClick={onShowPreview}>Make payout of ${baseValue * multiplier} pr. share</Button>
            )}
            {showConfirmButton && (
                <div className={styles.confirmButtons}>
                    <Button className={styles.confirmButton} onClick={onCancelPreview}>Cancel</Button>
                    <Button className={styles.confirmButton} onClick={onConfirmPayout}>Confirm</Button>
                </div>
            )}
        </>
    )
}
