import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../styles";

const Update = ({ route, navigation }) => {
  const { projectItem } = route.params;
  const db = SQLite.openDatabase("fibrefriendDB.db");

  const [projectData, setProjectData] = useState({
    name: "",
    craft: "",
    yarn: "",
    needle: "",
  });

  const loadProjectData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name, craft, yarn, needle FROM projects WHERE id = ?",
        [projectItem.id],
        (_, { rows }) => {
          const projectRow = rows.item(0);
          setProjectData(projectRow);
        },
        (_, error) => {
          alert("Error loading project data: ", error);
        }
      );
    });
  };

  useEffect(() => {
    loadProjectData();
  }, [projectItem]);

  const saveToDatabase = () => {
    const { name, craft, yarn, needle } = projectData;
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE projects SET name = ?, craft = ?, yarn = ?, needle = ? WHERE id = ?",
        [name, craft, yarn, needle, projectItem.id],
        (_, results) => {
          alert("Project updated successfully");
          navigation.navigate("Projects");
        },
        (_, error) => {
          alert("Error updating project: ", error);
        }
      );
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={30}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            placeholder={projectItem.name}
            style={styles.inputText}
            value={projectData.name}
            onChangeText={(text) =>
              setProjectData({ ...projectData, name: text })
            }
          />
          <Text style={styles.labelText}>Craft</Text>
          <TextInput
            placeholder={projectItem.craft}
            style={styles.inputText}
            value={projectData.craft}
            onChangeText={(text) =>
              setProjectData({ ...projectData, craft: text })
            }
          />
          <Text style={styles.labelText}>Yarn</Text>
          <TextInput
            placeholder={projectItem.yarn}
            style={styles.inputText}
            value={projectData.yarn}
            onChangeText={(text) =>
              setProjectData({ ...projectData, yarn: text })
            }
          />
          <Text style={styles.labelText}>Needles</Text>
          <TextInput
            placeholder={projectItem.needle}
            style={styles.inputText}
            value={projectData.needle}
            onChangeText={(text) =>
              setProjectData({ ...projectData, needle: text })
            }
          />
        </View>
        <TouchableOpacity onPress={saveToDatabase}>
          <View style={styles.button}>
            <Text style={styles.labelText}>Update</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Update;
