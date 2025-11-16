import React, {useState, useEffect} from 'react'
import styles from './Log.module.css'
import {useDispatch} from 'react-redux'
import {resetLog} from '../../state/actions'
import {useSelector} from '../../state/useSelector'
import Button from '../Button/Button'

export default function Log() {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const transactions = useSelector(state => [...state.transactions])
    const accounts = useSelector(state => state.accounts)

    function togglePanel() {
        setOpen(!open)
    }

    function onReset() {
        setShowConfirm(true)
    }

    function confirmReset() {
        dispatch(resetLog())
        setShowConfirm(false)
    }

    function cancelReset() {
        setShowConfirm(false)
    }

    // Handle ESC key to close panel or confirm dialog
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                if (showConfirm) {
                    setShowConfirm(false)
                } else if (open) {
                    setOpen(false)
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, showConfirm])

    transactions.reverse()

    function accountName(accountId: number) {
        const account = accounts.find(account => account.id === accountId)
        return account?.name || ('#' + accountId)
    }

    let logElements = transactions.map((transaction, index) => (
        <div key={index} className={styles.logEntry}>
            <div className={styles.time}>{transaction.time}</div>
            <div className={styles.text}>{accountName(transaction.from)} → {accountName(transaction.to)}</div>
            <div className={styles.value}>${transaction.value}</div>
        </div>
    ))
    const noTransactionsMsg = (logElements.length === 0) && <div className={styles.emptyText}>No transactions</div>

    return (
        <>
            <Button className={styles.logButton} onClick={togglePanel}>Log</Button>

            {/* Backdrop/Overlay */}
            {open && <div className={styles.overlay} onClick={togglePanel} />}

            {/* Confirm Dialog */}
            {showConfirm && (
                <>
                    <div className={styles.confirmOverlay} onClick={cancelReset} />
                    <div className={styles.confirmDialog}>
                        <h3>Reset Log</h3>
                        <p>Do you want to reset the log and delete all log entries?</p>
                        <div className={styles.confirmButtons}>
                            <button className={styles.cancelButton} onClick={cancelReset}>Cancel</button>
                            <button className={styles.confirmButton} onClick={confirmReset}>Reset</button>
                        </div>
                    </div>
                </>
            )}

            {/* Slide-out Panel */}
            <div className={`${styles.slidePanel} ${open ? styles.open : ''}`}>
                <div className={styles.innerBorder}>
                    <div className={styles.content}>
                        <h2 className={styles.header}>Log</h2>
                        <p>All transactions since the game was started</p>
                        <div className={styles.list}>
                            {logElements}
                            {noTransactionsMsg}
                        </div>
                    </div>
                    <div className={styles.buttonRow}>
                        <Button onClick={onReset}
                                disabled={transactions.length === 0}>Reset log
                        </Button>
                        <Button onClick={togglePanel}>Close</Button>
                    </div>
                </div>
            </div>
        </>

    )

}

