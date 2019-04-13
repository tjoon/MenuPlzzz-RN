import { AppLoading, Font } from "expo";

import React, { Component } from "react";
import { View, Image, StatusBar, StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import { IP_ADDRESS } from "../../Service/service";

import { layout } from "../../Styles/layout";
import StoreList from "./Presenter";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      spinner: true,
      items: [
        // {
        //   key: "menu",
        //   name: "맥도날드",
        //   image:
        //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAA9CAMAAAD1ReXsAAAAYFBMVEX////7yAv7xQD7yAD+67/++ev+9d3+//37wwD+9+X97Lz++/D834z97sX//PT84JP70lP70Ef98tL85qr81WH96LD7zDP7yyr82XX83Yb845z701n96rb723v95KP82G39OaYZAAAC0ElEQVRYhe1X6ZqrIAxlqXWrWrV2X97/LS9J0AJiC87P2/N942AGDyE5CQxjP/zwXyONsEah22eZbGZEV55lbfU36iaTnEshtpY15wLNj79QXwQQS/XoTGq0qId4raceFLWs8jOsUE7WVCrWQ95x9eu6ljoRnGM0Xor8OJlv6u2mfpfjn9fgphzbTZ722loBZQ2jp1qkXUfdTSTAwoUWCx9XpGGxirtVGTvTMAXuBoc9DBMy75Tjp9Vuj/J4Kc2J0Ve519YcpqxRuaKTfHzBIEPENzAYRvPRWCgCoIIxJBQU3P5evkOCQeEij+bGuN6nV+TcsjLjZoirdx5i0FoOsiuw7Egwl8laC74im4nzFWRWSlpx43gQWz8DcB3e7+Chkg0+jQA/gDu28A/uRyfofEoX6um6EFmbKZeOdM9ICz+m6La4kdL9/CPom8SwQBYRY8EjKFRx5fPE1JnHTTVxD+ZEiJK12ndAuO045hO3eUxAr4wNOGbOOlXSiduMFJxMamYdQZ1gGO2Ck1JzW9YeZ8YoHINrBxarHqXydeZnXD3pf2jum2UlQV1YOKBduw2uoYA7F4dSuJL/hha57Qz1mtvOAhZZTLuiD7h9m9ICd2N79LjxCSgT49aA6DT3xjbTFsOFgjRuRejisUuHiifmtL+LuSAoa3MXHyiUZzA39qX3YUnQhWmXpZZPREe5eOdrbidt5MeBheKAMXSPE+kpeTodYroV5b53rHgyzLgLn6Y+gDTrNgm0WicaAGXv1sIy0pNXV62ct6pR9sFdtqbNuycVKnlW3tiswo/MWviKhDI8iyyVlKvMRVCVzOoYm+NMEYl/8hLyGO7Sv8kl6BC699Pz7HZicIdeIxa4X5kQInP9ruO4O3966hLgik1zF6y7hjTDBW4/NPedFc0QkNAKNi+yUG6cfGd9NwSIPCk2CkVYqaU4eZOzuor/5+SHHxj7B5nyF6KsxsArAAAAAElFTkSuQmCC",
        // },
        // {
        //   key: "menu",
        //   name: "맘스터치",
        //   image:
        //     "data:image/jpeg;base64,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",
        // },
        // {
        //   key: "menu",
        //   name: "KFC",
        //   image:
        //     "data:image/jpeg;base64,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",
        // },
        // {
        //   key: "menu",
        //   name: "버거킹",
        //   image:
        //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAz1BMVEX////6rxgYVJTtAADuHSPuHCP6rAD6qgD85eXtAA7uFR0ATJD96OkASo8AQYsAQ4wAR472nZ7+8vIAPYkNUJL5wsPtDhT/+vrwREjycHLybG397e319/r72tr60dH95sb+7df6ysrV3OfxWVz92qn7xXH0iInzfX74trenwNj2pKX80pPwTE7+6s8wX5qCmLvxYmP1kZK3wtbuLTDvOj2UpsP8y4H7wWVqhrD7vVX93rT+9OX7uEQAN4f6sy9OcaSjssvB1eVce6nl6vAAL4P7kHf7AAAHfUlEQVRYhZ2YiXqiOhSAA0GRIIuIoFZsFauMUhe0LtVWq/P+z3RPFhCXjnPnfF9thPDn7CQi9Gdpdb+T5JAkSbf1YOYfGMlkXDXW74ekS4XCTv9AOex/y5MbNf6vWt31b+P9H5a/xux/jxMx9l96o9Vut1rtNsvey//CnI6frsC8jHZFVS0Wi9LXavT8vCyqm4+/5hzMzwkf9b7UopRKsah+9dDbTpV6f4Vp7U23yzE76VrUry3qqfTzoXRt68gGW2m0Kd6QihJCo6KkPj/iJKbJzfpQ375uOUBiIEl9ech5Z4ORur3LkT4+Vip1/5/9lJhWxrljF7UMHAThe+Cjrmmndr301BuIqkqbPMMJah3/Hudk6cLP6mirXkO+Xj/OjFLkTOcaxlhr3wHJrswLaSeh1UX+SDnIU20WehiXNaJgrJD5LWetm11h2EemEKiy6aWQUjtAaIo1D3RxPAX7bQwf15zE1EU+Q4hHRU4pLrOE8fuYitMkJK50fF9TMHKw4t0xzOCDZ1UC44DyNXo53w40TSEewbUGwRFgKcifEly55rwb9oGPXovUoN1IGOR0IjDIJ+CSeiOeoibxGoPFAnkFZe5ps2vOyZZdMVSBkrqlPIypPQM0AwVq7NKUFMDXIdIKiqZ4zWvQRDeEQmiVUoKSjzGB0Ci4NCdeH5SrxBH4aDGIHDCNVMDXg0tOy5bNqx7qQ3R9rYDbAUyvwV9QgrTBANIieps6ewCXo4unDoa7zn0NKiUaEe0JZjsIBh14wilhTdEYyOn0Axp+FGLcvwCNZat7/lbBuJGB0FDDgxKASsDXKKgA5uK2hhWYOhhc5FHXlHUxbEP5VDQvA2l9TKbsCwSIgwgkpOIMhjDbuUrHic4tCwY0RuU8CEJDIDQhWBKGuICDECvNISQEepot6OxFPgPGMo1ZewHOhOAOhjkQiT1Fi1EJewXieXiGOiX2iNPAUG0gBJ9ToFWVaZlVMIkDyLcLEHZCsK+BSlPizRtUE58WfEA0RQjBGSixZbuFuGvAtZEwjXg8arEGKgHAoXOjGEPBl5k2hDWSnEbvujxGHOQo3pQTnwDkMxBqhEE6NcKE1BGqe8DB9WGnHfX7Z4cfXffIQIW5Bpb5AGqiGoYnMI5FMCPumgUEvw73KOemXsHXLGgAgioqaPUhFBF4Bkd+WOOOpTaw4ZyBIIYKKM0CPRwoGciSWSuqaJAxHQhxBAsSgqf0XqnilUq4AII7tG4YiClURkGflrR3bkmfsv7OQU0UAAjRHjanReSE4MwyB0EOcVBcpgt5LMwKH2XRT0ENFBNtSpsqd0ms0aUFiBAHMVCbghYIDcHz90EF6BbanIU5COtDSEMlBwKjfOqjuCM0Ks3jObkCcR8VIDN4FTqYttXOJaigNRaAiwPhI5AQQCQH4lGDHlYBdahGDYiLNsuDSEF8CGd7IV2PanR+IwFoD/9mCxrhGq1CvmaQA5G6VkgNBEdSktIMqbdFHlCRZZbZDq1oyCRItDqfUDuDvEEt8xS/Tl8qClsvA+1d2eKNNsbQ0iuIJhJkwQWoiWY4BUGPJaJkPfFOYLJ20wYJvqMgeNWwZnwJQg0tBUHkIRHpG7f5xNKbd+6DLot3CAMN+5A9hPryCgSlkYKQEw2m01nEUmUw6EQLCuxasnvMQKRBWw1+ugTRNol8qNnCzbssaAyHzTa7asrCSSHLeYXZdwVilfcE7yjMkx699DbSjg6GtWGjgRbC23aSgVhE5lcaiSD7UUQTdttbSXT7/UqvdWbDdt8JmZMMnklnEOTr0wUoF5zn5RdA1JXENretE4orqLNgSXAC26qnFDT3eJY4AgRvRpx2sW1vo7JNfHEF+yjYK6PJ5zuKGv1ylkmsSljUoobIN5+CoAKCOrMHzhNwEhBbOdgfb9QP9rLXjV+ZttD+mUo8/GjKXhFavwN7CE0k7ttSyp8nNuhNpa6e6FAXtpyegGiV0AwQIBRSktfsQH/3bylcIUnd0g2sTCXdWzF3y9Z3mtmso0HLLQd3KcBZole1x33CJLOtxS5kGiEfyoH5d3tLAcN2sKVf0vXtK4X4JftXBgIU/evtbinsZNNjHGEY6x2ZjF3ZYCCc7sHfVurN9p9z/JE6Es9QMb/zoG6VgrwsYz6+7inD7HrZ8WOWcJCe36OBvNvGr3iR7eRWd7UBznKkrlgo1wY3zEVXsrd+lb73hwekHWjE7q+5o+Vq9xrUMo5j2xUHP5DnW0/DWeCVY9BR6GMm1xxactRoe58d9+GMzY7YsIUHYScksfU4jXXOEQe8K+mycLr5tNg+95arzWazeh3ljlmJLRLRntxSziTZHn/fvy/U2Yv8ka0fOPSQzZZyrf0d0wVmbQp1ZPOuXWKaMN61jclNOECSY4aRqz8uxmSd6q1b1vqQ/7Wme1hX7Qyju/cWuljU0NPJrmFX7fF+vV4f9+6nZWQU2TXXDzAgrYl1foI+xCR/BcLxSB0up7Wlyz+Ka43/7J0L1ES33bsUw/w5ovclWRumcWmjblf3//Q7F8RpXK2aNohlfsrHSfLvv/zR3w+ZPFTkP40sxyzlFGEJAAAAAElFTkSuQmCC",
        // },
        // {
        //   key: "menu",
        //   name: "파파이스",
        //   image:
        //     "data:image/png;base64,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",
        // },
        // {
        //   key: "menu",
        //   name: "롯데리아",
        //   image:
        //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABECAMAAADZaLnlAAAA8FBMVEX////qAADrHCT4vL71pabsAB7+9fX5nhzrFR7609T6yMvsABX0mJrxY2z+5sD1oqT+7M/uGy797u/sOTz++vr/8d7tAA//4LL84+P729z6sTT7ukn++O/tJjD3r7DwcXPygYP1maH0kZX5pB33tbbuLTzuN0TzcGjyeX/vTVT5mQD8xGXzh4v+3KP/3oftRUjvWl/zcH7vTV30mjL5wpLxewDyhwD1qFrxkAD4u571nEbtNhrvVwD7xVT6pi79zXn+04n+0nP8yY3+1ZX6rT/8x4H+5JzvO1H0ikL2l430g3v3tKv0kmz7uW3xXTr6sVS3ASVGAAAEAElEQVRYhe2Yi3KjNhRAJWQwCDDhYSJwDA7GLPJjUdImTbubmGx2N+1uH///N70SSTqz0yGZ2ulMpz4zCAHi+M7lWsJG6MCBA/9FIiuRvIqbsMwNw+JV3APqaqZGX0NtFGdTzQwj2R9tJEd7c9OzytTsGnrHd2N1Znx3vCd3cW9qmk1QtB2dPDJq9+OuNAAbaDUaH407jsaj7T7UiQ1qU6C2HY2OHhmNth/24C6kO87Gabs5Hj1yvHk7P9ndPTVVSj6kt+1mc/zApr1Ndw+cYZmSCs1vrm+3rSrBzV27XV3f3Ozs9mKZEu9kOUwnq9V227btdrtaTdLhcmd3o1LCwD1PJ5PrlWIySefD5a4JN1RKpgjcIE9BD8B+ONw97kyGbcM8Be7lcj6X/nQ+H0p2ddequnlevwG+/PL1V9B35uVvO6qjUMatmbZtar5/f5b9PHxkufOMJWLzEW2xOD9bPoX9x65qZOVCcM4b4J2mhb+nCtDf7OFr+Rfjj1CFqgivJ+nH8T7VCJ18ur59K7ldfdpr1Irx5u4zsNlz0A9EsDBEr2I+cOC1CRyvK96g4E1twYrmOB5sDitgDx1iqMOCISb3mQELandP4gz63QzDOw5AcMWCHM8QKYmJ67IMMsKxIJnl4ZCUZcZQjXPiYRwgq7sHh9h5xm3KcQGOA9g1mEA7xaW6luM1tB52u6EzeTrHGbjlPZmgWHuJu8RCHjk4V+7swT1T7sopCsjJDA+CZIqTB7dpofAhiH531rkHKsZv3Y3MSYBmcdXgGC4pNzUNw8HhC9wJnsojF3t/437KCUG0yzfcw7kQrob73v8ZjplhGOCBlZ3iqSwA/xs3j2BEBO5MfvoM3HaUYDmiwLzHHQkehqFmgSIOca1qRjREXVs3sg4sLkdMKXLk6aRpjKTh0VrVX9CErC8rTxjBi4YdOPCvQskzlP+8cAWOscK2Y6BrJLILjd33pSe5pEQBYEQMWujKSYBFCEJydU5l7Jm+4A2v/IYvJL5f6dVCr3zf7nGfYst/B78STnN4ffVq4nLmrRvvdOZxWkm3QAN2AvN7bVGKhOEQ6tSeUbOa0tpo+t2cXlxdFEjU9aw8LS0hkmlGBoWO1sUiUe7z7y8uGR4wSK6bNAktLCdzWeK6SeDpfe6CvLm6unTQYI2LjOQeF0x4HvdoPWNcxu1axU+Xlz/qdYmsUrCMgZuUlHHL4kbVG3eRUeuH9wWiohSwEiO3kRObI//yYQvlJvnZ++8Cu6JZMtMxlgtojIWB4Vmi+153ds/5+fkASaPcAlVThppr1bM8l085sGxe2bHr+758or4/FdBoov9ZPoOAKlPotq53m2y6rmx6F55+iDfox3vZ2vA/5k9whG9IrLbYbwAAAABJRU5ErkJggg==",
        // },
      ],
    };
  }

  componentDidMount() {
    this.getHomeApiAsync();
  }

  getHomeApiAsync = () => {
    return fetch(IP_ADDRESS + "/api/home")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson,
          spinner: false,
        });
      });
  };

  render() {
    const { isLoadingComplete, items, spinner } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    console.log(spinner);
    return (
      <React.Fragment>
        <Spinner
          visible={spinner}
          texContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <StatusBar backgroundColor="rgba(0,0,0,0.24)" animated />
        <View
          style={[
            layout.navBar,
            {
              justifyContent: "center",
              alignItems: "flex-end",
              paddingTop: 20,
            },
          ]}
        >
          <Image
            style={{ width: 140, height: 40 }}
            source={require("../../assets/images/logo_menuplzzz.png")}
          />
        </View>
        <StoreList items={items} />
      </React.Fragment>
    );
  }
  _loadAssetsAsync = async () => {
    return Promise.all([
      //Asset.loadAsync([require("../../assets/images/icon.png")]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.log(err);
  };

  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true,
    });
  };
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default Home;
