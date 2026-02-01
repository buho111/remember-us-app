export function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          このサイトについて
        </h1>
        <p className="text-gray-600 leading-relaxed">
          このページは名前を思い出せない芸能人を覚えるためのサイトです。
          <br />
          画像のURLと名前を登録して、クイズ形式で覚えることができます。
        </p>
      </div>
    </div>
  );
}
