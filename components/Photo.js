import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { useWindowDimensions } from "react-native";

const Container = styled.View``;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CapntionText = styled.Text`
  color: white;
`;
const Likes = styled.Text`
  color: white;
`;

const Photo = ({ id, user, file, isLiked, likes, caption }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.userName}</Username>
      </Header>
      <File style={{ width, height: height - 500 }} source={{ uri: file }} />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? `1 Like` : `${likes} Likes`}</Likes>
      <Caption>
        <Username>{user.userName}</Username>
        <CapntionText>{caption}</CapntionText>
      </Caption>
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
