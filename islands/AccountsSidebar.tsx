// [islands/AccountsSidebar.tsx]
import { useState } from "preact/hooks";
import type { JSX } from "preact";
import AccountsList from "../components/AccountsList.tsx";

interface Props {
  accounts: string[];
}

export default function AccountsSidebar({ accounts }: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div class="md:w-1/3">
      {/* Toggle Button Visible on All Screen Sizes */}
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Accounts</h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          class="px-3 py-1 bg-green-600 text-white rounded"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      {/* Accounts List */}
      <div class={`${isVisible ? "block" : "hidden"}`}>
        <AccountsList accounts={accounts} />
      </div>
    </div>
  );
}