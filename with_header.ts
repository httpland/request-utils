// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Return an instance with the provided `Request` replacing the specified header.
 * There are no side effects on the original `Request`.
 *
 * @example
 * ```ts
 * import { withHeader } from "https://deno.land/x/request_utils@$VERSION/with_header.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const init: Request;
 * declare const fieldName: string;
 * declare const fieldValue: string;
 *
 * const request = withHeader(init, fieldName, fieldValue);
 *
 * assert(request.headers.get(fieldName), fieldValue);
 * assert(init !== request);
 * ```
 */
export function withHeader(
  request: Request,
  fieldName: string,
  fieldValue: string,
): Request {
  const headers = new Headers([...request.headers.entries(), [
    fieldName,
    fieldValue,
  ]]);

  return new Request(request, { headers });
}
