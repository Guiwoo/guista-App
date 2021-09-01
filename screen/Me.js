import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";

export default ({ navigation }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.userName,
    });
  }, []);
  return (
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
};
