import React from 'react'
import styles from './Edit.module.css'
import {useDispatch} from 'react-redux'
import {startConfig, stopConfig} from '../../state/actions'
import {useSelector} from '../../state/useSelector'
import Button from '../Button/Button'

export default function Edit() {

    const config = useSelector(state => state.config)
    const dispatch = useDispatch()

    function toggle() {
        if (config) {
            dispatch(stopConfig())
        } else {
            dispatch(startConfig())
        }
    }

    const done = config && (
        <div className={styles.done}>
            <h2 className={styles.header}>Edit setup</h2>
            <p>
                Add or remove players and companies and adjust balance.
            </p>
            <Button className={styles.configButton} onClick={toggle}>Done</Button>
        </div>

    )

    return (
        <>
            <Button className={styles.configButton} onClick={toggle}>Edit</Button>
            {done}
        </>
    )

}

