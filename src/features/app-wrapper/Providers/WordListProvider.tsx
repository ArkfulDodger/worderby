// DatabaseContext.js
import { createContext, useState, useEffect, ReactNode } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert } from "react-native";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addDevLog, setIsLoadingDb } from "../../../store/slices/systemSlice";

export const WordListContext = createContext<SQLite.SQLiteDatabase | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

// loads and subsequently provides access to the word list database through context
const WordListProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [db, setDb] = useState<SQLite.SQLiteDatabase>();
  const log = (str: string) => {
    dispatch(addDevLog(str));
  };

  // loads/creates the database and returns the db object
  async function loadDatabase(): Promise<void> {
    // dispatch(clearDevLogs());
    // designate loading the database in state
    dispatch(setIsLoadingDb(true));

    log("Checking in FileSystem if SQLite directory exists...");
    // if there is no SQLite directory on the device, create it
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      log("    ...no");
      log("Making SQLite directory with FileSystem");
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    } else {
      log("    ...yes");
    }

    // get the database asset and the location where it needs to be
    const asset = Asset.fromModule(require("../../../assets/data/word.db"));
    let sqlFileUri = FileSystem.documentDirectory + "SQLite/word.db";
    log(`[asset uri]: ${asset.uri}`);
    log(`[sqlFileUri]: ${sqlFileUri}`);

    Alert.alert(
      "asset:",
      `${JSON.stringify(
        {
          name: asset.name,
          type: asset.type,
          uri: asset.uri,
          localUri: asset.localUri,
          downloaded: asset.downloaded,
          downloading: asset.downloading,
        },
        null,
        2
      )}`
    );

    log(`Attempting FileSystem download of Db from Expo remote...`);
    // Attempt to Download the Database from the Expo remote asset
    let downloadResult = asset.uri
      ? await FileSystem.downloadAsync(asset.uri, sqlFileUri)
      : null;

    // If the download fails, download via asset and copy over
    if (!downloadResult || downloadResult.status !== 200) {
      // download asset if not already done
      log("    ...failed");
      log("checking if Module asset downloaded...");
      if (!asset.downloaded) {
        log("    ...no, downloading...");
        await asset.downloadAsync();
        log("    ...... complete!");
      } else {
        log("    ...yes!");
      }
      if (asset.localUri) {
        // copy the database to its proper location if a local database exists
        await FileSystem.copyAsync({ from: asset.localUri, to: sqlFileUri });
      } else {
        // if unable to source a database, throw an error
        Alert.alert(
          "Uh-Oh!",
          "It looks like we weren't able to load our word list. Reach out to support if this keeps happening to you."
        );
        throw new Error("Word List could not be loaded!");
      }
    } else {
      log("    ...success!");
    }

    log("IMPORTANT STEP:");
    log("Attempting to open the database...");
    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");
    log(`    ...Completed attempt. Name: ${wordDb._name || "[none]"}`);
    setDb(wordDb);

    dispatch(setIsLoadingDb(false));
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
