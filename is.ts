// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Whether the input is `Request` or not.
 *
 * ```ts
 * import { isRequest } from "https://deno.land/x/request_utils@$VERSION/is.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(isRequest(new Request("http://localhost")), true);
 * assertEquals(isRequest({}), false);
 * assertEquals(isRequest(null), false);
 * ```
 */
export function isRequest(input: unknown): input is Request {
  return input instanceof Request;
}
