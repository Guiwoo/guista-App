import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles";

const Button = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${colors.blue};
  padding: 15px 10px;
  border-radius: 4px;
  width: 100%;
  opacity: ${(props) => (props.disalbed ? "0.5 " : "1")};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.ftColor};
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

export default ({ onPress, disalbed, text, loading }) => {
  return (
    <Button disalbed={disalbed} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};

//Need to add PropTypes
