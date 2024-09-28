# ledgersaur

![ledgersaur-add-screen](https://github.com/user-attachments/assets/7a766b9c-1b85-4e45-a338-67de2b7354f7
| width=150)
![github-repo-ledger](https://github.com/user-attachments/assets/c583d684-a979-4cac-a60a-28f7a7146539
| width=150)

[!WIP] ~~This will error out if you don't have a main.ledger file in the root
directory.~~

It can get a ledger from a github repo now **but** you have to have a `.env` in
the root of the project with your `GITHUB_TOKEN` set.

`GITHUB_TOKEN` is a token that has scoped perms enough to read the repository
contents.

Only read works now but I will hopefully have a writing solution working for
mobile ledger entry soonish.

```
GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

- Uses deno 2.0.0-rc.6
- Mostly to learn fresh but also I need a ledger viewer/mobile update interface
  for my ledger-cli data anyways

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
