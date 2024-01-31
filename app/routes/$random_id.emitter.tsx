import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { emitter } from "~/services/emitter.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const message = formData.get("message") as string;

  if (!message) {
    return json({ error: "Message is required" }, { status: 400 });
  }
  try {
    emitter.emit("message", message);

    return json(null, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
