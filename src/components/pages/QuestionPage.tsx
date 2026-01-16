import { useEffect, useState } from "react";
import { Humberger } from "../atoms/Humberger";

type ConfigItem = {
  id: number;
  image: string;
  name: string;
};

export default function QuestionPage() {
  const [data, setData] = useState<ConfigItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ConfigItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const saved = localStorage.getItem("configData");
    if (saved) {
      const parsedData: ConfigItem[] = JSON.parse(saved);
      setData(parsedData);
      selectRandom(parsedData);
    }
  };

  const selectRandom = (items: ConfigItem[]) => {
    if (items.length === 0) return;

    // ランダムに1つ選んで画像と名前
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    setSelectedItem(item);

    // 最大4つの名前オプション（正解を含む）
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selectedOptions = shuffled.slice(0, Math.min(4, items.length));
    // 正解が含まれていない場合、追加
    if (!selectedOptions.some((opt) => opt.name === item.name)) {
      selectedOptions[Math.floor(Math.random() * selectedOptions.length)] =
        item;
    }
    setOptions(
      selectedOptions.map((opt) => opt.name).sort(() => Math.random() - 0.5),
    ); // 順序ランダム
    setSelectedName("");
    setResult("");
  };

  const handleAnswer = () => {
    if (selectedItem && selectedName === selectedItem.name) {
      setResult("正解！");
    } else {
      setResult("間違い");
    }
  };

  const handleNext = () => {
    selectRandom(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <Humberger />
      </div>
      <div className="px-8 py-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">だれでしょう</h2>
        {selectedItem && (
          <div className="flex flex-col items-center">
            <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-4 mb-6">
              <div
                style={{
                  width: 300,
                  height: 300,
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={selectedItem.image}
                  alt="question"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((name, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedName(name)}
                  className={`px-6 py-4 rounded-2xl font-medium transition transform hover:scale-105 bg-white shadow-md hover:shadow-lg ${
                    selectedName === name
                      ? "border-4 border-pink-500 text-gray-800 bg-pink-100"
                      : "border-4 border-blue-200 text-gray-700"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAnswer}
                className="bg-white text-gray-800 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-green-200"
              >
                回答
              </button>
              <button
                onClick={handleNext}
                className="bg-white text-gray-800 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
              >
                次へ
              </button>
            </div>
            {result && (
              <p
                className={`mt-4 text-xl font-bold ${result === "正解！" ? "text-green-600" : "text-red-600"}`}
              >
                {result}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
