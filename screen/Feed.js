import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { Ionicons } from "@expo/vector-icons";
import Seperator from "../components/Seperator";

const FEED_QUERY = gql`
  query seeFeed($offSet: Int!) {
    seeFeed(offSet: $offSet) {
      ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offSet: 0,
    },
  });
  console.log(data);
  const refreshing = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  const renderPhoto = ({ item: photo }) => <Photo {...photo} />;
  const MessagesButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
      <Ionicons
        name="paper-plane"
        color="yellow"
        size={20}
        style={{ marginRight: 15, paddingRight: 25 }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => <Seperator />}
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          fetchMore({
            variables: {
              offSet: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refresh}
        onRefresh={refreshing}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => "" + photo.id}
      />
    </ScreenLayout>
  );
};
