import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import useMe from "../hooks/useMe";
import { colors } from "../styles";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 5px 10px;
  border-radius: 7px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const FOLLOW_USER = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
    }
  }
`;
const UNFOLLOW_USER = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
    }
  }
`;

export default ({ avatar, id, userName, isFollowing, isMe }) => {
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const upadateUnfollow = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {
      userName,
    },
    update: upadateUnfollow,
  });
  const updateFollow = (cache, result) => {
    const {
      data: {
        followUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
      },
    });
  };
  const [followuser] = useMutation(FOLLOW_USER, {
    variables: {
      userName,
    },
    update: updateFollow,
  });
  return (
    <Wrapper>
      <Container
        onPress={() =>
          navigation.navigate("Profile", {
            userName,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Container>
      {!isMe ? (
        <FollowBtn onPress={isFollowing ? unfollowUser : followuser}>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};
