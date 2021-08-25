import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default ({ iconName, color, focused }) => (
  <Ionicons
    name={focused ? iconName : `${iconName}-outline`}
    color={color}
    size={26}
  />
);

//need to do proptypes
