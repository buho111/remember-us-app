import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { DownloadPage } from "../components/pages/DownloadPage";

export const Route = createLazyFileRoute("/download")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <App>
      <DownloadPage />
    </App>
  );
}
