import {createReducer} from '@reduxjs/toolkit'
import {
    accountAdjust,
    accountSet,
    addAccount,
    addTransaction,
    resetLog,
    adjustBaseValue,
    decMultiplier,
    deleteAccount,
    incMultiplier,
    setAccountName,
    setBaseValue,
    setBaseValueFraction,
    setDragOver,
    setMultiplier,
    startConfig,
    startDrag,
    stopConfig,
    stopDrag,
    startPayout,
    stopPayout,
    selectPayoutCompany,
    startPayoutPreview,
    stopPayoutPreview,
    transferShare
} from './actions'
import {Account, DragData, PayoutData, Transaction} from './types'


const accounts = createReducer([] as Account[], {
    [accountAdjust as any]: (state: Account[], action) => {
        let account = state.find(account => account.id === action.payload.id)
        account.balance = account.balance + action.payload.value
    },
    [accountSet as any]: (state: Account[], action) => {
        let account = state.find(account => account.id === action.payload.id)
        account.balance = action.payload.value
    },
    [setAccountName as any]: (state: Account[], action) => {
        let account = state.find(account => account.id === action.payload.id)
        account.name = action.payload.name
    },
    [deleteAccount as any]: (state: Account[], action) => {
        let index = state.findIndex(account => account.id === action.payload.id)
        state.splice(index, 1)
    },
    [addAccount as any]: (state: Account[], action) => {
        const nextId = state[state.length - 1].id + 1
        state.push({id: nextId, name: '<name>', balance: 0, type: action.payload.type, shares: {}})
    },
    [transferShare as any]: (state: Account[], action) => {
        const fromAccount = state.find(account => account.id === action.payload.from)
        const toAccount = state.find(account => account.id === action.payload.to)
        const companyId = action.payload.companyId
        const count = action.payload.count

        // Decrement from source account
        fromAccount.shares[companyId] = (fromAccount.shares[companyId] || 0) - count
        if (fromAccount.shares[companyId] <= 0) {
            delete fromAccount.shares[companyId]
        }

        // Increment to target account
        toAccount.shares[companyId] = (toAccount.shares[companyId] || 0) + count
    }
})

const drag = createReducer({} as DragData, {
    [startDrag as any]: (state: DragData, action) => action.payload,
    [stopDrag as any]: (state: DragData, action) => ({}),
    [setDragOver as any]: (state: DragData, action) => {
        if (state.dragOver !== action.payload) {
            state.dragOver = action.payload
        }
    }
})

const transactions = createReducer([] as Transaction[], {
    [addTransaction as any]: (state: Transaction[], action) => [...state, action.payload],
    [resetLog as any]: (state: Transaction[], action) => []
})

const multiplier = createReducer(1, {
    [setMultiplier as any]: (state: number, action) => action.payload,
    [incMultiplier as any]: (state: number, action) => state < 10 ? state + 1 : state,
    [decMultiplier as any]: (state: number, action) => state > 1 ? state - 1 : state
})

const baseValue = createReducer(1, {
    [setBaseValue as any]: (state: number, action) => action.payload,
    [adjustBaseValue as any]: (state: number, action) => {
        let newBaseValue = state + action.payload
        if (newBaseValue < 1) {
            newBaseValue = 1
        }
        if (newBaseValue > 9999) {
            newBaseValue = 9999
        }
        return newBaseValue
    }
})

const baseValueFraction = createReducer(1, {
    [setBaseValueFraction as any]: (state: number, action) => action.payload
})

const config = createReducer(false, {
    [startConfig as any]: (state: boolean, action) => true,
    [stopConfig as any]: (state: boolean, action) => false
})

const payout = createReducer({active: false, selectedCompany: null, preview: false} as PayoutData, {
    [startPayout as any]: (state: PayoutData) => ({...state, active: true}),
    [stopPayout as any]: (state: PayoutData) => ({active: false, selectedCompany: null, preview: false}),
    [selectPayoutCompany as any]: (state: PayoutData, action) => ({...state, selectedCompany: action.payload}),
    [startPayoutPreview as any]: (state: PayoutData) => ({...state, preview: true}),
    [stopPayoutPreview as any]: (state: PayoutData) => ({...state, preview: false})
})

const reducer = {
    accounts,
    drag,
    transactions,
    multiplier,
    baseValue,
    baseValueFraction,
    config,
    payout
}

export default reducer