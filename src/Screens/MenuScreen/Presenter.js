import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import SvgUri from "react-native-svg-uri";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import emptyHeart from "../../assets/images/empty_heart.svg";
import fillHeart from "../../assets/images/fill_heart.svg";
import detailArrow from "../../assets/images/detail_arrow.svg";

const deviceWidth = Dimensions.get("window").width;

const ChildTab = props => {
  const _likeClick = props.func;
  const myLikes = props.myLikes;

  const menuListItem = props.menu.map((ele, index) => (
    <MenuItem
      key={index}
      id={ele.id}
      image={ele.image}
      name={ele.name}
      price={ele.price}
      _likeClick={_likeClick}
      myLikes={myLikes}
    />
  ));

  return (
    <Container>
      <Content>
        <List>{menuListItem}</List>
      </Content>
    </Container>
  );
};

const MenuItem = props => {
  return (
    <ListItem style={styles.container}>
      <Left style={styles.left}>
        <TouchableOpacity onPress={() => props._likeClick(props.id)}>
          <View>
            <SvgUri source={props.myLikes[props.id] ? fillHeart : emptyHeart} />
          </View>
        </TouchableOpacity>
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
  },
  right: {
    flex: 1,
    marginRight: 15
  }
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
