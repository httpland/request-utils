// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { isRequest } from "./is.ts";
import { assert, assertFalse, describe, it } from "./_dev_deps.ts";

const url = "test:";

describe("isRequest", () => {
  it("should return true", () => {
    const table: unknown[] = [
      new Request(url),
      new Request(url, { method: "POST" }),
    ];

    table.forEach((value) => {
      assert(isRequest(value));
    });
  });

  it("should return false", () => {
    const table: unknown[] = [
      {},
      null,
      undefined,
      0,
      NaN,
      new Response(),
      "",
      false,
      true,
      [],
    ];

    table.forEach((value) => {
      assertFalse(isRequest(value));
    });
  });
});
