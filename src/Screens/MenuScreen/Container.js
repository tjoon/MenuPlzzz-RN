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
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { Actions } from "react-native-router-flux";
import { IP_ADDRESS } from "../../Service/service";

import { layout } from "../../Styles/layout";
import ChildTab from "./Presenter";

import { Ionicons } from "@expo/vector-icons";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      spinner: true
    };
  }

  componentDidMount() {
    console.log(this.props.store_id);
    this.getMenuApiAsync();

    // if (this.props.store_id == 0) {
    //   this.setState({
    //     datas: macdonald,
    //   });
    // } else if (this.props.store_id == 1) {
    //   this.setState({
    //     datas: momstouch,
    //   });
    // } else if (this.props.store_id == 2) {
    //   this.setState({
    //     datas: kfc,
    //   });
    // }
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

  render() {
    const { datas, spinner } = this.state;
    console.log("=====================");
    console.log(datas);
    console.log("=====================");
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
          <ChildTab menu={ele.menu} />
        </Tab>
      ) : (
        <Tab
          key={index}
          heading={
            <TabHeading>
              <Text>{ele.category}</Text>
            </TabHeading>
          }
        >
          <ChildTab menu={ele.menu} />
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
            <Text style={{ fontSize: 20 }}>{store}</Text>
          </View>

          <View style={{ flex: 0.1 }} />
        </View>

        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              tabsContainerStyle={{
                backgroundColor: Platform.OS == "ios" ? "#F8F8F8" : "#FF5000",
                width: this.width
              }} //#3F51B5
              underlineStyle={{
                backgroundColor: "#fcfcfc",
                borderWidth: 2,
                borderColor: "#0a60fe"
              }}
            />
          )}
        >
          {menuList}
        </Tabs>
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
