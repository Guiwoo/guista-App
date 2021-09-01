import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default ({ navigation, route }) => {
  useEffect(() => {
    if (route?.params?.userName) {
      navigation.setOptions({
        title: `${route.params.userName}'s Profile`,
      });
    }
  }, []);
  return (
    <View>
      <Text>Some one's Profile</Text>
    </View>
  );
};
