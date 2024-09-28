// [types.ts](types.ts)
export interface Entry {
  account: string;
  amount?: number;
}

export interface Transaction {
  date: string;
  description: string;
  entries: Entry[];
}

export interface LedgerData {
  ledgerData: string;
  accounts: string[];
  transactions: Transaction[];
}
