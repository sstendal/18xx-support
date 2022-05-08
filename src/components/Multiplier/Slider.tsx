import React from 'react'
import './Slider.css'
import {ReactComponent as MiddleSpeed} from './middle-speed.svg'
import {ReactComponent as LowSpeed} from './low-speed.svg'
import * as actions from '../../state/actions'
import {useDispatch} from 'react-redux'
import useRepeatClick from './useRepeatClick'
import {useState} from 'react'

export default function Slider() {

    const dispatch = useDispatch()
    const [pressed, setPressed] = useState(false)

    const mouseFunctions = {
        onMouseDown: function (e) {
            console.log('down')
            e.preventDefault()
            setPressed(true)
        },

        onMouseUp: function (e) {
            console.log('up')
            setPressed(false)
        },
    }
    return (
        <div className={'slider__body'} {...mouseFunctions}>
            <MiddleSpeed className={'slider__up'} {...useRepeatClick(pressed, () => dispatch(actions.adjustBaseValue(10)))}/>
            <LowSpeed className={'slider__up'} {...useRepeatClick(pressed, () => dispatch(actions.adjustBaseValue(1)))}/>
            <LowSpeed className={'slider__down'} {...useRepeatClick(pressed, () => dispatch(actions.adjustBaseValue(-1)))}/>
            <MiddleSpeed className={'slider__down'} {...useRepeatClick(pressed, () => dispatch(actions.adjustBaseValue(-10)))}/>
        </div>
    )
}