import { Camera } from "expo-camera";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { CameraType } from "expo-camera/build/Camera.types";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
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
const PhotoActions = styled(Actions)`
  flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default ({ navigation }) => {
  const camera = useRef();
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
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
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
      // const asset = await MediaLibrary.createAssetAsync(uri);
    }
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", {
      file: takenPhoto,
    });
  };
  const onDismiss = () => setTakenPhoto("");
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or Just Upload ?", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {isFocused ? (
        takenPhoto === "" ? (
          <Camera
            type={cameraType}
            pictureSize="4:3"
            style={{ flex: 1 }}
            zoom={zoom}
            flashMode={flashMode}
            ref={camera}
            onCameraReady={onCameraReady}
          >
            <CloseBtn onPress={() => navigation.navigate("Tabs")}>
              <Ionicons name="close" color="white" size={26} />
            </CloseBtn>
          </Camera>
        ) : (
          <Image style={{ flex: 1 }} source={{ uri: takenPhoto }} />
        )
      ) : null}
      {takenPhoto === "" ? (
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
            <TakePhotoBtn onPress={takePhoto} />
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
      ) : (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
};

//ask permission again on other contaienr
