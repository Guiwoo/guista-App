import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const CommentsBox = styled.View`
  flex: 8;
`;

const InputBox = styled.View`
  flex: 1;
`;
const TestText = styled.Text`
  color: white;
`;

export default ({ route }) => {
  const { comments } = route.params;
  const renderComments = (comment) => {
    console.log(comment);
    return (
      <View>
        <TestText>{comment.payload}</TestText>
      </View>
    );
  };
  return (
    <Container>
      <CommentsBox>
        <FlatList
          renderItem={renderComments}
          data={comments}
          keyExtractor={(comment) => comment.id}
        />
      </CommentsBox>
      <InputBox></InputBox>
    </Container>
  );
};

//challenge dismisskeyboard , faltlist pulltorefresh
