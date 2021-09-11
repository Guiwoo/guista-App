import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import RoomsList from "../screen/RoomsList";
import Room from "../screen/Room";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Rooms" component={RoomsList} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};
