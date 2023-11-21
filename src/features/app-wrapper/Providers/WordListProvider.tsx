// DatabaseContext.js
import { createContext, useState, useEffect, ReactNode } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export const WordListContext = createContext<SQLite.SQLiteDatabase | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

// loads and subsequently provides access to the word list database through context
const WordListProvider = ({ children }: Props) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>();

  // loads/creates the database and returns the db object
  async function loadDatabase(): Promise<void> {
    // if there is no SQLite directory on the device, create it
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }

    // load the database from assets into the file system
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../../../assets/data/word.db")).uri,
      FileSystem.documentDirectory + "SQLite/word.db"
    );

    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");
    setDb(wordDb);
  }

  useEffect(() => {
    loadDatabase();
  }, []);

  return (
    <WordListContext.Provider value={db}>{children}</WordListContext.Provider>
  );
};

export default WordListProvider;
