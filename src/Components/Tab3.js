import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

const Tab3 = ({
    params,
}) => (
    <Container>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/1260.png?' }} />
              </Left>
              <Body>
                <Text>상하이 치킨 스낵랩</Text>
                <Text note numberOfLines={1}>가격 ₩ 2,600</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/6991.png?' }} />
              </Left>
              <Body>
                <Text>골든 모짜렐라 치즈스틱 2조각</Text>
                <Text note numberOfLines={1}>가격 ₩ 2,600</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.mcdelivery.co.kr/kr/static/1550824543513/assets/82/products/6992.png?' }} />
              </Left>
              <Body>
                <Text>골든 모짜렐라 치즈스틱 4조각</Text>
                <Text note numberOfLines={1}>가격 ₩ 4,500</Text>
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

export default Tab3;
