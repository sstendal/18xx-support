import React from 'react'
import './DragImage.css'
import {DragData} from '../../state/types'

type Props = {
    drag: DragData,
    x: number,
    y: number,
    baseValue: number,
    multiplier: number
}

export default function DragImage({drag, x, y, baseValue, multiplier}: Props) {

    if (drag.from === undefined) return null

    let style = {left: x, top: y}

    return (
        <div id="dragimage" className="dragimage" style={style}>
            ${baseValue * multiplier}
        </div>
    )

}