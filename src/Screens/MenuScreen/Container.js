import { Container, Tab, Tabs, ScrollableTab, Text } from "native-base";
import PropTypes from "prop-types";

import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { kfc, macdonald, momstouch } from "../../Datas/datas";

import { layout } from "../../Styles/layout";

import ChildTab from "./Presenter";
import { Ionicons } from "@expo/vector-icons";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
    };
  }

  componentDidMount() {
    if (this.props.store_id == 0) {
      this.setState({
        datas: macdonald,
      });
    } else if (this.props.store_id == 1) {
      this.setState({
        datas: momstouch,
      });
    } else if (this.props.store_id == 2) {
      this.setState({
        datas: kfc,
      });
    }
  }

  render() {
    const menuList = this.state.datas.map((ele, index) => (
      <Tab key={index} heading={ele.category}>
        <ChildTab menu={ele.menu} />
      </Tab>
    ));

    const { store } = this.props;
    return (
      <Container>
        <View style={[layout.navBar, {}]}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
          >
            <Ionicons name="ios-arrow-back" color={"#fff"} size={30} />
          </TouchableOpacity>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 20, color: "#fff" }}>{store}</Text>
          </View>

          <View style={{ flex: 0.1 }} />
        </View>

        <Tabs renderTabBar={() => <ScrollableTab />}>{menuList}</Tabs>
      </Container>
    );
  }
}

Menu.propTypes = {
  store_id: PropTypes.number,
};

export default Menu;
