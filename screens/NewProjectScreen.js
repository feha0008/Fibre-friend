import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import * as SQLite from "expo-sqlite";

const NewProjectScreen = ({ navigation }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();

  const [projectData, setProjectData] = useState({
    name: "",
    craft: "",
    yarn: "",
    needle: "",
    date: new Date().toISOString(),
    image: "null",
    textField: "",
    counter: "0",
  });

  const saveProject = () => {
    const { name, craft, yarn, needle } = projectData;
    const date = new Date().toDateString();
    const db = SQLite.openDatabase("fibrefriendDB.db");

    //checks if there has been any input, if not, it can not save
    if (!name || !craft || !yarn || !needle) {
      alert("Please fill in all required fields before saving.");
      return; // Stop the save process if any field is empty
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO projects (name, craft, yarn, needle, date) VALUES (?, ?, ?, ?, ?)",
          [name, craft, yarn, needle, date],
          (tx, results) => {
            console.log("Project saved successfully", results);
            navigation.navigate("Projects");

            //clear the fields
            setProjectData({
              name: "",
              craft: "",
              yarn: "",
              needle: "",
              date: new Date().toISOString(),
              image: "null",
              textField: "",
              counter: "0",
            });
          },
          (_, error) => {
            alert("Error saving project: ");
          }
        );
      },
      null,
      null
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={30}
        style={styles.container}
      >
        <View style={styles.form}>
          <View style={styles.form}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
              placeholder="Name"
              style={styles.inputText}
              value={projectData.name}
              onChangeText={(text) =>
                setProjectData({ ...projectData, name: text })
              }
            />
            <Text style={styles.labelText}>Craft</Text>
            <TextInput
              placeholder="Craft"
              style={styles.inputText}
              value={projectData.craft}
              onChangeText={(text) =>
                setProjectData({ ...projectData, craft: text })
              }
            />
            <Text style={styles.labelText}>Yarn</Text>
            <TextInput
              placeholder="Yarn"
              style={styles.inputText}
              value={projectData.yarn}
              onChangeText={(text) =>
                setProjectData({ ...projectData, yarn: text })
              }
            />
            <Text style={styles.labelText}>Needles</Text>
            <TextInput
              placeholder="Needles"
              style={styles.inputText}
              value={projectData.needle}
              onChangeText={(text) =>
                setProjectData({ ...projectData, needle: text })
              }
            />
            <Text style={styles.labelText}>
              Date: {year}-{month}-{day}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={saveProject}>
          <View style={styles.button}>
            <Text style={styles.labelText}>Save</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default NewProjectScreen;
