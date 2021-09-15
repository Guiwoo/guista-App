import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayOut from "../components/ScreenLayout";
import styled from "styled-components/native";
import { Controller, useForm, useWatch } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      message {
        id
        payload
        user {
          userName
          avatar
        }
        read
      }
    }
  }
`;
const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outgoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 15px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
  width: 90%;
  margin-right: 10px;
`;
const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;
const SendButton = styled.TouchableOpacity``;

export default ({ route, navigation }) => {
  const { data: meData } = useMe();
  const { register, handleSubmit, setValue, control, getValues, watch } =
    useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    console.log(id, "id");
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          userName: meData.me.userName,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          message(prev) {
            console.log(prev, "⭐️");
            return [...prev, messageFragment];
          },
        },
      });
    }
    console.log("💚", cache);
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Chat with ${route?.params?.talkingTo?.userName}`,
    });
  }, []);
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  const renderMessage = ({ item: message }) => {
    return (
      <MessageContainer
        outgoing={message.user.userName !== route?.params?.talkingTo?.userName}
      >
        <Author>
          <Avatar source={{ uri: message.user.avatar }} />
        </Author>
        <Message>{message.payload}</Message>
      </MessageContainer>
    );
  };
  const messages = [...(data?.seeRoom?.message ?? [])];
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayOut loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%", marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputContainer>
              <TextInput
                placeholder="Write a message"
                returnKeyType="send"
                placeholderTextColor={"rgba(255,255,255,0.5)"}
                autoCapitalize={"none"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              <SendButton disabled={!Boolean(watch("message"))}>
                <Ionicons
                  name="send"
                  color={
                    !Boolean(watch("message"))
                      ? "rgba(255,255,255,0.5)"
                      : "white"
                  }
                  size={20}
                />
              </SendButton>
            </InputContainer>
          )}
          name="message"
          rules={{ required: true }}
        />
      </ScreenLayOut>
    </KeyboardAvoidingView>
  );
};
