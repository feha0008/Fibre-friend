import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import styles from "../styles";

const PhotoSelector = ({ projectItem }) => {
  //const { projectItem } = route.params;
  const [cameraPermission, setCameraPermission] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);

  const db = SQLite.openDatabase("fibrefriendDB.db");

  useEffect(() => {
    checkPermission();
    loadImageFromDatabase();
  }, []);

  const loadImageFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT image FROM projects WHERE id = ?",
        [projectItem.id],
        (_, { rows }) => {
          const storedImage = rows.item(0).image;
          if (storedImage) {
            setPickedImage(storedImage); // Set the stored image URI
          }
        },
        (_, error) => {
          alert("Error loading image from the database: ", error);
        }
      );
    });
  };

  const checkPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    setCameraPermission(status == "granted");
  };

  const photoHandler = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status == "granted") {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      const localUri = image.uri;

      const directory = `${FileSystem.documentDirectory}images/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Generate a new filename for the image
      const filename = Date.now() + ".jpg";
      const newUri = directory + filename;

      // Move the image from the temporary directory to a persistent directory
      await FileSystem.moveAsync({
        from: localUri,
        to: newUri,
      });
      setPickedImage(newUri);

      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE projects SET image = ? WHERE id = ?",
          [newUri, projectItem.id],
          (_, results) => {
            alert("Image saved successfully");
          },
          (_, error) => {
            alert("Error saving image to the database: ", error);
          }
        );
      });
    } else {
      alert("Permission needed");
    }
  };

  return (
    <TouchableOpacity onPress={photoHandler}>
      <View style={imgStyles.container}>
        {!pickedImage ? (
          <View style={{ paddingRight: 15 }}>
            <MaterialIcons
              name={"add-a-photo"}
              size={80}
              color={"#4E4637"}
              style={{ alignSelf: "center" }}
            />
          </View>
        ) : (
          <View style={styles.imagePreview}>
            <Image
              style={styles.projectImage}
              source={{ uri: pickedImage }}
            ></Image>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const imgStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 380,
    height: 400,
    marginTop: 50,

    alignItems: "center",
  },
});
export default PhotoSelector;
