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

    let remoteAssetUri = "";
    let localAssetUri: string | null = "";

    try {
      const file = require("../../../assets/data/word.db");
      // Alert.alert("word.db file exists:", !!file ? "true" : "false");

      let asset = Asset.fromModule(file);
      remoteAssetUri = asset.uri;
      localAssetUri = asset.localUri;

      if (!localAssetUri) {
        await asset.downloadAsync();
        localAssetUri = asset.localUri;
      }

      // Alert.alert("Asset:", `downloaded: ${asset.downloaded}\n\nlocalUri:${asset.localUri}\n\nremoteUri:${asset.uri}`)
    } catch (error) {
      Alert.alert("No Db File:", JSON.stringify(error, null, 2));
    }
    // dbUri = Asset.fromModule(require("../../../assets/data/word.db")).uri;
    // console.log("database uri:", dbUri);

    let sqlFileUri = FileSystem.documentDirectory + "SQLite/word.db";
    // console.log("db file uri:", fileUri);
    
    let initialAssetFileInfo: FileSystem.FileInfo;
    let initialSQLFileInfo: FileSystem.FileInfo;

    if (localAssetUri) {
      // confirm that the database exists locally at the asset uri
      initialAssetFileInfo = await FileSystem.getInfoAsync(localAssetUri, {size: true});
      initialSQLFileInfo = await FileSystem.getInfoAsync(sqlFileUri, {size: true});
      // Alert.alert("Files:","Module File: " + fileInfo.size + "\n\nSQlite File: " + sqliteInfo.size)
    }

    // console.log("downloading database........");
    // load the database from assets into the file system
    let downloadResult = await FileSystem.downloadAsync(remoteAssetUri, sqlFileUri);
    // Alert.alert("download result:", downloadResult.status.toString() + `\n\ndbUri: ${dbUri}` + "\n\nheaders:\n" + JSON.stringify(downloadResult.headers,null, 2),);

    let info = await FileSystem.getInfoAsync(sqlFileUri);

    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");

    wordDb.transaction((tx) => {
      tx.executeSql(
        // queries the word list for a single random word
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        // resolves the async function with the retrieved word, or fetches another if not usable
        (tx, result) => {
          let tables = JSON.stringify(result.rows._array.map(t => t.name), null, 2);
          Alert.alert("Report:",
      `Download Result Status: ${downloadResult.status}\n\nInitial Local Uri: ${localAssetUri}\nSQL File Uri: ${sqlFileUri}\n\nInitial Asset Size: ${initialAssetFileInfo.size.toString()}\nInitial SQLite file size: ${initialSQLFileInfo.size.toString()}\nSQLite file size: ${info.size.toString()}\n\nTables: ${tables}`);
        },
        // if there is an error, pass the rejection to the async function
        (tx, error) => {
          Alert.alert(
            `Word DB Error: Table Test`,
            JSON.stringify(error, null, 2)
          );
          return true; // returning true rolls back the transaction
        }
      );
    });

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
