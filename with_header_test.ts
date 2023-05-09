// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { withHeader } from "./with_header.ts";
import { assert, assertEquals, describe, it } from "./_dev_deps.ts";

describe("withHeader", () => {
  const FIELD_NAME = "x-x";
  const FIELD_VALUE = "test";
  const BODY = "ok";
  const INIT_HEADER = "x-init";
  const INIT_HEADER_VALUE = "init";

  it("should return new request instance with specified header", async () => {
    const METHOD = "POST";

    const initRequest = new Request("test:", {
      method: METHOD,
      body: BODY,
      headers: {
        [INIT_HEADER]: INIT_HEADER_VALUE,
      },
    });

    const request = withHeader(initRequest, FIELD_NAME, FIELD_VALUE);

    assert(request !== initRequest);
    assertEquals(request.headers.get(FIELD_NAME), FIELD_VALUE);
    assertEquals(request.headers.get(INIT_HEADER), INIT_HEADER_VALUE);
    assertEquals(await request.text(), BODY);
    assertEquals(request.method, METHOD);

    assert(!initRequest.headers.has(FIELD_NAME));
    assert(initRequest.headers.has(INIT_HEADER));
  });
});
