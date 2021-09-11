import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import { ROOM_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { colors } from "../styles";
import Seperator from "../components/Seperator";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

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
  border: 1px solid rgba(255, 255, 255, 0.7);
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

export default () => {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();
  const renderRoom = ({ item: room }) => {
    const notMe = room.user.find(
      (some) => some.userName !== meData?.me?.userName
    );
    return (
      <RoomContainer>
        <Column>
          <Avatar source={{ uri: notMe.avatar }} />
          <Data>
            <Username>{notMe.userName}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === 1 ? "message" : "messages"}{" "}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => <Seperator />}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => room.id.toString()}
        renderItem={renderRoom}
      />
    </ScreenLayout>
  );
};
