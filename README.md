# request-utils

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/request_utils)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/request-utils)](https://github.com/httpland/request-utils/releases)
[![codecov](https://codecov.io/github/httpland/request-utils/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/request-utils)
[![GitHub](https://img.shields.io/github/license/httpland/request-utils)](https://github.com/httpland/request-utils/blob/main/LICENSE)

[![test](https://github.com/httpland/request-utils/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/request-utils/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/request-utils.png?mini=true)](https://nodei.co/npm/@httpland/request-utils/)

Request utility collection.

## equalsRequest

Check two `Request` fields equality.

```ts
import { equalsRequest } from "https://deno.land/x/request_utils@$VERSION/equal.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;

assert(
  equalsRequest(
    new Request(url, { method: "HEAD" }),
    new Request(url, { method: "HEAD" }),
  ),
);
```

If you also want to check the equivalence of the body, set the mode to strict.

```ts
import { equalsRequest } from "https://deno.land/x/request_utils@$VERSION/equal.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;

assert(
  await equalsRequest(
    new Request(url, { body: "", method: "POST" }),
    new Request(url, { body: "", method: "POST" }),
    true,
  ),
);
```

### Throwing error

In strict mode, if request body has already been read.

```ts
import { equalsRequest } from "https://deno.land/x/request_utils@$VERSION/equal.ts";
import { assert, assertThrows } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;
const request = new Request(url, { body: "" });
await request.text();

assert(request.bodyUsed);
assertThrows(() => equalsRequest(request, request, true));
```

## isRequest

Whether the input is `Request` or not.

```ts
import { isRequest } from "https://deno.land/x/request_utils@$VERSION/is.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(isRequest(new Request("http://localhost")), true);
assertEquals(isRequest({}), false);
assertEquals(isRequest(null), false);
```

## withHeader

Return an instance with the provided `Request` replacing the specified header.

There are no side effects on the original `Request`.

```ts
import { withHeader } from "https://deno.land/x/request_utils@$VERSION/with_header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const init: Request;
declare const fieldName: string;
declare const fieldValue: string;

const request = withHeader(init, fieldName, fieldValue);

assert(request.headers.get(fieldName), fieldValue);
assert(init !== request);
```

## API

All APIs can be found in the [deno doc](https://deno.land/x/request_utils?doc).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
