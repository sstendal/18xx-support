import React, {useEffect, useState} from 'react'
import {useSelector} from '../../state/useSelector'
import './PayoutPreview.css'

interface PayoutPosition {
    accountId: number
    amount: number
    x: number
    y: number
}

export default function PayoutPreview() {
    const payout = useSelector(state => state.payout)
    const accounts = useSelector(state => state.accounts)
    const baseValue = useSelector(state => state.baseValue)
    const multiplier = useSelector(state => state.multiplier)
    const [positions, setPositions] = useState<PayoutPosition[]>([])

    useEffect(() => {
        if (!payout.preview || payout.selectedCompany === null) {
            setPositions([])
            return
        }

        const payoutPerShare = baseValue * multiplier
        const newPositions: PayoutPosition[] = []

        accounts.forEach(account => {
            // Skip the bank
            if (account.id === 0) return

            const shares = account.shares[payout.selectedCompany!] || 0
            if (shares === 0) return

            const amount = shares * payoutPerShare

            // Find the account element (data-id is on the balance div, we want the parent account box)
            const element = document.querySelector(`[data-id="${account.id}"]`)
            if (element && element.parentElement) {
                const rect = element.parentElement.getBoundingClientRect()
                // Position at the center of the account box
                newPositions.push({
                    accountId: account.id,
                    amount,
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                })
            }
        })

        setPositions(newPositions)
    }, [payout.preview, payout.selectedCompany, accounts, baseValue, multiplier])

    if (!payout.preview) return null

    return (
        <>
            {positions.map(pos => (
                <div
                    key={pos.accountId}
                    className="payout-preview-dragimage"
                    style={{left: `calc(${pos.x}px + 1rem)`, top: `calc(${pos.y}px + 1rem)`}}
                >
                    ${pos.amount}
                </div>
            ))}
        </>
    )
}
