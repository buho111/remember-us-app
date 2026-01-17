import { Humberger } from "../atoms/Humberger";

export default function DownloadPage() {
  const downloadJson = async () => {
    try {
      const response = await fetch("/remember-us-app/testdata.json");
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "testdata.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("ダウンロードに失敗しました。");
    }
  };

  return (
    <div className="h-screen w-[calc(100vw-32px)] px-4 lg:mx-auto lg:max-w-[1000px] bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <Humberger />
      </div>
      <div style={{ padding: 20, paddingTop: 80 }}>
        <p className="text-lg font-semibold mb-4">
          サンプルデータをダウンロード
        </p>
        <button
          onClick={downloadJson}
          className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
        >
          ダウンロード
        </button>
      </div>
    </div>
  );
}
