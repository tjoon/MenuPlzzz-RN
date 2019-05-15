import { Dimensions } from "react-native";

export const layout = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    width: "100%"
  },
  navBar: {
    flex: 0.1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: "#fff"
  }
};

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").width;
