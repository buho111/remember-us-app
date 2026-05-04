import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";
import { InputWord } from "../components/pages/InputWord";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <App>
      <InputWord />
    </App>
  ),
});
