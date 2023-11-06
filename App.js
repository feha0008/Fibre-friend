import { useEffect } from "react";
import Navigate from "./components/navigate.js";
import * as SQLite from "expo-sqlite";

export default function App() {
  const db = SQLite.openDatabase("fibrefriendDB.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, craft VARCHAR(20), yarn TEXT, needle TEXT, date DATE NOT NULL, image TEXT, notes TEXT, counter INTEGER)",
        [],
        (tx, result) => {
          // Table created successfully
          console.log("Table created successfully");
        },
        (_, error) => {
          console.error("Error creating table: ", error);
        }
      );
    });
  }, []);

  return <Navigate></Navigate>;
}
