import {createAction} from '@reduxjs/toolkit'
import {AccountType, Transaction} from './types'


export const startDrag = createAction<{from: number}>('drag/start')
export const stopDrag = createAction('drag/stop')
export const setDragOver = createAction<number>('drag/setDragOver')

export const accountAdjust = createAction<{id: number, value: number}>('accounts/adjust')
export const accountSet = createAction<{id: number, value: number}>('accounts/set')
export const setAccountName = createAction<{id: number, name: string}>('accounts/setName')
export const deleteAccount = createAction<{id: number}>('accounts/delete')
export const addAccount = createAction<{type: AccountType}>('accounts/add')

export const addTransaction = createAction<Transaction>('transactions/add')
export const resetLog = createAction('transactions/reset')

export const setMultiplier = createAction<number>('multiplier/set')
export const incMultiplier = createAction('multiplier/inc')
export const decMultiplier = createAction('multiplier/dec')

export const setBaseValue = createAction<number>('baseValue/set')
export const adjustBaseValue = createAction<number>('baseValue/adjust')
export const setBaseValueFraction = createAction('baseValueFraction/set')

export const startConfig = createAction('config/start')
export const stopConfig = createAction('config/stop')

