import {RootState} from './store'


export function loadState() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState == null) {
            return undefined
        }
        console.log('Loading saved state from localstorage')
        const parse = JSON.parse(serializedState) as RootState
        return migrated(parse)
    } catch (e) {
        console.log('Failed to load saved state', e)
        return undefined
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log('Failed to save state', e)
    }
}

function migrated(state) {
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

