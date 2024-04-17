# enable-auto-merge-action
[![Release](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/git-tag-semver-from-label.yml/badge.svg)](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/git-tag-semver-from-label.yml)
[![Self Test](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/self-test.yml/badge.svg)](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/self-test.yml)
[![Update From Template](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/enable-auto-merge-action/actions/workflows/update-from-template.yml)

This action calls the GitHub GraphQL API to enable auto merge on a pull request. [The repository must first
allow this feature.](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository)

## Inputs

|     Name     | Required | Description                                                                                             |
|:------------:|:--------:|---------------------------------------------------------------------------------------------------------|
|  github-pat  |   true   | The GitHub token used to authenticate. At the time of this writing, enabling auto merge requires a PAT. |
|   node-id    |  false   | The pull request Node ID. Defaults to ${{ github.event.pull_request.node_id }}.                         |
| merge-method |  false   | One of "MERGE", "SQUASH", "REBASE". Defaults to "MERGE"                                                 |                         

## Outputs

N/A

## Permissions

Tied to the PAT.

## Usage

```yaml
- name: Turn on auto merge
  uses: infrastructure-blocks/enable-auto-merge-action@v2
  with:
    github-pat: ${{ secrets.GITHUB_PAT }}
```
