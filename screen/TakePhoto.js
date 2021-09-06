import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { CameraType } from "expo-camera/build/Camera.types";
import Slider from "@react-native-community/slider";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  padding: 0px 50px;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  border: 2px solid white;
`;
const SliderContainer = styled.View``;
const ButtonsContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;
const ActionsContainer = styled.View`
  flex-direction: row;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        type={cameraType}
        pictureSize="4:3"
        style={{ flex: 1 }}
        zoom={zoom}
        flashMode={flashMode}
      >
        <CloseBtn onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" color="white" size={26} />
        </CloseBtn>
      </Camera>
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255,255,255,0.5)"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TakePhotoBtn />
          <ActionsContainer>
            <TouchableOpacity
              onPress={onFlashChange}
              style={{ marginRight: 30 }}
            >
              <Ionicons
                size={30}
                color="white"
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : ""
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons
                size={30}
                color={"white"}
                name={"md-camera-reverse-outline"}
              />
            </TouchableOpacity>
          </ActionsContainer>
        </ButtonsContainer>
      </Actions>
    </Container>
  );
};

//ask permission again on other contaienr
