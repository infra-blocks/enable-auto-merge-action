import { createHandler } from "../../src/handler.js";
import { expect } from "@infra-blocks/test";

describe("handler", function () {
  describe(createHandler.name, function () {
    it("should create handler", function () {
      const handler = createHandler({
        config: {
          pullRequestNodeId: "123456789",
          gitHubToken: "BIG_TOKEN",
          mergeMethod: "MERGE",
        },
      });
      expect(handler).to.not.be.null;
    });
  });
});
