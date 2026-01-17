import { createLazyFileRoute } from "@tanstack/react-router";
import DownloadPage from "../components/pages/DownloadPage";

export const Route = createLazyFileRoute("/download")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DownloadPage />;
}
