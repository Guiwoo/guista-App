import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function createAccount() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
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
            autoFocus
            placeholder="First Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="firstname"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={lastNameRef}
            placeholder="Last Name"
            autoCapitalize={"none"}
            placeholderTextColor="gray"
            returnKeyType="next"
            onSubmitEditing={() => onNext(userNameRef)}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="lastname"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={userNameRef}
            placeholder="User Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            autoCapitalize={"none"}
            onSubmitEditing={() => onNext(emailRef)}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={emailRef}
            placeholder=" Email"
            placeholderTextColor="gray"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize={"none"}
            onSubmitEditing={() => onNext(passwordRef)}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder=" password"
            placeholderTextColor="gray"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize={"none"}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <AuthButton
        text="Create an Account!"
        loading={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
