import { Container, Tab, Tabs, ScrollableTab } from "native-base";

import PropTypes from "prop-types";

import React, { Component } from "react";
import { kfc, macdonald, momstouch } from "../../Datas/datas";

import ChildTab from "./Presenter";

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
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>{menuList}</Tabs>
      </Container>
    );
  }
}

Menu.propTypes = {
  store_id: PropTypes.number,
};

export default Menu;
