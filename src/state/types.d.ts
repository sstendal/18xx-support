export interface SavedState {
    accounts: Account[],
    transactions: Transaction[]
}

export interface RootState extends SavedState {
    drag: DragData,
    multiplier: number,
    baseValue: number,
    baseValueFraction: number,
    config: boolean
}

export interface Transaction {
    from: number,
    to: number,
    value: number,
    time: string
}

export interface Account {
    id: number,
    name: string,
    balance: number,
    type: AccountType
}

export interface DragData {
    from: number,
    dragOver: number
}

export type AccountType = 'bank' | 'player' | 'company'
