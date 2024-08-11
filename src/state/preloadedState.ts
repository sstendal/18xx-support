import {RootState, SavedState} from './types'

const preloadedState: RootState = {

    accounts: [
        {
            id: 0,
            name: 'Bank',
            balance: 12000,
            type: 'bank'
        },
        {
            id: 1,
            name: 'Player 1',
            balance: 0,
            type: 'player'
        },
        {
            id: 2,
            name: 'Player 2',
            balance: 0,
            type: 'player'
        },
        {
            id: 3,
            name: 'Player 3',
            balance: 0,
            type: 'player'
        },
        {
            id: 4,
            name: 'Player 4',
            balance: 0,
            type: 'player'
        },
        {
            id: 5,
            name: 'C&O',
            balance: 0,
            type: 'company'
        },
        {
            id: 6,
            name: 'Erie',
            balance: 0,
            type: 'company'
        },
        {
            id: 7,
            name: 'Pen',
            balance: 0,
            type: 'company'
        },
        {
            id: 8,
            name: 'B&O',
            balance: 0,
            type: 'company'
        },
        {
            id: 9,
            name: 'NYNH',
            balance: 0,
            type: 'company'
        },
        {
            id: 10,
            name: 'NYC',
            balance: 0,
            type: 'company'
        },
        {
            id: 11,
            name: 'B&M',
            balance: 0,
            type: 'company'
        },
        {
            id: 12,
            name: 'Can',
            balance: 0,
            type: 'company'
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

    config: false

}

const extendSavedState = (savedState: SavedState = {} as SavedState): RootState => {
    return {
        ...preloadedState,
        ...savedState
    }
}

export default extendSavedState
