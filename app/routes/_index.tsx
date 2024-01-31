import type { MetaFunction } from "@remix-run/cloudflare";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  const goToRandomRoute = () => {
    // Generate a random UID
    const webhookRoute = Math.random().toString(36).substr(2, 9);
    // Navigate to the new route
    navigate(`/${webhookRoute}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 grow">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create endpoint</CardTitle>
          <CardDescription>
            Deploy your new webhook catcher in one-click.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button onClick={goToRandomRoute}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
