import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View``;
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

const Photo = ({ id, user, file, isLiked, likes, caption }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [iamgeHeight, setImageHeight] = useState(height - 500);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height > 2000 ? height / 5 : height / 3);
    });
  }, [file]);
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
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
        <Action>
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
      <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
        <Likes>{likes === 1 ? `1 Like` : `${likes} Likes`}</Likes>
      </TouchableOpacity>
      <ExtraContainer>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
