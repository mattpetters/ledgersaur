import type { Handlers, PageProps } from "$fresh/server.ts";
interface LedgerData {
  resultString: string;
}
export const handler: Handlers = {
  GET(_req, ctx){

    // three letter abbreviation of 2 months from current month, all lowercase
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 2);
    const mabbr = currentDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();

    const command = new Deno.Command("ledger", {args:[ 
      "-f", "./main.ledger",
      "--forecast", `"d<[${mabbr}]"`,
      "-d", `d<[${mabbr}]`,  // Display predicate
      "register",
      "^expenses"
    ]});

    const { code, stdout, stderr,  } = command.outputSync();

    if (code !== 0) {
        const message = new TextDecoder().decode(stderr);
        throw new Error(message);
    }
    const result = new TextDecoder().decode(stdout);
    console.log(result)

    return ctx.render({
        resultString: result
    });
  }
}
export default function ForecastPage({data}:PageProps<LedgerData>) {
  const { resultString } = data;
  return (
    <main>
        <h1>Next Month Forecast</h1>
        <pre>
          {resultString}
        </pre>
    </main>
  );
}
