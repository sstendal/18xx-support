import {RootState, SavedState} from './types'

export const TOTAL_SHARES_PER_COMPANY = 10

const preloadedState: RootState = {

    accounts: [
        {
            id: 0,
            name: 'Bank',
            balance: 12000,
            type: 'bank',
            shares: {
                5: TOTAL_SHARES_PER_COMPANY,
                6: TOTAL_SHARES_PER_COMPANY,
                7: TOTAL_SHARES_PER_COMPANY,
                8: TOTAL_SHARES_PER_COMPANY,
                9: TOTAL_SHARES_PER_COMPANY,
                10: TOTAL_SHARES_PER_COMPANY,
                11: TOTAL_SHARES_PER_COMPANY,
                12: TOTAL_SHARES_PER_COMPANY
            }
        },
        {
            id: 1,
            name: 'Player 1',
            balance: 0,
            type: 'player',
            shares: {}
        },
        {
            id: 2,
            name: 'Player 2',
            balance: 0,
            type: 'player',
            shares: {}
        },
        {
            id: 3,
            name: 'Player 3',
            balance: 0,
            type: 'player',
            shares: {}
        },
        {
            id: 4,
            name: 'Player 4',
            balance: 0,
            type: 'player',
            shares: {}
        },
        {
            id: 5,
            name: 'C&O',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 6,
            name: 'Erie',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 7,
            name: 'Pen',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 8,
            name: 'B&O',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 9,
            name: 'NYNH',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 10,
            name: 'NYC',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 11,
            name: 'B&M',
            balance: 0,
            type: 'company',
            shares: {}
        },
        {
            id: 12,
            name: 'Can',
            balance: 0,
            type: 'company',
            shares: {}
        },

    ],

    drag: {
        from: undefined,
        dragOver: undefined
    },

    transactions: [],

    multiplier: 5,

    baseValue: 1,

    baseValueFraction: 1,

    config: false,

    payout: {
        active: false,
        selectedCompany: null,
        preview: false
    }

}

const extendSavedState = (savedState: SavedState = {} as SavedState): RootState => {
    return {
        ...preloadedState,
        ...savedState
    }
}

export default extendSavedState
