import * as core from "@actions/core";
import { context } from "@actions/github";
import { createHandler } from "./handler.js";
import VError from "verror";
import { getInputs, stringInput } from "@infra-blocks/github";
import { MergeMethod } from "./types.js";

async function main() {
  core.debug(`received env: ${JSON.stringify(process.env, null, 2)}`);
  core.debug(`received context: ${JSON.stringify(context, null, 2)}`);

  const inputs = getInputs({
    "github-token": stringInput(),
    "pull-request": stringInput(),
    "merge-method": stringInput<MergeMethod>({
      choices: ["MERGE", "SQUASH", "REBASE"],
    }),
  });
  const handler = createHandler({
    config: {
      gitHubToken: inputs["github-token"],
      pullRequestNodeId: inputs["pull-request"],
      mergeMethod: inputs["merge-method"],
    },
  });
  const outputs = await handler.handle();
  for (const [key, value] of Object.entries(outputs)) {
    core.debug(`setting output ${key}=${value}`);
    core.setOutput(key, value);
  }
}

main().catch((err: Error) => core.setFailed(VError.fullStack(err)));
