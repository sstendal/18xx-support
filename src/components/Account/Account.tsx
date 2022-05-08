import React from 'react'
import AccountName from './AccountName'
import DeleteIcon from '../../widgets/DeleteIcon'
import styles from './Account.module.css'
import classNames from 'classnames'
import {deleteAccount} from '../../state/actions'
import {useDispatch} from 'react-redux'
import AccountValue from './AccountValue'
import {useSelector} from '../../state/useSelector'

export default function Account({id}: {id: number}) {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.config)
    const account = useSelector(state => state.accounts.find(account => account.id === id))
    const drag = useSelector(state => state.drag)

    function onDelete() {
        if (account.balance !== 0) {
            alert('Can not delete accounts with non-zero balance.')
            return
        }
        dispatch(deleteAccount({id}))
    }

    let selected = !editing && (drag.from === account.id || drag.dragOver === account.id)

    const deleteElement = account.id !== 0 && editing && (
        <DeleteIcon className={styles.deleteIcon} onClick={onDelete}/>
    )

    return (
        <div className={styles.body}>
            <AccountName id={id}/>
            {deleteElement}
            <div data-id={account.id} className={classNames(styles.balance, selected && styles.balanceSelected)}>
                <AccountValue id={account.id}/>
            </div>
        </div>
    )
}
