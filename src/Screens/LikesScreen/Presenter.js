import { Text, Left, Right, Body, ListItem } from "native-base";
import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import ImageLoad from "react-native-image-placeholder";
import SvgUri from "react-native-svg-uri";

import detailArrow from "../../assets/images/detail_arrow.svg";

import fillHeart from "../../assets/images/fill_heart.svg";

const deviceWidth = Dimensions.get("window").width;

const LikeTab = props => {
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <View>
          <SvgUri source={fillHeart} />
        </View>
      </Left>
      <Left style={styles.left}>
        <ImageLoad
          style={{ width: deviceWidth * 0.12, height: deviceWidth * 0.12 }}
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
          <SvgUri source={detailArrow} />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 5,
    flexDirection: "column"
  }
});

export default LikeTab;
