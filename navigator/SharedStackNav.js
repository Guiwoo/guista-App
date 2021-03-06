import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screen/Feed";
import Search from "../screen/Search";
import Notification from "../screen/Notification";
import Me from "../screen/Me";
import Profile from "../screen/Profile";
import PhotoScreen from "../screen/PhotoScreen";
import { Image } from "react-native";
import Likes from "../screen/Likes";
import Comments from "../screen/Comments";

const Stack = createStackNavigator();

export default ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "rgba(255,255,255,0.3)",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxHeight: 40, maxWidth: 300 }}
                resizeMode="contain"
                source={require("../assets/fontLogo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name="Notification" component={Notification} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};
