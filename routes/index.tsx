import type { Handlers } from "$fresh/server.ts";

interface LedgerData {
  ledgerString: string;
  balanceString: string;
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    // read from main.ledger file
    // parse the accounts
    // return the accounts
    const ledgerString = await Deno.readTextFile("./main.ledger");

    const balanceCommand = new Deno.Command("ledger", {
      args: ["balance", "--file", "./main.ledger"],
    });
    const { code, stdout, stderr } = await balanceCommand.output();

    if (code !== 0) {
      const message = new TextDecoder().decode(stderr);
      throw new Error(message);
    }

    const balanceString = new TextDecoder().decode(stdout);
    // find every line beginning with "account"
    // parse the account name
    const accounts = ledgerString.split("\n").filter((line) =>
      line.startsWith("account")
    ).map((line) => line.split(" ")[1]);

    return ctx.render({
      ledgerString: ledgerString,
      accounts: accounts,
      balanceString: balanceString,
    });
  },
};

export default function Home() {
  return (
    <div class="px-6 py-12 mx-auto bg-[#86efac] flex flex-col items-center">
      {
        /* <h1 class="text-4xl font-bold mb-8 p-4 bg-white rounded shadow flex items-center">
      <svg
      xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill={"#299551"} d="M13 2v1h-1v6h-1v1H9v1H8v1H7v1H5v-1H4v-1H3V9H2v6h1v1h1v1h1v1h1v4h2v-1H7v-1h1v-1h1v-1h1v1h1v3h2v-1h-1v-4h1v-1h1v-1h1v-3h1v1h1v-2h-2V9h5V8h-3V7h5V3h-1V2m-7 1h1v1h-1Z"/></svg>
      ledgersaur
      </h1> */
      }
      <form
        method="POST"
        action="/load-ledger"
        enctype="multipart/form-data"
        class="flex flex-col w-full max-w-md p-6 bg-white rounded shadow space-y-6"
      >
        <label class="flex flex-col">
          GitHub Repository URL:
          <input
            type="text"
            name="repoUrl"
            class="mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://github.com/username/repo"
            required
          />
        </label>
        {
          /*
        <label class="flex flex-col">
          Or upload a local ledger file:
          <input
            type="file"
            name="ledgerFile"
            accept=".ledger"
            class="mt-2 p-2 border border-gray-300 rounded"
          />
        </label>
        */
        }
        <button
          type="submit"
          class="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
        >
          Load Ledger
        </button>
      </form>
    </div>
  );
}
