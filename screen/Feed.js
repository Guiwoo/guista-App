import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
  const { data, loading } = useQuery(FEED_QUERY);
  const renderPhoto = ({ item: photo }) => <Photo {...photo} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => photo.id.toString()}
      />
    </ScreenLayout>
  );
};
