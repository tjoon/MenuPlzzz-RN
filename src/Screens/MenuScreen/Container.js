import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Text
} from "native-base";
import PropTypes from "prop-types";

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { Actions } from "react-native-router-flux";
import { IP_ADDRESS } from "../../Service/service";

import { layout } from "../../Styles/layout";
import ChildTab from "./Presenter";

import { Ionicons } from "@expo/vector-icons";

import SvgUri from "react-native-svg-uri";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      spinner: true,
      myLikes: {}
    };
  }

  componentDidMount() {
    this.getMenuApiAsync();
    this._load();
  }

  getMenuApiAsync = () => {
    return fetch(IP_ADDRESS + `/api/store/${this.props.store_id}/menu`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          datas: responseJson,
          spinner: false
        });
      });
  };

  _likeClick = id => {
    this.setState(prevState => {
      const myLikes = prevState.myLikes;
      if (myLikes[id]) {
        delete myLikes[id];
        const newState = {
          ...prevState,
          ...myLikes
        };

        this._saveLikes(newState.myLikes);
        return { ...newState };
      } else {
        const newLikeObject = {
          [id]: {
            menuId: id
          }
        };
        const newState = {
          ...prevState,
          myLikes: {
            ...prevState.myLikes,
            ...newLikeObject
          }
        };
        this._saveLikes(newState.myLikes);
        return { ...newState };
      }
    });
  };
  _saveLikes = likes => {
    const saveLikes = AsyncStorage.setItem("likes", JSON.stringify(likes));
  };

  _load = async () => {
    try {
      const likes = await AsyncStorage.getItem("likes");
      const parsedToDos = JSON.parse(likes);
      this.setState({ myLikes: parsedToDos || {} });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { spinner } = this.state;
    const menuList = this.state.datas.map((ele, index) =>
      Platform.OS === "android" ? (
        <Tab
          key={index}
          // style={{ fontSize: 5 }}
          heading={
            <TabHeading style={{ backgroundColor: "#fcfcfc" }}>
              <Text style={{ color: "black" }}>{ele.category}</Text>
            </TabHeading>
          }
        >
          <ChildTab
            menu={ele.menu}
            func={this._likeClick}
            myLikes={this.state.myLikes}
          />
        </Tab>
      ) : (
        <Tab
          key={index}
          heading={
            <TabHeading style={{ backgroundColor: "#fcfcfc" }}>
              <Text style={{ color: "black" }}>{ele.category}</Text>
            </TabHeading>
          }
        >
          <ChildTab
            menu={ele.menu}
            func={this._likeClick}
            myLikes={this.state.myLikes}
          />
        </Tab>
      )
    );

    const { store } = this.props;
    return (
      <Container>
        <Spinner
          visible={spinner}
          texContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={[layout.navBar, {}]}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} />
          </TouchableOpacity>
          <View style={{ marginBottom: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{store}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              //Actions.pop();
            }}
          >
            <SvgUri
              style={{ marginRight: 10 }}
              source={require("../../assets/images/finder.svg")}
            />
          </TouchableOpacity>
          {/* <View style={{ flex: 0.1 }} /> */}
        </View>

        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              tabsContainerStyle={{
                backgroundColor: Platform.OS == "ios" ? "#F8F8F8" : "#FF5000",
                width: this.width
              }} //#3F51B5
              underlineStyle={{
                backgroundColor: "#333333",
                borderWidth: 2,
                borderColor: "#333333"
              }}
            />
          )}
        >
          {menuList}
        </Tabs>

        <TouchableOpacity
          style={{
            backgroundColor: "#444444",
            flex: 0.12,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "PlayfairDisplay-Black",
              fontSize: 20,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0.01,
              textAlign: "center",
              color: "#ffffff"
            }}
          >
            랜덤 선택
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  }
});

Menu.propTypes = {
  store_id: PropTypes.number
};

export default Menu;
