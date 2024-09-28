# ledgersaur
🚧 WIP 🚧

A Deno GUI for <a href="https://github.com/ledger/ledger">ledger-cli></a>

<img src="https://https://github.com/user-attachments/assets/7a766b9c-1b85-4e45-a338-67de2b7354f7" width="400" alt="ledgersaur-add-screen" />
<br/>
<img src="https://github.com/user-attachments/assets/c583d684-a979-4cac-a60a-28f7a7146539" width="400" alt="ledgersaur-add-screen" />

- A large appeal of PTA is that `git` can be the source of truth for your ledger.

- In that spirit, this project uses the remote repository as the source of truth.

- It can get a ledger from a github repo now **but** you have to have a `.env` in
the root of the project with your `GITHUB_TOKEN` set.


- `GITHUB_TOKEN` is a token that has scoped perms enough to read the repository
contents.

- Only read works rn but I will hopefully have a writing solution working for
mobile ledger entry soonish.

- Also, the file is expected to be named `main.ledger` in the root of the repo. Includes/imports are ignored

```
GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

- Uses deno 2.0.0-rc.6
- Mostly to learn fresh but also I need a viewer & mobile updating solution for my ledger-cli data anyways

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## Roadmap
- [ ] PWA and maybe app store build
- [ ] Edit text in the ledger with highlighting and validation
- [ ] Charts and graphs with `$fresh_charts`
- [ ] On-demand `ledger-cli` excution for ad hoc reporting?
- [ ] Forecasts, budgets, trend analysis, envelope budgeting
- [ ] Full static mode where all state lives in the client or the remote repo
- [ ] Rename entrypoint file
- [ ] Parse and process includes/imports (within reason...)


## Tests
https://fresh.deno.dev/docs/canary/examples/writing-tests
