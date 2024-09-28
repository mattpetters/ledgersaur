// [islands/Header.tsx]
import { useState } from "preact/hooks";
import { JSX } from "preact";

export default function Header(): JSX.Element {
  const [isSubheaderVisible, setIsSubheaderVisible] = useState(false);

  return (
    <>
      <header class="px-6 py-4 bg-[#86efac] flex items-center justify-between">
        <a href="/">
          <div class="flex items-center">
            <svg
              class="w-8 h-8 mr-2 animate-dinosaur"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#299551"
                d="M13 2v1h-1v6h-1v1H9v1H8v1H7v1H5v-1H4v-1H3V9H2v6h1v1h1v1h1v1h1v4h2v-1H7v-1h1v-1h1v-1h1v1h1v3h2v-1h-1v-4h1v-1h1v-1h1v-3h1v1h1v-2h-2V9h5V8h-3V7h5V3h-1V2m-7 1h1v1h-1Z"
              />
            </svg>
            <h1 class="text-2xl font-bold">ledgersaur</h1>
          </div>
        </a>
        <button
          onClick={() => setIsSubheaderVisible(!isSubheaderVisible)}
          class="px-4 py-2 text-white rounded hover:bg-green-700 transition duration-300"
        >
          {isSubheaderVisible
            ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path fill="white" d="m7 10l5 5l5-5z" />
              </svg>
            )
            : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path fill="white" d="m14 7l-5 5l5 5z" />
              </svg>
            )}
        </button>
      </header>
      {isSubheaderVisible && (
        <div class="bg-[#d1fae5] px-6 py-2 flex justify-around items-center">
          <a href="/add" class="flex flex-col items-center">
            <svg
              class="w-6 h-6 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="text-sm">Add Transaction</span>
          </a>
          <a href="/balance" class="flex flex-col items-center">
            <svg
              class="w-6 h-6 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-sm">Show Balances</span>
          </a>
          <a href="/graphs" class="flex flex-col items-center">
            <svg
              class="w-6 h-6 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3v18h18"
              />
            </svg>
            <span class="text-sm">Graphs</span>
          </a>
        </div>
      )}
    </>
  );
}
