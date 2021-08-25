import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screen/Welcome";
import createAccount from "../screen/createAccount";
import Login from "../screen/Login";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTitle: "",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="createAccount" component={createAccount} />
    </Stack.Navigator>
  );
}
