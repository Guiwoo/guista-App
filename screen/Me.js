import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../styles";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      photos {
        id
        file
        likes
      }
      bio
      avatar
      following {
        id
        userName
      }
      followers {
        id
        userName
      }
      totalFollowing
      totalFollowers
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 20px;
`;
const PhotoView = styled.View``;

const PhotoBack = styled.ImageBackground`
  width: 100%;
  height: 300px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PhotoMain = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

const NameTag = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  color: white;
  font-weight: 600;
  position: absolute;
  bottom: -10px;
`;

const FollowContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
`;

const FollowBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const FollowText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: white;
`;
const FollowButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: ${colors.blue};
`;
const Seperator = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;
const TheText = styled.Text`
  font-weight: 600;
  color: white;
  font-size: 20px;
  margin-right: 10px;
`;
const TheView = styled.View`
  margin-top: 10px;
  width: 75%;
  height: 1px;
  background-color: white;
`;
const PhotoImage = styled.TouchableOpacity`
  margin-top: 10px;
`;
const Image = styled.Image`
  margin-right: 10px;
`;
const Id = styled.View``;

export default ({ navigation }) => {
  const { data: result } = useQuery(ME_QUERY);
  useEffect(() => {
    navigation.setOptions({
      title: `${result?.me?.userName}'s Profile`,
    });
  }, []);
  const renderPhoto = ({ item: photo }) => {
    return (
      <PhotoImage
        onPress={() =>
          navigation.navigate("PhotoScreen", {
            photoId: photo.id,
          })
        }
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: photo.file }}
        />
      </PhotoImage>
    );
  };
  return (
    <Container>
      <PhotoView>
        <PhotoBack
          resizeMode="cover"
          imageStyle={{ opacity: 0.5 }}
          source={{ uri: result?.me?.avatar }}
        >
          <PhotoMain source={{ uri: result?.me?.avatar }} />
          <NameTag>{result?.me?.userName}</NameTag>
          <FollowContainer>
            <FollowBox>
              <FollowText>Followers: </FollowText>
              <FollowButton>
                <Text style={{ color: "white" }}>
                  {result?.me?.totalFollowers}
                </Text>
              </FollowButton>
            </FollowBox>
            <FollowBox>
              <FollowText>Followings: </FollowText>
              <FollowButton>
                <Text style={{ color: "white" }}>
                  {result?.me?.totalFollowing}
                </Text>
              </FollowButton>
            </FollowBox>
          </FollowContainer>
        </PhotoBack>
      </PhotoView>
      <Seperator>
        <TheText>Profile</TheText>
        <TheView />
      </Seperator>
      <Seperator>
        <TheText>Photo: {result?.me?.photos?.length}</TheText>
        <TheView />
      </Seperator>
      <FlatList
        horizontal={true}
        data={result?.me?.photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};
