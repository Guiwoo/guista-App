import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { logUserOut } from "../apollo";

export default () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white" }}>Me</Text>
    <TouchableOpacity onPress={logUserOut}>
      <Text style={{ color: "white" }}>Log out</Text>
    </TouchableOpacity>
  </View>
);
