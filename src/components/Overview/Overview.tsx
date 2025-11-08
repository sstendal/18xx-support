import React, {useRef, useState} from 'react'
import Account from '../Account/Account'
import './Overview.css'
import DragImage from './DragImage'
import {setDragOver, startDrag, stopDrag, transferShare} from '../../state/actions'
import {transfer} from '../../services/thunks'
import Multiplier from '../Multiplier/Multiplier'
import Edit from '../Edit/Edit'
import Log from '../Log/Log'
import Help from '../Help/Help'
import Payout from '../Payout/Payout'
import PayoutPreview from '../Payout/PayoutPreview'
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
    const payout = useSelector(state => state.payout)
    const payoutActive = useSelector(state => state.payout.active)
    const players = useSelector(state => selectors.players(state))
    const companies = useSelector(state => selectors.companies(state))
    const bank = useSelector(state => selectors.bank(state))
    const multiplier = useSelector(state => state.multiplier)
    const drag = useSelector(state => state.drag)
    const baseValue = useSelector(state => state.baseValue)


    function onMouseDown(e) {
        if (editing) return
        // Disable drag in payout mode when no company is selected
        if (payout.active && payout.selectedCompany === null) return

        let element = findElementUnderCursor(e.clientX, e.clientY)
        if (element?.getAttribute('data-id') !== null) {
            const fromId = parseInt(element.getAttribute('data-id'))

            // In payout mode, prevent dragging from non-selected companies
            if (payout.active && payout.selectedCompany !== null) {
                const fromAccount = [...players, ...companies, bank].find(acc => acc.id === fromId)
                if (fromAccount?.type === 'company' && fromAccount.id !== payout.selectedCompany) {
                    return  // Don't start drag from non-selected company
                }
            }

            dispatch(startDrag({from: fromId}))
            e.preventDefault()
        }
    }

    function onMouseUp(e) {
        if (!editing && drag.from !== undefined) {
            let element = findElementUnderCursor(e.clientX, e.clientY)
            if (element?.getAttribute('data-id') !== null) {
                const toId = parseInt(element.getAttribute('data-id'))

                // In payout mode, transfer shares instead of money
                if (payout.active && payout.selectedCompany !== null) {
                    // Prevent dropping to non-selected companies
                    const toAccount = [...players, ...companies, bank].find(acc => acc.id === toId)
                    if (toAccount?.type === 'company' && toAccount.id !== payout.selectedCompany) {
                        dispatch(stopDrag())
                        return  // Don't allow drop on non-selected company
                    }

                    if (drag.from !== toId) {
                        dispatch(transferShare({from: drag.from, to: toId, companyId: payout.selectedCompany, count: 1}))
                    }
                } else {
                    dispatch(transfer(drag.from, toId, baseValue * multiplier))
                }
            }
            dispatch(stopDrag())
        }
    }

    function onMouseMove(e) {
        if (!editing && drag.from !== undefined) {
            let element = findElementUnderCursor(e.clientX, e.clientY)
            if (element?.getAttribute('data-id') !== null) {
                let id = parseInt(element.getAttribute('data-id'))

                // In payout mode, don't show drag preview over non-selected companies
                if (payout.active && payout.selectedCompany !== null) {
                    const overAccount = [...players, ...companies, bank].find(acc => acc.id === id)
                    if (overAccount?.type === 'company' && overAccount.id !== payout.selectedCompany) {
                        // Don't set dragOver for non-selected companies
                        if (drag.dragOver !== undefined) {
                            dispatch(setDragOver(undefined))
                        }
                    } else {
                        if (drag.dragOver !== id) {
                            dispatch(setDragOver(id))
                        }
                    }
                } else {
                    if (drag.dragOver !== id) {
                        dispatch(setDragOver(id))
                    }
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
                       payout={payout}
            />
            <div className="overview__buttonRow">
                <Payout/>
                {!payoutActive && <Log/>}
                {!payoutActive && <Edit/>}
                {!payoutActive && <Help/>}
            </div>
            <PayoutPreview/>
        </div>
    )
}