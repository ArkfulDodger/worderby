import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

// allows interaction with and usage of a local word list database
// allows offline word validation, random word selection, and worderbot turns
const useWordDatabase = () => {
  // the reference to the loaded word list database
  const [db, setDb] = useState<SQLite.SQLiteDatabase>();

  // loads/creates the database and returns the db object
  async function loadDatabase(): Promise<void> {
    console.log("Loading Database......");
    // if there is no SQLite directory on the device, create it
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      console.log("SQLite directory did not exist. Creating....");
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }

    console.log("Downloading the word db from assets.....");
    // load the database from assets into the file system
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/data/word.db")).uri,
      FileSystem.documentDirectory + "SQLite/word.db"
    );

    console.log("opening the database");
    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");
    setDb(wordDb);
  }

  // load the database when the hook is called
  useEffect(() => {
    loadDatabase();
  }, []);

  // helper function for checking if a word exists in the word list
  const isWordOnList = async (word: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      if (!db) {
        reject({ message: "word list database not loaded" });
        return;
      }

      db.transaction((tx) => {
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

export default useWordDatabase;
