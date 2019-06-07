import { Container, Text, Content, Tabs, ScrollView } from "native-base";

import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import LikesTab from "./Presenter";

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLikes: {}
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
      console.log("최애메뉴들");
      console.log("최애메뉴들 끝!");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { myLikes } = this.state;
    console.log("render 부분이다");

    console.log("render 끝!");
    return (
      <View>
        {Object.values(myLikes).map(myLike => (
          <LikesTab key={myLike.id} {...myLike} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default Likes;
