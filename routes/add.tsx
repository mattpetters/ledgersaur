import { PageProps } from "$fresh/server.ts";
import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";


export default function Page({}: PageProps<Data>) {
  const description = useSignal("");
  return (
    <div>
      <form>
        <input type="text" name="description" value={description} placeholder={"Description"} />
        {/* TODO: text with autocomplete for accounts */}
        {/* TODO: text for amount */}
        {/* TODO: automatic commodity */}
        {/* TODO: automatic declare new account if needed (ask) */}
        {/* TODO: stage change with diff*/}
        {/* TODO: commit from mobile*/}
        <button type="submit">Add Txn</button>
      </form>
    </div>
  );
}