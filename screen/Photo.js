import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default ({ navigation }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Text style={{ color: "white" }}>Go to Profile</Text>
    </TouchableOpacity>
  </View>
);
