import React, {useRef, useState} from 'react'
import Account from '../Account/Account'
import './Overview.css'
import DragImage from './DragImage'
import {setDragOver, startDrag, stopDrag} from '../../state/actions'
import {transfer} from '../../services/thunks'
import Multiplier from '../Multiplier/Multiplier'
import Edit from '../Edit/Edit'
import Log from '../Log/Log'
import Help from '../Help/Help'
import * as selectors from '../../state/selectors'
import NewAccount from '../NewAccount/NewAccount'
import {useDispatch, useSelector} from '../../state/useSelector'


function findElementUnderCursor(x, y) {
    let element = document.elementFromPoint(x, y)

    if (element && element.id === 'dragimage') {
        // Temporarily hide dragimage to find the element below dragimage
        let dragimage: any = element
        let previousVisibility = dragimage.style.visibility
        dragimage.style.visibility = 'hidden'
        element = document.elementFromPoint(x, y)
        dragimage.style.visibility = previousVisibility
    }
    
    return element
}

export default function Overview() {

    const ref = useRef(null)
    const dispatch = useDispatch()
    const [position, setPosition] = useState({x: 0, y: 0})

    const editing = useSelector(state => state.config)
    const players = useSelector(state => selectors.players(state))
    const companies = useSelector(state => selectors.companies(state))
    const bank = useSelector(state => selectors.bank(state))
    const multiplier = useSelector(state => state.multiplier)
    const drag = useSelector(state => state.drag)
    const baseValue = useSelector(state => state.baseValue)


    function onMouseDown(e) {
        if (editing) return
        let element = findElementUnderCursor(e.clientX, e.clientY)
        if (element?.getAttribute('data-id') !== null) {
            dispatch(startDrag({from: parseInt(element.getAttribute('data-id'))}))
            e.preventDefault()
        }
    }

    function onMouseUp(e) {
        if (!editing && drag.from !== undefined) {
            let element = findElementUnderCursor(e.clientX, e.clientY)
            if (element?.getAttribute('data-id') !== null) {
                dispatch(transfer(drag.from, parseInt(element.getAttribute('data-id')), baseValue * multiplier))
            }
            dispatch(stopDrag())
        }
    }

    function onMouseMove(e) {
        if (!editing && drag.from !== undefined) {
            let element = findElementUnderCursor(e.clientX, e.clientY)
            if (element?.getAttribute('data-id') !== null) {
                let id = parseInt(element.getAttribute('data-id'))
                if (drag.dragOver !== id) {
                    dispatch(setDragOver(id))
                }
            }
        }
        const rect = ref.current.getBoundingClientRect()
        setPosition({x: e.clientX - rect.left, y: e.clientY - rect.top})
    }


    if (!bank) {
        return null
    }

    const playerElements = players.map((player) => (
        <Account key={player.id} id={player.id}/>
    ))
    const companyElements = companies.map(company => (
        <Account key={company.id} id={company.id}/>
    ))

    const bankElement = <Account id={0}/>


    return (
        <div className="overview"
             onMouseDown={onMouseDown}
             onMouseUp={onMouseUp}
             onMouseMove={onMouseMove}
             ref={ref}
        >
            <div className="overview__players">
                {playerElements}
                <NewAccount type={'player'}/>
            </div>
            <div className="overview__bank">
                {bankElement}
            </div>
            <div className="overview__companies">
                {companyElements}
                <NewAccount type={'company'}/>
            </div>
            <Multiplier/>
            <DragImage x={position.x}
                       y={position.y}
                       baseValue={baseValue}
                       multiplier={multiplier}
                       drag={drag}
            />
            <div className="overview__buttonRow">
                <Log/>
                <Edit/>
                <Help/>
            </div>
        </div>
    )
}