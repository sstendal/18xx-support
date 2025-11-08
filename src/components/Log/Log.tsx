import React, {useState, useEffect} from 'react'
import styles from './Log.module.css'
import {useDispatch} from 'react-redux'
import {resetLog} from '../../state/actions'
import {useSelector} from '../../state/useSelector'

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

    function accountName(accountIndex: number) {
        return accounts[accountIndex]?.name || ('#' + accountIndex)
    }

    let logElements = transactions.map((transaction, index) => (
        <div key={index} className={styles.logEntry}>
            <div className={styles.time}>{transaction.time}</div>
            <div className={styles.text}>From {accountName(transaction.from)} to {accountName(transaction.to)}</div>
            <div className={styles.value}>${transaction.value}</div>
        </div>
    ))
    const noTransactionsMsg = (logElements.length === 0) && <div className={styles.emptyText}>No transactions</div>

    return (
        <>
            <button className={styles.logButton} onClick={togglePanel}>Log</button>

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
                <div className={styles.content}>
                    <h2>Log</h2>
                    <p>All transactions since the game was started</p>
                    <div className={styles.list}>
                        {logElements}
                        {noTransactionsMsg}
                    </div>
                </div>
                <div className={styles.buttonRow}>
                    <button className={styles.closeButton} onClick={onReset}
                            disabled={transactions.length === 0}>Reset log
                    </button>
                    <button className={styles.closeButton} onClick={togglePanel}>Close</button>
                </div>
            </div>
        </>

    )

}

