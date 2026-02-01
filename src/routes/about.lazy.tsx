import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { AboutPage } from "../components/pages/AboutPage";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <App>
      <AboutPage />
    </App>
  );
}
