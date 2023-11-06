import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.titleText}>Welcome</Text>
      <Text style={styles.labelText}>What do you want to do? </Text>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
        }}
      >
        <Text style={styles.mediumText}>Current projects</Text>
        <Text> </Text>
        <Text style={styles.mediumText}>Create new project</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginRight: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Projects")}>
          <View style={styles.projectContainer}>
            <MaterialIcons name={"folder"} size={80} color={"#4E4637"} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("NewProjectScreen")}
        >
          <View style={styles.projectContainer}>
            <MaterialIcons name={"add-circle"} size={80} color={"#4E4637"} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.mediumText}>
        Get inspired by diffrent types of fibers
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Fibers")}>
        <View style={styles.projectContainer}>
          <MaterialIcons name={"list"} size={80} color={"#4E4637"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default Home;
