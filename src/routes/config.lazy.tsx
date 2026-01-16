import { createLazyFileRoute } from "@tanstack/react-router";
import { ConfigPage } from "../components/pages/ConfigPage";

export const Route = createLazyFileRoute("/config")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ConfigPage />;
}
