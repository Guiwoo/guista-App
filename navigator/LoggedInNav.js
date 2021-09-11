import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screen/UploadForm";
import { Ionicons } from "@expo/vector-icons";
import MessagesNav from "./MessagesNav";

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
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerBackTitleVisible: false,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        name="UploadForm"
        component={UploadForm}
      />
      <Stack.Screen name="Messages" component={MessagesNav} />
    </Stack.Navigator>
  );
};
