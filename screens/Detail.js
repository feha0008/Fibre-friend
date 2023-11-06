import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import styles from "../styles";
import * as SQLite from "expo-sqlite";
import PhotoSelector from "../components/PhotoSelector";

const db = SQLite.openDatabase("fibrefriendDB.db");

const Details = ({ route, navigation }) => {
  const { project } = route.params;
  const [counter, setCounter] = useState(project.counter);
  const [notes, setNotes] = useState(project.notes);

  const [showModal, setShowModal] = useState(false);
  const projectId = project.id;
  const projectItem = project;

  const deleteProject = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM projects WHERE id=?",
        [project.id],
        (_, results) => {
          alert(" Project deleted");
          navigation.navigate("Projects");
        },
        (_, error) => {
          alert("Error deleting: ", error);
        }
      );
    });
  };

  const addCounter = async () => {
    const newCounter = counter + 1;
    setCounter(newCounter);

    // Update the project data with the new counter value
    const updatedProject = { ...project, counter: newCounter };

    // Save the updated project data
    await saveUpdatedProject(updatedProject);
  };
  const subCounter = async () => {
    const newCounter = counter - 1;
    setCounter(newCounter);

    const updatedProject = { ...project, counter: newCounter };
    await saveUpdatedProject(updatedProject);
  };

  const resetCounter = async () => {
    const newCounter = 0;
    setCounter(newCounter);
    const updatedProject = { ...project, counter: newCounter };
    await saveUpdatedProject(updatedProject);
    alert("Counter is reset");
    setShowModal(false);
  };

  const saveNotesToDatabase = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE projects SET notes = ? WHERE id = ?",
        [notes, project.id],
        (_, results) => {
          alert("Notes saved successfully");
          //navigation.navigate("Projects");
        },
        (_, error) => {
          alert("Error saving notes to the database: ", error);
        }
      );
    });
  };

  const saveUpdatedProject = async (updatedProject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE projects SET name = ?, craft = ?, yarn = ?, needle = ?, notes=?, counter=? WHERE id = ?",
          [
            updatedProject.name,
            updatedProject.craft,
            updatedProject.yarn,
            updatedProject.needle,
            updatedProject.notes,
            updatedProject.counter,
            updatedProject.id,
          ],
          (tx, results) => {
            console.log("Project updated successfully");
          },
          (tx, error) => {
            alert("Error updating project: ", error);
          }
        );
      });
    } catch (error) {
      alert("Error saving updated project: ", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        style={styles.container}
      >
        <View style={styles.form}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={styles.symbolText}>...</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onTouchEnd={() => setShowModal(false)}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "Update",
                    { projectItem },
                    setShowModal(false)
                  )
                }
              >
                <Text style={styles.labelText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetCounter}>
                <Text style={styles.labelText}>Reset counter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteProject}>
                <Text style={styles.labelText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <View style={styles.buttonClose}>
                  <Text>x</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <Text style={styles.titleText}>{project.name}</Text>
          <Text style={styles.labelText}>Craft: {project.craft}</Text>
          <Text style={styles.labelText}>Yarn: {project.yarn}</Text>
          <Text style={styles.labelText}>Needles: {project.needle}</Text>
          <Text style={styles.labelText}>{project.date}</Text>

          <View style={styles.rowContainer}>
            <TouchableOpacity title="-" onPress={subCounter}>
              <Text style={styles.addText}>-</Text>
            </TouchableOpacity>
            <View style={styles.circleView}>
              <Text style={styles.addText}>{counter}</Text>
            </View>
            <TouchableOpacity title="+" onPress={addCounter}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
          <PhotoSelector projectItem={projectItem} />

          <TextInput
            multiline
            placeholder="Notes"
            style={styles.inputNotes}
            value={notes}
            onChangeText={(text) => setNotes(text)}
          ></TextInput>
          <TouchableOpacity onPress={saveNotesToDatabase}>
            <View style={styles.button}>
              <Text style={styles.labelText}>Save Notes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Details;
