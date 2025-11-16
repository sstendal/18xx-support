import React from 'react'
import classNames from 'classnames'
import {useDispatch, useSelector} from '../../state/useSelector'
import {setMultiplierAndSave} from '../../services/thunks'

export default function MultiplierSelector({isSelected, factor}: {isSelected: boolean, factor: number}) {

    const dispatch = useDispatch()
    const baseValue = useSelector(state => state.baseValue)

    function setMultiplier(value) {
        dispatch(setMultiplierAndSave(value))
    }

    return (
        <div className={classNames('multiplier__selector', {'multiplier__selector--selected': isSelected})}
             onClick={() => setMultiplier(factor)}>

            <div className={classNames('multiplier__number', {'multiplier__number--small': baseValue > 99}, {'multiplier__number--very-small': baseValue > 999} )}>
                {factor * baseValue}
            </div>
        </div>
    )
}