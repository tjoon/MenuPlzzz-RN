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
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      spinner: true,
      likes: [],
      isLikeClicked: false,
      newId: "",
      loadedLikes: false,
      myLikes: {}
    };
  }

  componentDidMount() {
    this._loadLikes();
    this.getMenuApiAsync();

    //AsyncStorage.clear();
  }

  getMenuApiAsync = () => {
    return fetch(IP_ADDRESS + `/api/store/${this.props.store_id}/menu`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          datas: responseJson,
          spinner: false,
          likes: [this._loadLikes()],
          isLikeClicked: false
        });
      });
  };

  _toggleComplete = () => {
    console.log("_toggleComplete Called");
    this.setState(prevState => {
      return {
        isLikeClicked: !prevState.isLikeClicked
      };
    });
  };

  _addLikes = () => {
    console.log("_addLikes Called");
    const { newId } = this.state;
    if (newId !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newLikeObject = {
          [ID]: {
            id: ID,
            isLikeClicked: false,
            menuId: newId
          }
        };
        const newState = {
          ...prevState,
          newId: "",
          myLikes: {
            ...prevState.myLikes,
            ...newLikeObject
          }
        };
        return { ...newState };
      });
    }
    const newLike = {
      ids: ""
    };
  };

  _likeClick = (menuId, b) => {
    const originLikes = this.state.likes;
    const joined = this.state.likes.concat(menuId);
    if (this.state.likes.includes(menuId)) {
      this.setState({ likes: originLikes.filter(num => num !== menuId) });
      console.log("채워진 하트 클릭 : " + this.state.likes);
      this._saveLikes(this.state.likes);
    } else {
      this.setState({ likes: joined });
      console.log("빈 하트 클릭 : " + this.state.likes);
      this._saveLikes(this.state.likes);
    }

    console.log(this.state.likes);
    console.log(b);
  };

  _saveLikes = like => {
    console.log("AsyncStorage에 저장할 값 : " + like.toString());
    const saveLikes = AsyncStorage.setItem("like", like.toString());
  };

  // _loadLikes = async () => {
  //   try {
  //     const likes = await AsyncStorage.getItem("like");
  //     const parsedLikes = likes.split(",");
  //     this.setState({ likes: parsedLikes });
  //     console.log("껄껄 : " + parsedLikes);
  //     return likes;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  _loadLikes = () => {
    this.setState({
      loadedLikes: true
    });
  };

  render() {
    const {
      datas,
      spinner,
      isLikeClicked,
      likes,
      loadedLikes,
      ids
    } = this.state;
    if (!loadedLikes) {
      return <AppLoading />;
    }
    console.log("=====================");
    //console.log(datas);
    console.log("=========##==========");
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
            fucking={this._toggleComplete}
            isLikeClicked={this.isLikeClicked}
            likes={this.state.likes}
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
            fucking={this._toggleComplete}
            isLikeClicked={isLikeClicked}
            likes={this.state.likes}
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
