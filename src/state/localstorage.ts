import {RootState, SavedState} from './types'
import {TOTAL_SHARES_PER_COMPANY} from './preloadedState'


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
            transactions: parse.transactions,
            companyPayoutHistory: parse.companyPayoutHistory || {}
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
            transactions: state.transactions,
            companyPayoutHistory: state.companyPayoutHistory
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
        const companyIds: number[] = []

        state.accounts.forEach(account => {
            if (account.id === undefined) {
                if (account.name === 'Bank') {
                    account.id = 0
                } else {
                    account.id = counter++
                }
            }
            if (account.type === 'company') {
                companyIds.push(account.id)
            }
        })

        // Migrate accounts without shares property
        state.accounts.forEach(account => {
            if (account.shares === undefined) {
                if (account.type === 'bank') {
                    // Bank gets all shares for all companies
                    account.shares = {}
                    companyIds.forEach(companyId => {
                        account.shares[companyId] = TOTAL_SHARES_PER_COMPANY
                    })
                } else {
                    // Players and companies start with no shares
                    account.shares = {}
                }
            }
        })

        // Clean up orphaned share references (shares for companies that no longer exist)
        state.accounts.forEach(account => {
            if (account.shares) {
                Object.keys(account.shares).forEach(shareCompanyId => {
                    const companyIdNum = parseInt(shareCompanyId)
                    if (!companyIds.includes(companyIdNum)) {
                        // This company no longer exists, remove the orphaned share reference
                        delete account.shares[companyIdNum]
                    }
                })
            }
        })
    }
    return state
}

