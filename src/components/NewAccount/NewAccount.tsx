import React from 'react'
import styles from './NewAccount.module.css'
import {useDispatch} from 'react-redux'
import {addAccount} from '../../state/actions'
import {useSelector} from '../../state/useSelector'
import {AccountType} from '../../state/types'

export default function NewAccount({type}: {type: AccountType}) {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.config)

    if (!editing) {
        return null
    }

    function onClick() {
        dispatch(addAccount({type: type}))
    }

    return (
        <div className={styles.body} onClick={onClick}>
            <div className={styles.text}>Add player</div>
        </div>
    )
}
