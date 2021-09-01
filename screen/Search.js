import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
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

const Input = styled.TextInput``;

export default ({ navigation }) => {
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQUeryfn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTO);
  const onSubmit = () => {};
  const onValid = ({ keyword }) => {
    startQUeryfn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholder="Search photos..."
      placeholderTextColor="black"
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
        {data?.searchPhotos !== undefined && data?.searchPhotos.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything..!</MessageText>
          </MessageContainer>
        ) : null}
      </View>
    </DissmissKeyboard>
  );
};
