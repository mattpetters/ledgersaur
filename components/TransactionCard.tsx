// [components/TransactionCard.tsx]
import type { Transaction } from "../types.ts";

interface Props {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: Props) {
  return (
    <div class="border p-4 rounded shadow w-full">
      <div class="flex flex-col sm:flex-row justify-between mb-2">
        <span class="font-semibold">{transaction.date}</span>
        <span class="text-gray-600">{transaction.description}</span>
      </div>
      <div class="ml-0 sm:ml-4">
        {transaction.entries.map((entry, index) => (
          <div key={index} class="flex flex-col sm:flex-row justify-between">
            <span>{entry.account}</span>
            {entry.amount ? <span>${entry.amount.toFixed(2)}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}