import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOG_IN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
    onCompleted,
  });
  const { handleSubmit, control, formState, watch } = useForm({
    defaultValues: {
      userName: params?.userName,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  return (
    <AuthLayout>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="User Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            autoCapitalize={"none"}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onSubmitEditing={() => onNext(passwordRef)}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="userName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            autoCapitalize={"none"}
            secureTextEntry
            returnKeyType="done"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            lastOne={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            onSubmitEditing={handleSubmit(onValid)}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={() => (
          <AuthButton
            text="Log In"
            loading={loading}
            disabled={!formState.isValid}
            onPress={handleSubmit(onValid)}
          />
        )}
      />
    </AuthLayout>
  );
}
