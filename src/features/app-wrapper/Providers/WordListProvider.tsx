// DatabaseContext.js
import { createContext, useState, useEffect, ReactNode } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert } from "react-native";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setIsLoadingDb } from "../../../store/slices/systemSlice";

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

  // loads/creates the database and returns the db object
  async function loadDatabase(): Promise<void> {
    // designate loading the database in state
    dispatch(setIsLoadingDb(true));

    // if there is no SQLite directory on the device, create it
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }

    // get the database asset and the location where it needs to be
    const asset = Asset.fromModule(require("../../../assets/data/word.db"));
    let sqlFileUri = FileSystem.documentDirectory + "SQLite/word.db";

    // Attempt to Download the Database from the Expo remote asset
    let downloadResult = await FileSystem.downloadAsync(asset.uri, sqlFileUri);

    // If the download fails, download via asset and copy over
    if (downloadResult.status !== 200) {
      // download asset if not already done
      if (!asset.downloaded) await asset.downloadAsync();
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
    }

    // open the database and set the reference in state
    const wordDb = SQLite.openDatabase("word.db");
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
