import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { colors } from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const Top = styled.View`
  flex: 1;
  border: 1px solid white;
`;

const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState();
  const [takePhoto, setTakePhoto] = useState("");
  const getPhoto = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setTakePhoto(photos[0]?.uri);
  };
  const getPermission = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhoto();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhoto();
    }
  };
  const choosePhoto = (uri) => {
    setTakePhoto(uri);
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: takePhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermission();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [takePhoto]);
  const NumberFour = 4;
  const { width } = useWindowDimensions();
  const renderPhoto = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / NumberFour, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === takePhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  // const HeaderRight = () => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() =>
  //         navigation.navigate("UploadForm", {
  //           file: takePhoto,
  //         })
  //       }
  //     >
  //       <HeaderRightText>Next</HeaderRightText>
  //     </TouchableOpacity>
  //   );
  // };
  return (
    <Container>
      <Top>
        {takePhoto !== "" ? (
          <Image
            resizeMode="cover"
            style={{ width, height: "100%" }}
            source={{ uri: takePhoto }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          numColumns={NumberFour}
          data={photos}
          keyExtractor={(photo) => photo.id}
          renderItem={renderPhoto}
        />
      </Bottom>
    </Container>
  );
};
