import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

// const SEE_PROFILE_QUERY = gql`
//     query seeProfile($userName :Stirng!){
//         seeProfile(userName:$userName){
//             id
//       userName
//       photos {
//         id
//         file
//         likes
//       }
//       firstName
//       lastName
//       email
//       bio
//       avatar
//       following {
//         id
//         userName
//       }
//       followers {
//         id
//         userName
//       }
//       totalFollowing
//       totalFollowers
//     }
//         }
//     }
//     }
// `;

export default ({ navigation, route }) => {
  const {
    params: { id, userName },
  } = route;
  console.log(id, userName);
  useEffect(() => {
    if (route?.params?.userName) {
      navigation.setOptions({
        title: `${route.params.userName}'s Profile`,
      });
    }
  }, []);

  return (
    <Container>
      <Text>Some one's Profile</Text>
    </Container>
  );
};
