import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { colors } from "../../styles";

const RoomContainer = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 3px;
  font-weight: 500;
`;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;

export default ({ user, unreadTotal, id }) => {
  const { data: meData } = useMe();
  const navigation = useNavigation();
  const talkingTo = user.find((some) => some.userName !== meData?.me?.userName);
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.userName}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}{" "}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};
