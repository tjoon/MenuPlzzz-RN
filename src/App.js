import React from "react";
import { StyleSheet, ToastAndroid, BackHandler } from "react-native";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";

import { Font } from "expo";

import { Home } from "./Screens/HomeScreen";
import { Menu } from "./Screens/MenuScreen/index";
import { Search } from "./Screens/SearchScreen/index";
import { Likes } from "./Screens/LikesScreen/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    Font.loadAsync({
      "PlayfairDisplay-Black": require("./assets/fonts/PlayfairDisplay-Bold.ttf")
    });
  }

  componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (Actions.currentScene == "home") {
      // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
      if (this.exitApp == undefined || !this.exitApp) {
        ToastAndroid.show("한번 더 누르시면 종료됩니다.", ToastAndroid.SHORT);
        this.exitApp = true;

        this.timeout = setTimeout(
          () => {
            this.exitApp = false;
          },
          2000 // 2초
        );
      } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp(); // 앱 종료
      }
      return true;
    }
  };

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="menu" component={Menu} title="Menu" hideNavBar={true} />
          <Scene
            key="home"
            component={Home}
            title="Home"
            initial={true}
            hideNavBar={true}
          />
          <Scene
            key="search"
            component={Search}
            title="Search"
            hideNavBar={true}
          />
          <Scene
            key="likes"
            component={Likes}
            title="Likes"
            hideNavBar={true}
          />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
