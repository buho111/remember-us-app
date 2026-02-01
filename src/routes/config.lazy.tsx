import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { ConfigPage } from "../components/pages/ConfigPage";

export const Route = createLazyFileRoute("/config")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <App>
      <ConfigPage />
    </App>
  );
}
