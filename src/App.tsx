import "./App.css";
import { Humberger } from "./components/atoms/Humberger";

type Props = { children: React.ReactNode };

export function App({ children }: Props) {
  return (
    <div className="min-h-screen w-screen h-fit bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <Humberger />
      </div>
      {children}
    </div>
  );
}
