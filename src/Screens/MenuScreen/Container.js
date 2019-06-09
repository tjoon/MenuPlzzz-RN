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
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Dialog, {
  DialogContent,
  SlideAnimation
} from "react-native-popup-dialog";

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
      myLikes: {},
      slideAnimationDialog: false,
      random: []
    };
  }

  setRandomVisible(visible) {
    let target;
    if (this.state.datas.length > 0) {
      const ran1 = Math.floor(Math.random() * this.state.datas.length);

      if (this.state.datas[ran1] !== null) {
        const ran2 = Math.floor(
          Math.random() * this.state.datas[ran1].menu.length
        );

        if (this.state.datas[ran1].menu[ran2] !== null) {
          target = this.state.datas[ran1].menu[ran2];
        }
      }
    }

    this.setState({ slideAnimationDialog: visible, random: target });
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
      const parsedMyLikes = JSON.parse(likes);
      this.setState({ myLikes: parsedMyLikes || {} });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { datas, spinner } = this.state;
    const menuList = this.state.datas.map((ele, index) =>
      Platform.OS === "android" ? (
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
            <Image
              style={{ marginLeft: 10 }}
              source={require("../../assets/images/back_arrow.png")}
            />
          </TouchableOpacity>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{store}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              Actions.push("search", { _datas: datas, _store: store });
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              source={require("../../assets/images/finder.png")}
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

        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onHardwareBackPress={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          //dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
          dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        >
          <DialogContent>
            <Image
              source={{
                uri: this.state.random.image
                //"https://www.mcdelivery.co.kr/kr/static/1556153387275/assets/82/products/1201.png?"
              }}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "right",
                  marginTop: 15,
                  fontWeight: "bold"
                }}
              >
                {this.state.random.name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "left",
                  marginTop: 15
                }}
              >
                는 어떠세요?
              </Text>
            </View>
            <TouchableOpacity style={styles.recommendButtonStyle}>
              <Text style={styles.randomTextStyle}>자세히 보기</Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>

        <TouchableOpacity
          style={styles.randomButtonStyle}
          onPress={() => {
            this.setRandomVisible(true);
            // this.setState({
            //   slideAnimationDialog: true
            // });
          }}
        >
          <Text style={styles.randomTextStyle}>랜덤 선택</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  },
  randomTextStyle: {
    fontFamily: "PlayfairDisplay-Black",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#ffffff"
  },
  randomButtonStyle: {
    backgroundColor: "#444444",
    flex: 0.12,
    justifyContent: "center",
    alignItems: "center"
  },
  recommendButtonStyle: {
    backgroundColor: "#ff774f",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 30,
    marginLeft: 30
  }
});

Menu.propTypes = {
  store_id: PropTypes.number
};

export default Menu;
