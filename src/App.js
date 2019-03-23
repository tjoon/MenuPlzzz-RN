import React from "react";
import { StyleSheet } from "react-native";
import { Router, Stack, Scene } from "react-native-router-flux";

import { Home } from "./Screens/HomeScreen";
import { Menu } from "./Screens/MenuScreen/index";

export default class App extends React.Component {
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
    justifyContent: "center",
  },
});
