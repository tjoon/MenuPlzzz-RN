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
  StyleSheet
} from "react-native";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-popup-dialog";
import Spinner from "react-native-loading-spinner-overlay";

import { Actions } from "react-native-router-flux";
import { IP_ADDRESS } from "../../Service/service";

import { layout } from "../../Styles/layout";
import ChildTab from "./Presenter";

import { Ionicons } from "@expo/vector-icons";

import SvgUri from "react-native-svg-uri";
import { stringify } from "qs";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      spinner: true,
      likes: [],
      isLikeClicked: {},
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

    console.log(target);
    this.setState({ slideAnimationDialog: visible, random: target });
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.store_id);
    this.getMenuApiAsync();
  }

  getMenuApiAsync = () => {
    return fetch(IP_ADDRESS + `/api/store/${this.props.store_id}/menu`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          datas: responseJson,
          spinner: false,
          isLikeClicked: false
        });
      });
  };

  _likeClick = (a, b) => {
    const originLikes = this.state.likes;
    const joined = this.state.likes.concat(a);
    if (this.state.likes.includes(a)) {
      this.setState({ likes: originLikes.filter(num => num !== a) });
    } else {
      this.setState({ likes: joined });
    }

    console.log(this.state.likes);
    console.log(b);
  };

  render() {
    const { datas, spinner, isLikeClicked, likes } = this.state;
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
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{store}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              Actions.push("search", { _datas: datas, _store: store });
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
