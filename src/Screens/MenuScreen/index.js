import React, { Component } from "react";
import { Text, View } from "react-native";
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';

import Tab1 from "../../Components/Tab1"
import Tab2 from "../../Components/Tab2"
import Tab3 from "../../Components/Tab3"
import Tab4 from "../../Components/Tab4"
import Tab5 from "../../Components/Tab5"

export class Menu extends Component {
  render() {
    return (
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="추천 메뉴">
            <Tab1 />
          </Tab>
          <Tab heading="버거 & 세트">
            <Tab2 />
          </Tab>
          <Tab heading="스낵 & 사이드">
            <Tab3 />
          </Tab>
          <Tab heading="음료">
            <Tab4 />
          </Tab>
          <Tab heading="디저트">
            <Tab5 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Menu;
