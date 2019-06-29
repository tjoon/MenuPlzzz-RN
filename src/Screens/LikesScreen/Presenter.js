import { Text, Left, Right, Body, ListItem } from "native-base";
import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";

import ImageLoad from "react-native-image-placeholder";

const deviceWidth = Dimensions.get("window").width;

const LikeTab = props => {
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <View>
          <Image source={require("../../assets/images/fill_heart.png")} />
        </View>
      </Left>
      <Left style={styles.left2}>
        <ImageLoad
          style={{
            width: "100%",
            height: deviceWidth * 0.12,
            resizeMode: "contain"
          }}
          loadingStyle={{ size: "large", color: "black" }}
          source={{
            uri: props.image
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text>{props.name}</Text>
        <Text note numberOfLines={1}>
          {props.price}
        </Text>
      </Body>
      <Right>
        <View>
          <Image source={require("../../assets/images/detail_arrow.png")} />
        </View>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  left: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  left2: {
    flex: 17,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 62,
    flexDirection: "column"
  }
});

export default LikeTab;
