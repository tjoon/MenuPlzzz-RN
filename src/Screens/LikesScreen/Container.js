import { Container, Content, List } from "native-base";
import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { layout } from "../../Styles/layout";
import LikeTab from "./Presenter";
import { Ionicons } from "@expo/vector-icons";

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLikes: {},
    };
  }

  componentDidMount() {
    this._load();
  }

  _load = async () => {
    try {
      const likes = await AsyncStorage.getItem("likes");
      const parsedMyLikes = JSON.parse(likes);
      this.setState({ myLikes: parsedMyLikes || {} });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { myLikes } = this.state;

    const likeMenuList = Object.values(myLikes).map(myLike => (
      <LikeTab key={myLike.menuId} {...myLike} />
    ));

    return (
      <Container>
        <View style={[layout.navBar, {}]}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} />
          </TouchableOpacity>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>최애 메뉴</Text>
          </View>
          <View style={{ flex: 0.2 }} />
        </View>
        <Content>
          <List>{likeMenuList}</List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default Likes;
