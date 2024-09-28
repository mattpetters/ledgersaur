import type { Handlers, PageProps } from "$fresh/server.ts";
import LedgerChart from "../components/LedgerChart.tsx";

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

export default function BalancePage({ data }: PageProps<LedgerData>) {
  const chartData = parseLedgerDataToChartData(data.balanceString);
  return (
    <main>
      <h1>Balance</h1>
      <LedgerChart data={chartData} />
    </main>
  );
}

function parseLedgerDataToChartData(balanceString: string) {
  const lines = balanceString.split("\n");
  const labels = [];
  const values = [];

  for (const line of lines) {
    const parts = line.split(" ");
    if (parts.length === 2) {
      labels.push(parts[0]);
      values.push(parseFloat(parts[1]));
    }
  }

  return { labels, values };
}
