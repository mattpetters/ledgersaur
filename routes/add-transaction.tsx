import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async POST(req, _ctx) {
        const formData = await req.formData();
        const date = formData.get("date");
        const description = formData.get("description");
        const account = formData.get("account");
        const amount = formData.get("amount");

        const transaction = `
            ${date} ${description}
            ${account}  $${amount}
             Assets:Bank
        `;

        console.log(transaction);
        // Append the transaction to the ledger data
        // If using GitHub, update the file using the GitHub API
        // If using local file, write to the file system

        // Redirect back to the balance page
        return new Response(null, {
            status: 302,
            headers: { Location: "/balance" },
        });
    },
};
