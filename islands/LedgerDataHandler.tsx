// islands/LedgerDataHandler.tsx
import { useEffect, useState } from "preact/hooks";
import type { LedgerData, Transaction } from "../types.ts";
import AccountsSidebar from "../islands/AccountsSidebar.tsx";
import TransactionCard from "../components/TransactionCard.tsx";

interface Props {
  initialData?: LedgerData;
}

export default function LedgerDataHandler({ initialData }: Props) {
  // Use default empty arrays if initialData or its properties are undefined
  const initialAccounts = initialData?.accounts || [];
  const initialTransactions = initialData?.transactions || [];

  const [accounts, setAccounts] = useState<string[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions,
  );

  // On mount, check for cached data
  useEffect(() => {
    const cachedData = localStorage.getItem("ledgerData");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setAccounts(parsedData.accounts || []);
      setTransactions(parsedData.transactions || []);
    }
  }, []);

  // Update cache whenever accounts or transactions change
  useEffect(() => {
    const dataToCache = { accounts, transactions };
    localStorage.setItem("ledgerData", JSON.stringify(dataToCache));
  }, [accounts, transactions]);

  // Clear cache and reload page
  const clearCache = () => {
    localStorage.removeItem("ledgerData");
    globalThis.location.reload();
  };

  return (
    <div class="flex flex-col items-center px-6 py-12 bg-white rounded shadow space-y-6 w-full">
      <h1 class="text-3xl font-bold mb-4">Ledger Data</h1>
      <p class="text-sm text-gray-600">
        Your ledger data is stored locally in your browser and is not sent
        anywhere.
      </p>
      <button
        onClick={clearCache}
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
      >
        Clear Local Cache
      </button>
      <section class="w-full max-w-4xl">
        <div class="flex flex-col md:flex-row md:space-x-8">
          {/* Accounts Sidebar */}
          <AccountsSidebar accounts={accounts} />
          {/* Transactions Section */}
          <div class="md:flex-1">
            <h2 class="text-2xl font-semibold mb-2">Transactions</h2>
            {transactions.length === 0
              ? <p class="text-gray-500">No transactions available.</p>
              : (
                <div class="space-y-4 max-h-full overflow-y-auto w-full">
                  {transactions.map((transaction, index) => (
                    <TransactionCard key={index} transaction={transaction} />
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
