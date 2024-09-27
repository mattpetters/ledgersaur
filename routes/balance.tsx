import type { Handlers, PageProps } from "$fresh/server.ts";
interface LedgerData {
  ledgerString: string;
  balanceString: string;
}
export const handler: Handlers = {
  async GET(_req, ctx){

    const balanceCommand = new Deno.Command("ledger", {args:[ "balance", "--file", "./main.ledger"]});
    const { code, stdout, stderr } = await balanceCommand.output();

    if (code !== 0) {
        const message = new TextDecoder().decode(stderr);
        throw new Error(message);
    }

    const balanceString = new TextDecoder().decode(stdout);

    return ctx.render({
        balanceString: balanceString
    });
  }
}
export default function BalancePage({data}:PageProps<LedgerData>) {
  const { balanceString } = data;
  return (
    <main>
        <h1>Balance</h1>
        <pre>
          {balanceString}
        </pre>
    </main>
  );
}
