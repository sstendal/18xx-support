export interface CompanyPayoutValues {
    multiplier: number,
    baseValue: number
}

export interface SavedState {
    accounts: Account[],
    transactions: Transaction[],
    companyPayoutHistory: Record<number, CompanyPayoutValues>
}

export interface RootState extends SavedState {
    drag: DragData,
    multiplier: number,
    baseValue: number,
    baseValueFraction: number,
    config: boolean,
    payout: PayoutData
}

export interface PayoutData {
    active: boolean,
    selectedCompany: number | null,
    preview: boolean
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
    type: AccountType,
    shares: Record<number, number>
}

export interface DragData {
    from: number,
    dragOver: number
}

export type AccountType = 'bank' | 'player' | 'company'
