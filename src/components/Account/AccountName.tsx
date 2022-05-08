import React from 'react'
import {setAccountName} from '../../state/actions'
import {useDispatch} from 'react-redux'
import styles from './Account.module.css'
import {useSelector} from '../../state/useSelector'

export default function AccountName({id}: {id: number}) {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.config)
    const account = useSelector(state => state.accounts.find(account => account.id === id))

    function onChange(e) {
        dispatch(setAccountName({id: account.id, name: e.target.value}))
    }

    const value = editing && account.id !== 0 ? <input onChange={onChange} value={account.name}/> : account.name

    return (
        <div className={styles.name}>
            {value}
        </div>
    )

}

