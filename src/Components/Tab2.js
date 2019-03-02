import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

const Tab2 = ({
    params,
}) => (
    <Container>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/7513.png?' }} />
              </Left>
              <Body>
                <Text>골든 에그 치즈버거</Text>
                <Text note numberOfLines={1}>가격 ₩ 7,600</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/7514.png?' }} />
              </Left>
              <Body>
                <Text>그릴드 머쉬룸 버거</Text>
                <Text note numberOfLines={1}>가격 ₩ 7,600</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/5317.png?' }} />
              </Left>
              <Body>
                <Text>에그 불고기 버거</Text>
                <Text note numberOfLines={1}>가격 ₩ 3,600</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
);

export default Tab2;
