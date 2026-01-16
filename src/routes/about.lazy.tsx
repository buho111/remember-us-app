import { createLazyFileRoute } from "@tanstack/react-router";
import AboutPage from "../components/pages/AboutPage";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AboutPage />;
}
