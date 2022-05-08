import React from 'react'

const PlusIcon = ({className, onClick}) => (
    <svg viewBox="0 0 184 184" className={className} onClick={onClick}>
        <g transform="translate(5.000000, 5.000000)" stroke="#fff" strokeWidth="10">
            <circle cx="87" cy="87" r="87"/>
            <line x1="50.25" y1="86.75" x2="123.75" y2="87.25" strokeLinecap="round"/>
            <line x1="87.5" y1="51" x2="87" y2="124.5" strokeLinecap="round"/>
        </g>
    </svg>
)

export default PlusIcon