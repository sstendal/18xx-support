import React from 'react'
import styles from './Button.module.css'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button className={classNames(styles.button, className)} {...props}>
            {children}
        </button>
    )
}
