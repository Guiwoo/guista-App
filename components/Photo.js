import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import useMe from "../hooks/useMe";

const Container = styled.View`
  margin-bottom: 10px;
`;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CapntionText = styled.Text`
  margin-left: 7px;
  color: white;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View``;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({ id, user, file, isLiked, likes, caption }) => {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [iamgeHeight, setImageHeight] = useState(height - 500);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height > 2000 ? height / 5 : height / 3);
    });
  }, [file]);
  const goToProfile = () => {
    navigation.navigate("Profile", {
      userName: user.userName,
      id: user.id,
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.userName}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: iamgeHeight,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action onPress={toggleLikeMutation}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? "tomato" : "white"}
            size={22}
          />
        </Action>
        <Action onPress={() => navigation.navigate("Comments")}>
          <Ionicons name="chatbubble-outline" color="white" size={22} />
        </Action>
      </Actions>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Likes", {
            photoId: id,
          })
        }
      >
        <Likes>{likes === 1 ? `1 Like` : `${likes} Likes`}</Likes>
      </TouchableOpacity>
      <ExtraContainer>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.userName}</Username>
          </TouchableOpacity>
          <CapntionText>{caption}</CapntionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

Photo.porpTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
};

export default Photo;
