import { MergeMethod } from "./types.js";
import { Octokit } from "@octokit/core";
import VError from "verror";

// TODO: move into lib?
export type Outputs = Record<string, string>;

export interface Handler<O extends Outputs = Outputs> {
  handle(): Promise<O>;
}

export interface Config {
  gitHubToken: string;
  pullRequestNodeId: string;
  mergeMethod: MergeMethod;
}

export type EnableAutoMergeOutputs = Outputs;

export class EnableAutoMergeHandler implements Handler<EnableAutoMergeOutputs> {
  private static ERROR_NAME = "EnableAutoMergeHandlerError";

  private readonly octokit: Octokit;
  private readonly config: Config;

  constructor(params: { octokit: Octokit; config: Config }) {
    const { octokit, config } = params;
    this.octokit = octokit;
    this.config = config;
  }

  async handle(): Promise<EnableAutoMergeOutputs> {
    await this.enableAutoMerge();
    return {};
  }

  private async enableAutoMerge() {
    // Enabling auto merge is achieved by calling the graphql API.
    try {
      await this.octokit.graphql(
        `mutation enableAutoMerge($pullRequestId: ID!, $mergeMethod: PullRequestMergeMethod) {
      enablePullRequestAutoMerge(input: {
        pullRequestId: $pullRequestId,
        mergeMethod: $mergeMethod,
      }) {
        pullRequest {
          id,
          autoMergeRequest {
            enabledAt
          }
        }
      }
    }`,
        {
          pullRequestId: this.config.pullRequestNodeId,
          mergeMethod: this.config.mergeMethod,
        }
      );
    } catch (err) {
      throw new VError(
        {
          name: EnableAutoMergeHandler.ERROR_NAME,
          cause: err as Error,
        },
        `error enabling auto merge on PR ${this.config.pullRequestNodeId}`
      );
    }
  }
}

export function createHandler(params: { config: Config }): Handler {
  const { config } = params;
  const octokit = new Octokit({ auth: config.gitHubToken });
  return new EnableAutoMergeHandler({ octokit, config });
}
