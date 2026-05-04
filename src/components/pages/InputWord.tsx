import { useCallback, useEffect, useRef, useState } from "react";
import type { ConfigItem } from "../../types";

type questionData = {
  correctImage: string;
  correctDisplayName: string;
  correctKana: string;
  incorrectKanas: string[];
};

const NUMBER_OF_OPTIONS = 4;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const HIRAGANA =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";

export function InputWord() {
  // データ全体
  const [data, setData] = useState<ConfigItem[]>([]);
  // 問題の情報
  const [questionData, setQuestionData] = useState<questionData | null>(null);
  // 選択肢の文字列リスト（カナ or 名前）
  const [result, setResult] = useState<string>("");
  // 答え
  const [answer, setAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // ---------------------------
  // randomChar
  // ---------------------------
  const randomChar = useCallback(
    (
      isAlphabetOnly: boolean,
      isHiraganaOnly: boolean,
      prohibitedChars: string[] = [],
    ) => {
      let chars: string;
      if (isAlphabetOnly) {
        chars = ALPHABET;
      } else if (isHiraganaOnly) {
        chars = HIRAGANA;
      } else {
        chars = ALPHABET + HIRAGANA;
      }

      let char: string;
      do {
        char = chars[Math.floor(Math.random() * chars.length)];
      } while (prohibitedChars.includes(char));

      return char;
    },
    [],
  );

  const randomItems = useCallback((array: ConfigItem[], num: number) => {
    var a = array;
    var t: ConfigItem[] = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      const i = (Math.random() * l) | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
  }, []);

  // ---------------------------
  // selectRandom
  // ---------------------------
  const selectRandom = useCallback(
    (items: ConfigItem[]): questionData => {
      if (items.length === 0)
        throw new Error("selectRandom: items array is empty");

      const randomItemsResult = randomItems(items, NUMBER_OF_OPTIONS);

      const incorrectKanas = randomItemsResult.slice(1).map((item) => {
        return (item.kana || item.name).replace(/\s/g, "");
      });

      return {
        correctImage: randomItemsResult[0].image,
        correctKana: (
          randomItemsResult[0].kana || randomItemsResult[0].name
        ).replace(/\s/g, ""),
        correctDisplayName: randomItemsResult[0].kana
          ? `${randomItemsResult[0].name}(${randomItemsResult[0].kana})`
          : randomItemsResult[0].name,
        incorrectKanas: incorrectKanas,
      };
    },
    [randomItems],
  );

  /**
   * getUsableString
   * @param prohibitedStrings 利用禁止文字列。N文字目が同じ文字にならないようにする
   * @param targetStr
   * @param length
   * @param isAlphabetOnly
   * @returns
   */
  const getUsableString = useCallback(
    (
      prohibitedStrings: string[],
      targetStr: string,
      length: number,
      isAlphabetOnly: boolean,
      isHiraganaOnly: boolean,
    ): string => {
      const returnStr: string[] = [];
      const randomChars =
        length > targetStr.length
          ? Array.from({ length: length - targetStr.length }, () =>
              randomChar(isAlphabetOnly, isHiraganaOnly),
            ).join("")
          : "";
      const adjustedStr =
        targetStr.length > length
          ? targetStr.slice(0, length)
          : targetStr + randomChars;

      let index = 0;
      for (const char of adjustedStr) {
        const prohibitedChars = prohibitedStrings.map((prohibited) => {
          return prohibited.charAt(index) || "";
        });

        if (prohibitedChars.includes(char)) {
          returnStr.push(
            randomChar(isAlphabetOnly, isHiraganaOnly, prohibitedChars),
          );
        } else {
          returnStr.push(char);
        }
        index += 1;
      }
      return returnStr.join("");
    },
    [randomChar],
  );

  /**
   * createQuestionData
   * @param str
   * @param targetLength
   * @returns
   */
  const createQuestionData = useCallback(
    (parseData: ConfigItem[]): questionData => {
      const baseQuestionData = selectRandom(parseData);
      const prohibitedStrings = [baseQuestionData.correctKana];
      const incorrectKanas: string[] = [];
      const isAlphabetOnly = /^[a-zA-Z]+$/.test(baseQuestionData.correctKana);
      const isHiraganaOnly = /^[ぁ-ゖ]+$/.test(baseQuestionData.correctKana);

      baseQuestionData.incorrectKanas.forEach((kana) => {
        const adjustedKana = getUsableString(
          prohibitedStrings,
          kana,
          baseQuestionData.correctKana.length,
          isAlphabetOnly,
          isHiraganaOnly,
        );
        prohibitedStrings.push(adjustedKana);
        incorrectKanas.push(adjustedKana);
      });

      return {
        correctImage: baseQuestionData.correctImage,
        correctDisplayName: baseQuestionData.correctDisplayName,
        correctKana: baseQuestionData.correctKana,
        incorrectKanas: incorrectKanas,
      };
    },
    [selectRandom, getUsableString],
  );

  // ---------------------------
  // loadData
  // ---------------------------
  const loadData = useCallback(() => {
    const saved = localStorage.getItem("configData");
    if (saved) {
      const parsedData: ConfigItem[] = JSON.parse(saved);
      setData(parsedData);
      return parsedData;
    }
  }, []);

  const getShuffledStrings = (questionData: questionData): string[] => {
    // 正解と不正解を1つの配列に結合
    const allStrings = [
      questionData.correctKana,
      ...questionData.incorrectKanas,
    ];
    // ランダムに並び替え
    return allStrings.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const parsedData = loadData();
    setData(parsedData || []);
  }, [loadData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const questionData = createQuestionData(data);
    setQuestionData(questionData);
  }, [data, createQuestionData]);

  // ---------------------------
  // handleChoiceClick
  // ---------------------------
  const handleChoiceClick = (
    str: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!questionData) return;

    // フォーカスを外す
    (event.currentTarget as HTMLButtonElement).blur();

    // 現在のインデックス位置の文字が正解文字列と一致するか判定
    const clickedChar = str.charAt(currentIndex);
    const expectedChar = questionData.correctKana.charAt(currentIndex);

    if (clickedChar === expectedChar) {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex === questionData.correctKana.length) {
          setResult("正解！");
        }
        return newIndex;
      });
    } else {
      setResult("不正解！");
      setAnswer(`答え: ${questionData.correctDisplayName}`);
      setCurrentIndex(Infinity);
    }
  };

  // ---------------------------
  // handleNext
  // ---------------------------
  const handleNext = () => {
    setResult("");
    setAnswer("");
    const questionData = createQuestionData(data);
    console.log("new questionData:", questionData);
    setQuestionData(questionData);
    setCurrentIndex(0);
    // 次へボタンにフォーカスを当てる
    setTimeout(() => nextButtonRef.current?.focus(), 0);
  };

  const handleShowAnswer = () => {
    if (questionData) {
      setAnswer(`答え: ${questionData.correctDisplayName}`);
    }
  };

  return (
    <div className="px-8 py-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-500 drop-shadow-md">
        {questionData ? "👀 だれでしょう ❓" : "データがありません"}
      </h2>
      {questionData && (
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
                src={questionData.correctImage}
                alt="question"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {getShuffledStrings(questionData)
              .filter((str) => str.charAt(currentIndex))
              .map((str) => (
                <button
                  type="button"
                  key={str}
                  onClick={(e) => handleChoiceClick(str, e)}
                  onTouchEnd={(e) =>
                    (e.currentTarget as HTMLButtonElement).blur()
                  }
                  className="px-4 py-2 bg-white bg-opacity-70 rounded-lg shadow-lg hover:shadow-xl transition leading-tight border-4 border-blue-200 text-gray-700"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onBlur={(e) => e.currentTarget.blur()}
                >
                  {str.charAt(currentIndex)}
                </button>
              ))}
          </div>
          <div className="flex gap-4">
            <button
              ref={nextButtonRef}
              type="button"
              onClick={handleNext}
              onTouchEnd={(e) => (e.currentTarget as HTMLButtonElement).blur()}
              className="bg-white text-gray-800 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-blue-200"
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitUserSelect: "none",
                userSelect: "none",
                outline: "none",
                boxShadow: "none",
              }}
              onBlur={(e) => e.currentTarget.blur()}
            >
              次へ
            </button>
            <button
              type="button"
              onClick={handleShowAnswer}
              onTouchEnd={(e) => (e.currentTarget as HTMLButtonElement).blur()}
              className="bg-white text-gray-800 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold border-4 border-green-200"
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitUserSelect: "none",
                userSelect: "none",
                outline: "none",
                boxShadow: "none",
              }}
              onBlur={(e) => e.currentTarget.blur()}
            >
              答え
            </button>
          </div>
          {result && (
            <p
              className={`mt-4 text-xl font-bold ${result === "正解！" ? "text-green-600" : "text-red-600"}`}
            >
              {result}
            </p>
          )}
          {answer && (
            <p
              className={`mt-4 text-lg font-bold text-purple-500 drop-shadow-md`}
            >
              {answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
