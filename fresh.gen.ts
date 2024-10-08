// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $add_transaction from "./routes/add-transaction.tsx";
import * as $add from "./routes/add.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $balance from "./routes/balance.tsx";
import * as $forecast from "./routes/forecast.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $load_ledger from "./routes/load-ledger.tsx";
import * as $AccountsSidebar from "./islands/AccountsSidebar.tsx";
import * as $AddTransactionForm from "./islands/AddTransactionForm.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $LedgerDataHandler from "./islands/LedgerDataHandler.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/add-transaction.tsx": $add_transaction,
    "./routes/add.tsx": $add,
    "./routes/api/joke.ts": $api_joke,
    "./routes/balance.tsx": $balance,
    "./routes/forecast.tsx": $forecast,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/load-ledger.tsx": $load_ledger,
  },
  islands: {
    "./islands/AccountsSidebar.tsx": $AccountsSidebar,
    "./islands/AddTransactionForm.tsx": $AddTransactionForm,
    "./islands/Counter.tsx": $Counter,
    "./islands/Header.tsx": $Header,
    "./islands/LedgerDataHandler.tsx": $LedgerDataHandler,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
