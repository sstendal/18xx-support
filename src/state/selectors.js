import {createSelector} from '@reduxjs/toolkit'


export const accountsSelector = state => state.accounts


export const players = createSelector(
    accountsSelector,
    accounts => accounts.filter(account => account.type === 'player')
)

export const companies = createSelector(
    accountsSelector,
    accounts => accounts.filter(account => account.type === 'company')
)

export const bank = createSelector(
    accountsSelector,
    accounts => accounts.filter(account => account.type === 'bank')[0]
)