import React from 'react'
import styles from './App.module.css'
import Overview from '../Overview/Overview'

export default function App() {
    return (
        <>
            <div className={styles.body}>
                <Overview/>
            </div>
            <div className={styles.sizeWarning}>
                <div>
                    <p>
                        This is a desktop app. It will not make much sense on a small device.
                    </p>
                    <p>
                        Minimum screen size: 1280px * 650px
                    </p>
                </div>
            </div>
        </>
    )
}
