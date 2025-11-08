import React from 'react'
import './DragImage.css'
import {DragData, PayoutData} from '../../state/types'

type Props = {
    drag: DragData,
    x: number,
    y: number,
    baseValue: number,
    multiplier: number,
    payout: PayoutData
}

export default function DragImage({drag, x, y, baseValue, multiplier, payout}: Props) {

    if (drag.from === undefined) return null

    let style = {left: x, top: y}

    const isPayoutMode = payout.active && payout.selectedCompany !== null
    const className = isPayoutMode ? "dragimage dragimage--share" : "dragimage"
    const content = isPayoutMode ? "1 share" : `$${baseValue * multiplier}`

    return (
        <div id="dragimage" className={className} style={style}>
            {content}
        </div>
    )

}