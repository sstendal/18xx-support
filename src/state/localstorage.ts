import {RootState, SavedState} from './types'


export function loadState(): SavedState | undefined {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState == null) {
            return undefined
        }
        console.log('Loading saved state from localstorage')
        const parse = JSON.parse(serializedState) as SavedState
        const savedState: SavedState = {
            accounts: parse.accounts,
            transactions: parse.transactions
        }
        return migrated(savedState)
    } catch (e) {
        console.log('Failed to load saved state', e)
        return undefined
    }
}

export function saveState(state: RootState) {
    try {
        const savedState: SavedState = {
            accounts: state.accounts,
            transactions: state.transactions
        }
        const serializedState = JSON.stringify(savedState)
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log('Failed to save state', e)
    }
}

function migrated(state: SavedState): SavedState {
    if (state.accounts) {
        let counter = 1;
        state.accounts.forEach(account => {
            if (account.id === undefined) {
                if (account.name === 'Bank') {
                    account.id = 0
                } else {
                    account.id = counter++
                }
            }
        })
    }
    return state
}

