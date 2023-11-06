import Fibers from "../screens/Fibers.js";
import Home from "../screens/Home.js";
import Projects from "../screens/Projects.js";
import NewProjectScreen from "../screens/NewProjectScreen";
import Details from "../screens/Detail.js";
import Update from "../screens/Update.js";
import PhotoSelector from "./PhotoSelector.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute", backgroundColor: "#CFBEA1" },
        headerStyle: {
          backgroundColor: "#cfbea1",
        },
        headerTitleStyle: {
          fontFamily: "Hiragino Mincho ProN",
          fontWeight: "bold",
          fontSize: 22,
          lineHeight: 25,
        },
        tabBarActiveTintColor: "#4E4637",
        tabBarInactiveTintColor: "#4E4637",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Fibrefriend",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={"#4E4637"}
            />
          ),
          tabBarLabel: "Home", // Optional label
        }}
      />

      <Tab.Screen
        name="NewProjectScreen"
        component={NewProjectScreen}
        options={{
          title: "Create Project",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={focused ? "folder" : "folder-open"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fibers"
        component={Fibers}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="list" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          tabBarStyle: { position: "absolute", backgroundColor: "#CFBEA1" },
          headerStyle: {
            backgroundColor: "#cfbea1",
          },
          headerTitleStyle: {
            fontFamily: "Hiragino Mincho ProN",
            fontWeight: "bold",
            fontSize: 22,
          },
          tabBarActiveTintColor: "#4E4637",
          tabBarInactiveTintColor: "#4E4637",
        }}
      >
        <Stack.Screen
          name="Back"
          component={TabScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewProjectScreen"
          component={NewProjectScreen}
          options={{
            title: "Create Project",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Details",
          }}
        />
        <Stack.Screen
          name="PhotoSelector"
          component={PhotoSelector}
          options={{
            title: "Camera",
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            title: "Update",
          }}
        />
        <Stack.Screen
          name="Fibers"
          component={Fibers}
          options={{
            title: "Fibers",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
