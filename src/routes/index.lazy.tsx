import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { QuestionPage } from "../components/pages/QuestionPage";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <App>
      <QuestionPage />
    </App>
  ),
});
