import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offSet: Int!) {
    seeFeed(offSet: $offSet) {
      ...PhotoFragment
      user {
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
  const refreshing = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  const renderPhoto = ({ item: photo }) => <Photo {...photo} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
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
        keyExtractor={(photo) => photo.id.toString()}
      />
    </ScreenLayout>
  );
};
