import "./App.css";
import QuestionPage from "./components/pages/QuestionPage";

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="px-4">
        <QuestionPage />
      </div>
    </div>
  );
}
