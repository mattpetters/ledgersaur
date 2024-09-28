// routes/add.tsx
import AddTransactionForm from "../islands/AddTransactionForm.tsx";

export default function AddTransactionPage() {
  return (
    <div class="flex flex-col items-center px-6 py-12 bg-white rounded shadow space-y-6">
      <h1 class="text-3xl font-bold mb-4">Add Transaction</h1>
      <AddTransactionForm />
    </div>
  );
}
