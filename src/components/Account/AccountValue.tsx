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

    function onChange(e) {
        dispatch(accountSet({id: account.id, value: parseInt(e.target.value)}))
    }

    let value
    if (editing) {
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

