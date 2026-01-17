import { Humberger } from "../atoms/Humberger";

export default function AboutPage() {
  return (
    <div className="h-screen w-[calc(100vw-32px)] px-4 lg:mx-auto lg:max-w-[1000px] bg-gradient-to-br from-pink-200 via-blue-200 to-green-200 text-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <Humberger />
      </div>
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
    </div>
  );
}
