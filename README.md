# enable-auto-merge-action

This action calls the GitHub GraphQL API to enable auto merge on a pull request. [The repository must first
allow this feature.](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository)

## Usage

```yaml
name: Enable some auto merge yo

on:
  pull_request: ~

permissions:
  pull-requests: write

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  do-some-work:
    steps:
      - name: Turn on auto merge
        uses: infrastructure-blocks/enable-auto-merge-action@v0
        with:
          github-token: ${{ secrets.GITHUB_PAT }}
          pull-request: ${{ github.event.pull_request.node_id }}
```

## Development

This project is written in Typescript and leverages `nvm` to manage its version. It also uses Git hooks
to automatically build and commit compiled code. This last part emerges from the fact that GitHub actions
run Javascript (and not typescript) and that all the node_modules/ are expected to be provided in the Git
repository of the action.

Having a Git hook to compile automatically helps in diminishing the chances that a developer forgets to
provide the compiled sources in a change request.

### Setup

Once `nvm` is installed, simply run the following:

```
nvm install
npm install
``` 

### Releasing

The releasing is handled at git level with semantic versioning tags. Those are automatically generated and managed
by the [git-tag-semver-from-label-workflow](https://github.com/infrastructure-blocks/git-tag-semver-from-label-workflow).
