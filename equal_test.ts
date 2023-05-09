// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { equalsRequest } from "./equal.ts";
import {
  assert,
  assertFalse,
  assertRejects,
  describe,
  it,
} from "./_dev_deps.ts";

const url = "http://a";

describe("equalsRequest", () => {
  it("should return true if the requests are same properties", () => {
    const table: [Request, Request][] = [
      [new Request(url), new Request(url)],
      [
        new Request(url, { method: "POST" }),
        new Request(url, { method: "POST" }),
      ],
      [
        new Request(url, { headers: { a: "b" } }),
        new Request(url, { headers: { a: "b" } }),
      ],
      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url, { body: "", method: "POST" }),
      ],
      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url, { body: "a", method: "POST" }),
      ],
    ];

    table.forEach(([left, right]) => {
      assert(equalsRequest(left, right));
    });
  });

  it("should return false if the requests are not same properties", () => {
    const init = new Request(url, { body: "", method: "POST" });

    init.headers.delete("content-type");

    assertFalse(init.headers.has("content-type"));

    const table: [Request, Request][] = [
      [
        new Request(url, { redirect: "follow" }),
        new Request(url, { redirect: "error" }),
      ],

      [
        new Request(url, { method: "GET" }),
        new Request(url, { method: "POST" }),
      ],

      [
        new Request(url, { headers: { a: "b" } }),
        new Request(url, { headers: { c: "d" } }),
      ],

      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url),
      ],

      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url, { method: "POST" }),
      ],
      [
        new Request(url, { redirect: "error" }),
        new Request(url, { redirect: "follow" }),
      ],
      [new Request("http://a"), new Request("https://a")],
      [
        init,
        new Request(url, { method: "POST" }),
      ],
    ];

    table.forEach(([left, right]) => {
      assertFalse(equalsRequest(left, right));
    });
  });

  it("should return true if the requests equal strictly", async () => {
    const table: [Request, Request][] = [
      [new Request(url), new Request(url)],
      [
        new Request(url, { method: "POST" }),
        new Request(url, { method: "POST" }),
      ],
      [
        new Request(url, { headers: { a: "b" } }),
        new Request(url, { headers: { a: "b" } }),
      ],
      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url, { body: "", method: "POST" }),
      ],
    ];

    await Promise.all(table.map(async ([left, right]) => {
      assert(await equalsRequest(left, right, true));
    }));
  });

  it("should return false if the requests does not equal strictly", async () => {
    const table: [Request, Request][] = [
      [
        new Request(url, { body: "", method: "POST" }),
        new Request(url, { body: "a", method: "POST" }),
      ],
    ];

    await Promise.all(table.map(async ([left, right]) => {
      assertFalse(await equalsRequest(left, right, true));
    }));
  });

  it(
    "should throw error if the request has been read",
    async () => {
      const read = new Request(url, { body: "", method: "POST" });
      const read2 = new Request(url, { body: "", method: "POST" });

      await read.text();
      await read2.text();

      assert(read.bodyUsed);
      assert(read2.bodyUsed);

      assertRejects(async () =>
        await equalsRequest(
          read,
          read2,
          true,
        )
      );
    },
  );
});
