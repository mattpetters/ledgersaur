import { Handlers, type PageProps } from "$fresh/server.ts";
import LedgerDataHandler from "../islands/LedgerDataHandler.tsx";

interface Transaction {
  date: string;
  description: string;
  entries: Entry[];
}

interface Entry {
  account: string;
  amount: number;
}

interface LedgerData {
  accounts: string[];
  transactions: {
    date: string;
    description: string;
    entries: {
      account: string;
      amount: number;
    }[];
  }[];
}

export const handler: Handlers = {
  GET(_req, _ctx) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  },

  async POST(req, ctx) {
    const formData = await req.formData();
    const repoUrl = formData.get("repoUrl")?.toString();
    const repoOwner = repoUrl?.split("/")[3];
    const repoName = repoUrl?.split("/")[4];
    const ledgerFile = formData.get("ledgerFile") as File | null;
    const TOKEN = Deno.env.get("GITHUB_TOKEN");
    let ledgerData = "";

    if (repoUrl) {
      // Fetch ledger data from GitHub repository using the access token
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/main.ledger`,
        {
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        },
      );
      const json = await response.json();
      // The content is base64 encoded
      ledgerData = atob(json.content);
    } else if (ledgerFile) {
      // Read the uploaded file
      ledgerData = await ledgerFile.text();
    }

    // Validate ledger data using ledger-cli
    const ledgerCommand = new Deno.Command("ledger", {
      args: ["-f", "-", "balance"],
      stdin: "piped",
      stdout: "piped",
      stderr: "piped",
    });
    const child = ledgerCommand.spawn();
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(ledgerData));
    await writer.close();
    const { code, stderr } = await child.output();

    if (code !== 0) {
      const message = new TextDecoder().decode(stderr);
      return new Response(`Error validating ledger data: ${message}`, {
        status: 400,
      });
    }

    // Parse the ledger data
    const accounts = ledgerData.split("\n").filter((line) =>
      line.startsWith("account")
    ).map((line) => line.split(" ")[1]);
    // Transaction format: 20YY-MM-DD Description\n  Account  Amount\n  Account  Amount\n
    // first line is the date and description, followed by a line of account and amount pairs for n accounts involved in the transaction
    // Parse the ledger data
    // Parse the ledger data
    const lines = ledgerData.split("\n");
    const transactions = [];
    let i = 0;

    while (i < lines.length) {
      let line = lines[i].trim();

      // Skip empty lines and comments
      if (line === "" || line.startsWith(";")) {
        i++;
        continue;
      }

      // Check if the line starts with a date (e.g., "YYYY-MM-DD")
      if (/^\d{4}-\d{2}-\d{2}/.test(line)) {
        const [date, ...descParts] = line.split(/\s+/);
        const description = descParts.join(" ");
        i++;

        const entries = [];
        // Collect account and amount pairs indented by at least two spaces
        while (i < lines.length && /^\s{2}/.test(lines[i])) {
          line = lines[i].trim();
          if (line === "" || line.startsWith(";")) {
            i++;
            continue;
          }
          const [account, amountStr] = line.split(/\s{2,}/);
          let amount: number | null = null;
          if (amountStr !== undefined) {
            const parsed = parseFloat(
              amountStr.replace(/[^0-9.-]+/g, ""),
            );
            amount = isNaN(parsed) ? null : parsed;
          }
          entries.push({ account, amount });
          i++;
        }

        transactions.push({ date, description, entries });
      } else {
        i++;
      }
    }
    // Render the page with the ledger data
    return ctx.render({
      ledgerData: ledgerData,
      accounts: accounts,
      transactions: transactions,
    });
  },
};

export default function LoadLedgerPage({ data }: PageProps<LedgerData>) {
  return <LedgerDataHandler initialData={data} />;
}
