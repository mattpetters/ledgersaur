import { type PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ledgersaur</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="min-h-screen bg-gray-100">
      <Header />
      <main class="p-6">
        <Component />
      </main>
    </div>
      </body>
    </html>
  );
}
