import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Copy, ChevronLeft } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import { useNavigate } from "@remix-run/react";
import { ActionFunction } from "@remix-run/cloudflare";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const id = params.random_id;

  return {
    id,
    url: request.url,
  };
};

export const action: ActionFunction = async ({ request }) => {
  // Ensure that the request is a POST request
  if (request.method !== "POST") {
    return new Response("Not Allowed", { status: 405 });
  }

  // Parse the request body
  const requestBody = await request.json();

  // Log the request body to the console
  console.log(requestBody);

  // You can perform other actions here, like database operations

  // Return a response (e.g., redirect, render, JSON, etc.)
  return new Response("Request received", { status: 200 });
};

export default function RandomRoute() {
  const { id, url } = useLoaderData<typeof loader>();
  const { toast } = useToast();
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center p-4 grow gap-2">
      <div className="w-full max-w-md">
        <Button
          onClick={() => {
            navigate(`/`);
          }}
          variant="link"
          className="px-0 text-muted-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Home
        </Button>
      </div>

      <Card className="w-full flex justify-between max-w-md items-center p-2 ps-4 text-muted-foreground">
        <pre>{url}</pre>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            // navigator.clipboard.writeText(url);
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          <Copy />
        </Button>
      </Card>
    </div>
  );
}
