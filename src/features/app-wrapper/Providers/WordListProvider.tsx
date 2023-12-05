// DatabaseContext.js
import { createContext, useState, useEffect, ReactNode } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

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
    // console.log("Checking SQLite directory exists......");
    let exists = (
      await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")
    ).exists;
    // console.log("SQLite directory exists:", exists ? "true" : "false");

    // if there is no SQLite directory on the device, create it
    if (!exists) {
      // console.log("Making SQLite Directory......");
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
      // console.log("SQLite Directory Made!");
    }

    let dbUri = "";

    try {
      const file = require("../../../assets/data/word.db");
      Alert.alert("word.db file exists:", !!file ? "true" : "false");

      let asset = Asset.fromModule(file);
      dbUri = asset.uri;
    } catch (error) {
      Alert.alert("No Db File:", JSON.stringify(error, null, 2));
    }
    // dbUri = Asset.fromModule(require("../../../assets/data/word.db")).uri;
    // console.log("database uri:", dbUri);

    let fileUri = FileSystem.documentDirectory + "SQLite/word.db";
    // console.log("db file uri:", fileUri);

    // console.log("downloading database........");
    // load the database from assets into the file system
    let downloadResult = await FileSystem.downloadAsync(dbUri, fileUri);
    Alert.alert("download result:", downloadResult.status.toString());

    let info = await FileSystem.getInfoAsync(fileUri);
    Alert.alert("db file exists:", info.exists ? "true" : "false");

    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");

    // console.log("wordDb exists:", !!wordDb ? "true" : "false");
    setDb(wordDb);
  }

  useEffect(() => {
    // console.log("LOADING DATABASE....");
    loadDatabase();
  }, []);

  return (
    <WordListContext.Provider value={db}>{children}</WordListContext.Provider>
  );
};

export default WordListProvider;
