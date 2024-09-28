// islands/AddTransactionForm.tsx
import { useEffect, useState } from "preact/hooks";
import type { Entry as TransactionEntry } from "../types.ts";
import type { JSX } from "preact";

export default function AddTransactionForm(): JSX.Element {
  const [localAccounts, setLocalAccounts] = useState<string[]>([]);
  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setLocalAccounts(JSON.parse(storedAccounts));
    }
  }, []);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<TransactionEntry[]>([]);

  const addEntry = () => {
    setEntries([...entries, { account: "", amount: 0 }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    if (field === "account") {
      newEntries[index].account = value;
    } else if (field === "amount") {
      newEntries[index].amount = parseFloat(value) || 0;
    }
    setEntries(newEntries);
  };

  const totalAmount = entries.reduce(
    (sum, entry) => sum + (entry.amount ?? 0),
    0,
  );

  const isBalanced = Math.abs(totalAmount) < 0.01;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!isBalanced) {
      alert(
        "Transaction is not balanced. The total amount must be zero.",
      );
      return;
    }
    // Handle form submission logic here
    const formData = {
      date,
      description,
      entries,
    };
    console.log(formData);
  };

  const fuzzySearchAccounts = (input: string) => {
    const lowerInput = input.toLowerCase();
    return localAccounts.filter((account) =>
      account.toLowerCase().includes(lowerInput)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="flex flex-col w-full max-w-md space-y-4"
    >
      <label class="flex flex-col">
        Date:
        <input
          type="date"
          name="date"
          required
          value={date}
          onInput={(e) => setDate((e.target as HTMLInputElement).value)}
          class="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      <label class="flex flex-col">
        Description:
        <input
          type="text"
          name="description"
          required
          value={description}
          onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
          class="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      <div class="flex flex-col space-y-4">
        <h3 class="text-xl font-semibold">Entries</h3>
        {entries.map((entry, index) => (
          <div
            key={index}
            class="flex flex-col space-y-2 border p-2 rounded"
          >
            <label class="flex flex-col">
              Account:
              <input
                type="text"
                name={`account-${index}`}
                required
                value={entry.account}
                onInput={(e) =>
                  updateEntry(
                    index,
                    "account",
                    (e.target as HTMLInputElement).value,
                  )}
                list={`accounts-list-${index}`}
                class="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <datalist id={`accounts-list-${index}`}>
                {fuzzySearchAccounts(entry.account).map((
                  account,
                ) => <option value={account} />)}
              </datalist>
            </label>
            <label class="flex flex-col">
              Amount:
              <input
                type="number"
                name={`amount-${index}`}
                step="0.01"
                required
                value={(entry.amount ?? 0).toString()}
                onInput={(e) =>
                  updateEntry(
                    index,
                    "amount",
                    (e.target as HTMLInputElement).value,
                  )}
                class="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>
            <button
              type="button"
              onClick={() => removeEntry(index)}
              class="self-end px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove Entry
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEntry}
          class="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Add Entry
        </button>
      </div>
      <div class="text-right">
        <p
          class={`font-semibold ${
            isBalanced ? "text-green-600" : "text-red-600"
          }`}
        >
          Total Amount: {totalAmount.toFixed(2)}
        </p>
        {!isBalanced && (
          <p class="text-red-600">
            Transaction must balance to zero.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isBalanced}
        class={`px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300 ${
          !isBalanced ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Add Transaction
      </button>
    </form>
  );
}
