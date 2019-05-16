import SvgUri from "react-native-svg-uri";

import {
  Container,
  Content,
  Thumbnail,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import fillHeart from "../../assets/images/fill_heart.svg";
import emptyHeart from "../../assets/images/empty_heart.svg";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ChildTab = props => {
  console.log("clicked?", props.like);
  const LikeClicked = props.like;
  const funcLikeClick = props.func;
  const menuListItem = props.menu.map((ele, index) => (
    <MenuItem
      key={index}
      image={ele.image}
      name={ele.name}
      price={ele.price}
      _likeClick={funcLikeClick}
      isLikeClicked={LikeClicked}
    />
  ));

  //console.log(menuListItem);

  return (
    <Container>
      <Content>
        <List>{menuListItem}</List>
      </Content>
    </Container>
  );
};

const MenuItem = props => {
  console.log(props);
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <Thumbnail
          square
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
      <Right style={styles.right}>
        <TouchableOpacity onPress={props._likeClick}>
          <View>
            <SvgUri source={props.isLikeClicked ? fillHeart : emptyHeart} />
          </View>
        </TouchableOpacity>
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
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  fillHeart: {}
});

ChildTab.propTypes = {
  menu: PropTypes.array
};

MenuItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string
};

export default ChildTab;
