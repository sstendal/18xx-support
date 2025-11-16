import React from 'react'
import './Slider.css'
import {ReactComponent as MiddleSpeed} from './middle-speed.svg'
import {ReactComponent as LowSpeed} from './low-speed.svg'
import {useDispatch} from '../../state/useSelector'
import useRepeatClick from './useRepeatClick'
import {useState} from 'react'
import {adjustBaseValueAndSave} from '../../services/thunks'

export default function Slider() {

    const dispatch = useDispatch()
    const [pressed, setPressed] = useState(false)

    const mouseFunctions = {
        onMouseDown: function (e) {
            e.preventDefault()
            setPressed(true)
        },

        onMouseUp: function (e) {
            setPressed(false)
        },
    }
    return (
        <div className={'slider__body'} {...mouseFunctions}>
            <MiddleSpeed className={'slider__up'} {...useRepeatClick(pressed, () => dispatch(adjustBaseValueAndSave(10)))}/>
            <LowSpeed className={'slider__up'} {...useRepeatClick(pressed, () => dispatch(adjustBaseValueAndSave(1)))}/>
            <LowSpeed className={'slider__down'} {...useRepeatClick(pressed, () => dispatch(adjustBaseValueAndSave(-1)))}/>
            <MiddleSpeed className={'slider__down'} {...useRepeatClick(pressed, () => dispatch(adjustBaseValueAndSave(-10)))}/>
        </div>
    )
}
