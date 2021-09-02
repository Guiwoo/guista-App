import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../components/DissmissKeyboard";

const SEARCH_PHOTO = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  width: ${(props) => props.width / 1.7}px;
  padding: 5px 10px;
  border-radius: 10px;
`;

export default ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQUeryfn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTO);
  const onValid = ({ keyword }) => {
    console.log(keyword);
    startQUeryfn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search photos..."
      placeholderTextColor="rgba(0,0,0,0.8)"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  const renderSearch = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PhotoScreen", {
          photoId: photo.id,
        })
      }
    >
      <Image
        style={{ width: width / 3, height: 100 }}
        source={{ uri: photo.file }}
      />
    </TouchableOpacity>
  );
  return (
    <DissmissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Searching by Keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything..!</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={3}
              data={data?.searchPhotos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSearch}
            />
          )
        ) : null}
      </View>
    </DissmissKeyboard>
  );
};
// if i click photo i will go to photo screen
