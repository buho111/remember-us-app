import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { FourChoice } from "../components/pages/FourChoice";

export const Route = createLazyFileRoute("/four-choice")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <App>
      <FourChoice />
    </App>
  );
}
