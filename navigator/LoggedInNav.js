import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TabIconCompo from "../components/nav/TabIconCompo";
import SharedStackNav from "./SharedStackNav";

const Tab = createBottomTabNavigator();
export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.3)",
        },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconCompo color={color} iconName={"home"} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconCompo color={color} iconName={"search"} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tab.Screen>
      <Tab.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconCompo color={color} iconName={"camera"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconCompo color={color} iconName={"heart"} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notification" />}
      </Tab.Screen>
      <Tab.Screen
        name="Me"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconCompo color={color} iconName={"person"} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
