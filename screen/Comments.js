import React from "react";
import { useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import CommnetBox from "../components/comments/CommentsBox";
import Seperator from "../components/Seperator";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const CommentsBox = styled.View`
  flex: 8;
  margin-top: 10px;
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
    return <CommnetBox data={comment} />;
  };
  const [refresh, setRefresh] = useState(false);
  const refreshing = () => {
    setRefresh(true);
    setRefresh(false);
  };
  return (
    <Container>
      <CommentsBox>
        <FlatList
          refreshing={refresh}
          onRefresh={refreshing}
          renderItem={renderComments}
          data={comments}
          keyExtractor={(comment) => comment.id + ""}
          ItemSeparatorComponent={() => <Seperator />}
        />
      </CommentsBox>
      <InputBox></InputBox>
    </Container>
  );
};

//challenge dismisskeyboard , faltlist pulltorefresh
