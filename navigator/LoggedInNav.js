import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import Upload from "../screen/SelectPhoto";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card",
        //change to modal ,but modal deson't work safe area nouch
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};
