import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../styles";
import { useIsFocused } from "@react-navigation/native";

const Projects = ({ navigation }) => {
  const [knittingProjects, setKnittingProjects] = useState([]);

  //hjälper att ladda den nya datan som lagts till i db
  const isFocused = useIsFocused();

  useEffect(() => {
    const db = SQLite.openDatabase("fibrefriendDB.db");

    // Read data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM projects",
        [],
        (_, { rows: { _array } }) => {
          setKnittingProjects(_array);
        },
        (_, error) => {
          alert("Error reading projects: ", error);
        }
      );
    });
  }, [isFocused]);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("NewProjectScreen")}>
        <View style={styles.addContainer}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>

      {/* Display the list of projects */}
      <FlatList
        numColumns={2}
        data={knittingProjects}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { project: item })}
          >
            <View style={styles.projectContainer}>
              <Text style={styles.labelText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Projects;
