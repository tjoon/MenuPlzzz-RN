import React, { Component } from "react";
import { Text, View } from "react-native";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";

import Tab1 from "../../Components/Tab1";
import Tab2 from "../../Components/Tab2";
import Tab3 from "../../Components/Tab3";
import Tab4 from "../../Components/Tab4";
import Tab5 from "../../Components/Tab5";

import { kfc, macdonald, momstouch } from "../../Datas/datas";
import ChildTab from "../../Components/ChildTab";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: []
    };
  }

  componentDidMount() {
    if (this.props.store_id == 0) {
      this.setState({
        datas: macdonald
      });
    } else if (this.props.store_id == 1) {
      this.setState({
        datas: momstouch
      });
    } else if (this.props.store_id == 2) {
      this.setState({
        datas: kfc
      });
    }
  }

  render() {
    const menuList = this.state.datas.map((ele, index) => (
      <Tab key={index} heading={ele.category}>
        <ChildTab menu={ele.menu} />
      </Tab>
    ));
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>{menuList}</Tabs>
      </Container>
    );
  }
}

export default Menu;
