import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { FlatList } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import Seperator from "../components/Seperator";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default () => {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderRoom = ({ item: room }) => <RoomItem {...room} />;
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
