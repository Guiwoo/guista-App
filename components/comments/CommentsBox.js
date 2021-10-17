import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";

const Contianer = styled.View`
  color: white;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
`;

const CommentUserImg = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  align-items: center;
`;
const CommnetUserName = styled.Text`
  color: white;
`;
const CommentPayload = styled.Text`
  color: white;
`;
const CommentDate = styled.Text`
  color: white;
  font-size: 10px;
`;

const CommnetBox = ({ data }) => {
  const { data: meData } = useMe();
  const {
    item: { payload, createdAt },
  } = data;
  let theTime;
  // Have to fix time problem
  return (
    <Contianer>
      <View
        style={{ flexDirection: "row", marginRight: 20, alignItems: "center" }}
      >
        <CommentUserImg source={{ uri: meData.me.avatar }} />
        <CommnetUserName>{meData?.me?.userName}</CommnetUserName>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CommentPayload>{payload}</CommentPayload>
      </View>
      <View style={{ alignItems: "center" }}>
        <CommentDate>{createdAt ? theTime : null}</CommentDate>
      </View>
    </Contianer>
  );
};

export default CommnetBox;
