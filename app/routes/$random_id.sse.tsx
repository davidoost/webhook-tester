import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { emitter } from "~/services/emitter.server";

import { eventStream } from "remix-utils/sse/server";

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, function setup(send) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handle(message: any) {
      send({ event: "new-message", data: message });
    }

    emitter.on("message", handle);

    return function clear() {
      emitter.off("message", handle);
    };
  });
}
