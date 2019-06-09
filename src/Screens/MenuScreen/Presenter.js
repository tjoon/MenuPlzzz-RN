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
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import emptyHeart from "../../assets/images/empty_heart.svg";
import fillHeart from "../../assets/images/fill_heart.svg";
import detailArrow from "../../assets/images/detail_arrow.svg";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
      <Left style={styles.left1}>
        <TouchableOpacity
          onPress={() =>
            props._likeClick(props.id, props.image, props.name, props.price)
          }
        >
          <View>
            <SvgUri source={props.myLikes[props.id] ? fillHeart : emptyHeart} />
          </View>
        </TouchableOpacity>
      </Left>

      <Left style={styles.left2}>
        <ImageLoad
          // style={{
          //   width: "100%",
          //   height: 100,
          //   resizeMode: "contain"
          // }}
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
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
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
    flex: 1,
    height: deviceHeight * 0.09,
    marginLeft: 0
  },

  left1: {
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
    flexDirection: "column",
    marginLeft: 10
  },
  right: {
    flex: 8,
    marginRight: 15
  },
  placeHolderStyle: {
    width: "100%",
    height: 100,
    resizeMode: "contain"
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
