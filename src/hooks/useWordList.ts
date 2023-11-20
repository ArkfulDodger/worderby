import { useContext } from "react";
import { WordListContext } from "../features/app-wrapper/Providers/WordListProvider";

// allows interaction with and usage of a local word list database
// allows offline word validation, random word selection, and worderbot turns
const useWordList = () => {
  const wordDb = useContext(WordListContext);

  // helper function for checking if a word exists in the word list
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
            console.error("Error validating word:", error.message);
            reject(error);
            resolve(false);
            return false; // returning true rolls back the transaction
          }
        );
      });
    });
  };

  return { isWordOnList };
};

export default useWordList;
