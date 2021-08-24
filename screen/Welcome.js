import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { colors } from "../styles";

const LoginLink = styled.Text`
  text-align: center;
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("createAccount");
  const goToLogin = () => navigation.navigate("login");
  return (
    <AuthLayout>
      <AuthButton
        disalbed={false}
        onPress={goToCreateAccount}
        text="Create an Account!"
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
