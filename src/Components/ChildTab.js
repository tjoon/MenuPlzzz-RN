import React from "react";
import { Text, View } from "react-native";
import MenuItem from "../Screens/MenuScreen/MenuItem";
import { Container, Content, List, ListItem } from "native-base";

const ChildTab = props => {
  const menuListItem = props.menu.map((ele, index) => (
    <MenuItem key={index} image={ele.image} name={ele.name} price={ele.price} />
  ));

  console.log(menuListItem);

  return (
    <Container>
      <Content>
        <List>{menuListItem}</List>
      </Content>
    </Container>
  );
};

export default ChildTab;
