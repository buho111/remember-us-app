import { useState } from "react";
import { Humberger } from "../atoms/Humberger";

type ConfigItem = {
  id: number;
  image: string;
  name: string;
};

export function ConfigPage() {
  const defaultData: ConfigItem[] = [];

  const [data, setData] = useState<ConfigItem[]>(() => {
    const saved = localStorage.getItem("configData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const updateData = (
    index: number,
    key: keyof ConfigItem,
    value: string | number,
  ) => {
    setData((old) =>
      old.map((row, i) =>
        i === index
          ? {
              ...row,
              [key]: value,
            }
          : row,
      ),
    );
  };

  const addRow = () => {
    const newId =
      data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    setData((prev) => [...prev, { id: newId, image: "", name: "" }]);
  };

  const saveData = () => {
    localStorage.setItem("configData", JSON.stringify(data));
    alert("データが保存されました。");
  };

  const clearData = () => {
    localStorage.removeItem("configData");
    setData(defaultData);
    // Reset file input
    (document.getElementById("json-upload") as HTMLInputElement).value = "";
  };

  const uploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (
            Array.isArray(json) &&
            json.every(
              (item) =>
                typeof item.id === "number" &&
                typeof item.image === "string" &&
                typeof item.name === "string",
            )
          ) {
            setData(json);
            alert(
              "JSONがロードされました。保存ボタンを押して保存してください。",
            );
          } else {
            alert("無効なJSON形式です。");
          }
        } catch (error) {
          alert("JSONのパースに失敗しました。");
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = "";
  };

  const handleUploadClick = () => {
    (document.getElementById("json-upload") as HTMLInputElement)?.click();
  };

  return (
    <div className="h-screen w-[calc(100vw-32px)] px-4 lg:mx-auto lg:max-w-[1000px] bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <Humberger />
      </div>
      <div style={{ padding: 20, paddingTop: 80 }}>
        <p className="text-lg font-semibold mb-4">
          画像と名前を登録してください
        </p>
        <div className="mb-4 flex gap-2">
          <input
            type="file"
            accept=".json"
            onChange={uploadJson}
            className="hidden"
            id="json-upload"
          />
          <button
            onClick={handleUploadClick}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-purple-200"
          >
            JSONアップロード
          </button>
          <button
            onClick={addRow}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
          >
            追加
          </button>
          <button
            onClick={saveData}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-green-200"
          >
            保存
          </button>
          <button
            onClick={clearData}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-red-200"
          >
            クリア
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="bg-white bg-opacity-70 rounded-lg shadow-lg p-4 hover:shadow-xl transition"
            >
              <div className="flex items-center mb-2">
                <span className="font-bold text-gray-600 mr-2">#{item.id}</span>
              </div>
              <div className="mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <input
                  defaultValue={item.image}
                  onBlur={(e) => updateData(index, "image", e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="画像URL"
                />
              </div>
              <input
                defaultValue={item.name}
                onBlur={(e) => updateData(index, "name", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="名前"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
