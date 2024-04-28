import React, {useState} from 'react'
import Modal from 'react-modal'
import styles from './Log.module.css'
import {useDispatch} from 'react-redux'
import {resetLog} from '../../state/actions'
import {useSelector} from '../../state/useSelector'

export default function Log() {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const transactions = useSelector(state => [...state.transactions])
    const accounts = useSelector(state => state.accounts)

    function toggleModal() {
        setOpen(!open)
    }

    function onReset() {
        let ok = window.confirm('Do you want to reset the log and delete all log entries?')
        if (ok) {
            dispatch(resetLog())
        }
    }

    transactions.reverse()

    function accountName(accountIndex: number) {
        return accounts[accountIndex]?.name || ('#' + accountIndex)
    }

    let logElements = transactions.map((transaction, index) => (
        <div key={index} className={styles.logEntry}>
            <div className={styles.time}>{transaction.time}</div>
            <div className={styles.text}>From {accountName(transaction.from)} to {accountName[transaction.to]}</div>
            <div className={styles.value}>${transaction.value}</div>
        </div>
    ))
    const noTransactionsMsg = (logElements.length === 0) && <div className={styles.emptyText}>No transactions</div>

    return (
        <>
            <button className={styles.logButton} onClick={toggleModal}>Log</button>
            <Modal
                isOpen={open}
                onRequestClose={toggleModal}
                contentLabel="Log"
            >
                <h2>Log</h2>
                <p>All transactions since the game was started</p>
                <div className={styles.list}>
                    {logElements}
                    {noTransactionsMsg}
                </div>
                <div className={styles.buttonRow}>
                    <button className={styles.closeButton} onClick={onReset}
                            disabled={transactions.length === 0}>Reset log
                    </button>
                    <button className={styles.closeButton} onClick={toggleModal}>Close</button>
                </div>
            </Modal>
        </>

    )

}

