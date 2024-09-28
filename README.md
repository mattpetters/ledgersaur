# ledgersaur  
[!WIP]
~~This will error out if you don't have a main.ledger file in the root directory.~~
It can get a ledger from a github repo now **but** you have to have a `.env` in the root of the project with your `GITHUB_TOKEN` set.
`GITHUB_TOKEN` is a token that has scoped perms enough to read the repository contents.

Only read works now but I will hopefully have a writing solution working for mobile ledger entry soonish.

```
GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

- Uses deno 2.0.0-rc.6
- Mostly to learn fresh but also I need a ledger viewer/mobile update interface for my ledger-cli data anyways


### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
