import { useContext } from "react";
import { WordListContext } from "../features/app-wrapper/Providers/WordListProvider";
import {
  SQLError,
  SQLStatementErrorCallback,
  SQLTransaction,
} from "expo-sqlite";
import { getRandomInt } from "../utils/helpers";
import { useAppSelector } from "./reduxHooks";
import { selectRestrictions } from "../features/game/gameSelectors";
import { Alert } from "react-native";

const USE_LOGS = false;

// allows interaction with and usage of a local word list database
// allows offline word validation, random word selection, and worderbot turns
const useWordList = () => {
  const wordDb = useContext(WordListContext);
  const restrictions = useAppSelector(selectRestrictions);

  const log = (message?: any, ...optionalParams: any[]) => {
    if (!USE_LOGS) return;
    console.log(message, ...optionalParams);
  };

  // the standard error callback for database transactions
  const errorCallback = <T>(
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
    resolution: T,
    errorHeader: string
  ): SQLStatementErrorCallback => {
    const cb = (tx: SQLTransaction, error: SQLError) => {
      Alert.alert(
        `Word List Error: ${errorHeader}`,
        JSON.stringify(error, null, 2)
      );
      console.error(errorHeader, error.message);
      reject(error);
      resolve(resolution);
      return false; // returning true rolls back the transaction
    };

    return cb;
  };

  // checks if a word exists in the word list
  const isWordOnList = async (word: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      if (!wordDb) {
        reject({ message: "word list database not loaded" });
        return;
      }

      wordDb.transaction((tx) => {
        tx.executeSql(
          // queries the word list for whether the passed word exists
          "SELECT COUNT(*) as count FROM Words WHERE word = ?",
          [word],
          // resolves the async function with whether or not the word is present
          (tx, result) => {
            const count = result.rows.item(0)?.count as number;
            resolve(count > 0);
          },
          // if there is an error, pass the rejection to the async function
          (tx, error) => {
            Alert.alert("1st level error:", JSON.stringify(error, null, 2));
            return errorCallback(
              resolve,
              reject,
              false,
              "Error validating word:"
            )(tx, error);
          }
        );
      });
    });
  };

  // return whether any words exist which start with the passed substring
  const existWordsStartingWith = async (
    substring: string
  ): Promise<boolean> => {
    // always return true if only one letter passed
    if (substring.length === 1) return true;

    return new Promise<boolean>((resolve, reject) => {
      if (!wordDb) {
        reject({ message: "word list database not loaded" });
        return;
      }

      log("____ searching", substring, "...");

      wordDb.transaction((tx) => {
        tx.executeSql(
          // queries the word list for whether any words begin with the substring
          "SELECT COUNT(*) as count FROM Words WHERE word LIKE ? || '%';",
          [substring],
          // resolves the async function with whether or not any words are present
          (tx, result) => {
            // log("______ result:", JSON.stringify(result, null, 2));
            const count = result.rows.item(0)?.count as number;
            resolve(count > 0);
          },
          // if there is an error, pass the rejection to the async function
          errorCallback(
            resolve,
            reject,
            false,
            `Error finding words starting with ${substring}-:`
          )
        );
      });
    });
  };

  const generateRandomWordQuery = (
    substring: string,
    excludedWords: string[]
  ) => {
    const restrictionsPlaceholders = restrictions
      .map((r, i) => (i === 0 ? "SELECT ? AS substring" : "?"))
      .join(" UNION SELECT ");
    const excludedWordsPlaceholders = excludedWords.map(() => "?").join(",");

    const query = `SELECT word FROM Words WHERE word LIKE ? || '%'${
      restrictions.length === 0
        ? ""
        : ` AND NOT EXISTS (SELECT 1 FROM (${restrictionsPlaceholders}) AS restriction WHERE word LIKE '%' || restriction.substring)`
    }${
      excludedWords.length === 0
        ? ""
        : ` AND word NOT IN (${excludedWordsPlaceholders})`
    }`;

    const getRandomWordQuery = `${query} ORDER BY RANDOM() LIMIT 1;`;

    return {
      query: getRandomWordQuery,
      params: [substring, ...restrictions, ...excludedWords],
    };
  };

  // selects a random word which begins with the passed substring
  // returns the pNum used to get the word
  // will return null if no words begin with the substring
  const selectRandomWordStartingWith = async (
    substring: string,
    excludedWords?: string[]
  ): Promise<{ word: string | null; pNum: number }> => {
    return new Promise<{ word: string | null; pNum: number }>(
      (resolve, reject) => {
        if (!wordDb) {
          reject({ message: "word list database not loaded" });
          return;
        }

        log("____ searching for random word starting with:", substring);

        // get the query and params for the random word transaction
        const { query, params } = generateRandomWordQuery(
          substring,
          [substring, ...(excludedWords || [])] // include substring so whole word is not prompt
        );

        log("query:", JSON.stringify(query, null, 2));
        log("params:", JSON.stringify(params, null, 2));

        wordDb.transaction((tx) => {
          tx.executeSql(
            // queries the word list for a random playable word beginning with the substring
            query,
            params,
            // resolves the async function with whether or not any words are present
            async (tx, results) => {
              const word = (results.rows.item(0)?.word || null) as
                | string
                | null;
              log("____ random word retrieved:", word);

              // TODO: any validation of the selected word, and reruning with the exclusion

              if (word) {
                // if the word was retrieved, resolv with the current word and the substring length as the pNum
                resolve({ word: word, pNum: substring.length });
              } else {
                // if no random words left for this substring, decrement the pNum and search again
                if (substring.length > 1) {
                  log("____ continuing to search...");
                  const { word, pNum } = await selectRandomWordStartingWith(
                    substring.slice(1)
                  );
                  resolve({ word: word, pNum: pNum });
                } else {
                  // if substring cannot be decremented, reject
                  reject({ message: "There are no playable words" });
                  resolve({ word: null, pNum: NaN });
                }
              }
            },
            // if there is an error, pass the rejection to the async function
            errorCallback(
              resolve,
              reject,
              { word: null, pNum: substring.length },
              `Error finding random word starting with ${substring}-:`
            )
          );
        });
      }
    );
  };

  // selects a playable word at random from the word list given a prompt word
  // returns the pNum used for the word
  // returns null if no playable words found
  const selectRandomPlayableWord = async (
    prompt: string
  ): Promise<{ word: string | null; pNum: number }> => {
    log("SELECTING RANDOM PLAYABLE WORD -------------");

    // starting with prompt length - 1, find the longest possible pNum for the prompt word
    let longestPNum = 1;
    for (let pNum = prompt.length - 1; pNum > 0; pNum--) {
      const testSubstring = prompt.slice(-pNum);
      log("__ DO WORDS START WITH:", testSubstring);
      const isWords = await existWordsStartingWith(testSubstring);
      if (isWords) {
        log("____ ... YES!");
        longestPNum = pNum;
        log("__ longest pNum:", longestPNum);
        break;
      }
    }

    // assign targetPNum to a random pNum between the longest possible and 1
    let targetPNum = getRandomInt(1, longestPNum);
    log("__ random target pNum starting at:", targetPNum);

    // pick a random playable word that starts with the targetPNum substring
    try {
      const { word, pNum } = await selectRandomWordStartingWith(
        prompt.slice(-targetPNum)
      );

      log("__ final word:", word);
      log("__ final pNum:", pNum);

      // return the playable word or null if no possible words
      return { word, pNum };
    } catch (error) {
      console.error(error);
    }

    return { word: null, pNum: NaN };
  };

  const getRandomStartingWord = async (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (!wordDb) {
        reject({ message: "word list database not loaded" });
        return;
      }
      log("started looking for random starting word.....");

      wordDb.transaction((tx) => {
        tx.executeSql(
          // queries the word list for a single random word
          "SELECT word FROM Words ORDER BY RANDOM() LIMIT 1;",
          [],
          // resolves the async function with the retrieved word, or fetches another if not usable
          async (tx, result) => {
            const word = result.rows.item(0).word as string;

            if (!!word && word.length > 1) {
              resolve(word);
            } else {
              const word = await getRandomStartingWord();
              resolve(word);
            }
          },
          // if there is an error, pass the rejection to the async function
          errorCallback(resolve, reject, "oops", "Error validating word:")
        );
      });
    });
  };

  return { isWordOnList, selectRandomPlayableWord, getRandomStartingWord };
};

export default useWordList;
