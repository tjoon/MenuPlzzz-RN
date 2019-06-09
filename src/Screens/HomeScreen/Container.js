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

import { IP_ADDRESS } from "../../Service/service";
import { layout } from "../../Styles/layout";

import StoreList from "./Presenter";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      spinner: true,
      items: []
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
    const { isLoadingComplete, items, spinner } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

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
        <StoreList items={items} />
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
  }
});

export default Home;
