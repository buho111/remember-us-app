export function DownloadPage() {
  const downloadJson = async (filename: string) => {
    try {
      const response = await fetch(`/remember-us-app/${filename}.json`);
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("ダウンロードに失敗しました。");
    }
  };

  return (
    <div style={{ padding: 20, paddingTop: 80 }}>
      <p className="text-lg font-semibold mb-4">サンプルデータをダウンロード</p>
      <button
        onClick={() => downloadJson("hinatazaka46")}
        className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
      >
        日向坂46
      </button>
      <br />
      <br />
      <button
        onClick={() => downloadJson("timelesz")}
        className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
      >
        timelesz
      </button>
      <br />
      <br />
      <button
        onClick={() => downloadJson("hana")}
        className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
      >
        HANA
      </button>
    </div>
  );
}
