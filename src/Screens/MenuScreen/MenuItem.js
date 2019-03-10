import React from "react";
import {
  Container,
  Header,
  Content,
  Thumbnail,
  Text,
  ListItem,
  Left,
  Right,
  Body,
  Button
} from "native-base";
import { StyleSheet } from "react-native";

const MenuItem = props => {
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <Thumbnail square small source={{ uri: props.image }} />
      </Left>
      <Body style={styles.body}>
        <Text>{props.name}</Text>
        <Text note numberOfLines={1}>
          {props.price}
        </Text>
      </Body>
      <Right style={styles.right}>
        <Button transparent>
          <Text>View</Text>
        </Button>
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
    flex: 2,
    flexDirection: "column"
  },
  right: {
    flex: 1
  }
});

export default MenuItem;
