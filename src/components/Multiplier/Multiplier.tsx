import React from 'react'
import MultiplierSelector from './MultiplierSelector'
import './Multiplier.css'
import Slider from './Slider'
import {useSelector} from '../../state/useSelector'

export default function Multiplier() {

    const multiplier = useSelector(state => state.multiplier)

    let selectors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(factor => (
        <MultiplierSelector key={factor}
                            factor={factor}
                            isSelected={factor === multiplier}
        />
    ))
    return (
        <div className="multiplier">
            <Slider/>
            {selectors}
        </div>
    )
}