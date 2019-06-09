import { AppLoading, Font } from "expo";

import React, { Component } from "react";
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import { Actions } from "react-native-router-flux";

import SwiperFlatList from "react-native-swiper-flatlist";

import { IP_ADDRESS } from "../../Service/service";
import { deviceHeight, deviceWidth, layout } from "../../Styles/layout";
import StoreList from "./Presenter";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      spinner: true,

      items: [],

      imageList: [
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906070330434080.jpg?timestamp=1559985327696",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906040801014110.jpg",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201906040739140260.jpg",
        "http://www.mcdonalds.co.kr/uploadFolder/banner/banner_201905301256117210.jpg"
      ]
    };
  }

  componentDidMount() {
    this.getHomeApiAsync();
  }

  getHomeApiAsync = () => {
    return fetch(IP_ADDRESS + "/api/home")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson,
          spinner: false
        });
      });
  };

  render() {
    const { isLoadingComplete, items, spinner, imageList } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    const ImageList = imageList.map((url, index) => (
      <View key={index} style={[styles.child, { backgroundColor: "#ff5000" }]}>
        <Image
          source={{
            uri: url
          }}
          style={{
            width: deviceHeight,
            height: deviceHeight * 0.6
          }}
        />
      </View>
    ));

    return (
      <React.Fragment>
        <Spinner
          visible={spinner}
          texContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <StatusBar backgroundColor="rgba(0,0,0,0.24)" animated />
        <View style={[layout.navBar]}>
          <View style={{ flex: 0.2 }} />
          <View>
            <Image
              //style={{ width: 100, height: 20 }}
              source={require("../../assets/images/menu_plzzz_logo.png")}
              resizeMode={"cover"}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Actions.push("likes");
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              source={require("../../assets/images/likesButton.png")}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.swipeContainer]}>
            <SwiperFlatList
              autoplay
              autoplayLoop
              autoplayDelay={2}
              index={0}
              showPagination
            >
              {ImageList}
            </SwiperFlatList>
          </View>
          <StoreList items={items} />
        </View>
      </React.Fragment>
    );
  }
  _loadAssetsAsync = async () => {
    return Promise.all([
      //Asset.loadAsync([require("../../assets/images/icon.png")]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    console.log(err);
  };

  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  },
  swipeContainer: {
    backgroundColor: "white",
    paddingTop: 10
  },
  child: {
    height: deviceHeight * 0.6,
    width: deviceWidth,
    justifyContent: "center"
  }
});

export default Home;
