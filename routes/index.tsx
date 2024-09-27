//import { useSignal } from "@preact/signals";
//import Counter from "../islands/Counter.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";

interface LedgerData {
  ledgerString: string;
  balanceString: string;
}

export const handler: Handlers = {
  async GET(_req, ctx){
    // read from main.ledger file
    // parse the accounts
    // return the accounts
    const ledgerString = await Deno.readTextFile("./main.ledger");

    const balanceCommand = new Deno.Command("ledger", {args:[ "balance", "--file", "./main.ledger"]});
    const { code, stdout, stderr } = await balanceCommand.output();

    if (code !== 0) {
        const message = new TextDecoder().decode(stderr);
        throw new Error(message);
    }

    const balanceString = new TextDecoder().decode(stdout);
    // find every line beginning with "account"
    // parse the account name
    const accounts = ledgerString.split("\n").filter((line) => line.startsWith("account")).map((line) => line.split(" ")[1]);

    return ctx.render({
        ledgerString: ledgerString,
        accounts: accounts,
        balanceString: balanceString
    });
  }
}

export default function Home({data}:PageProps<LedgerData>) {
  const { ledgerString } = data;
  //const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">ledgersaur</h1>
        <nav class="flex justify-center space-x-4">
          <a href="/" class="text-blue-500">Ledger</a>
          <a href="/balance" class="text-blue-500">Balance</a>
          <a href="/forecast" class="text-blue-500">Forecast</a>
        </nav>
        {/* <p class="my-4 bg-[#fff]">
          {accounts.map((account:string, i) => 
            <span key={i} class="block">
              {account}
            </span>
          )}
        </p> */}
        <pre>
          {ledgerString}
        </pre>
      </div>
    </div>
  );
}
