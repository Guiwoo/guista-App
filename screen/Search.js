import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

export default ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => logUserOut()}>
      <Text>Photo</Text>
    </TouchableOpacity>
  </View>
);
