import React, { Component } from "react";
import { WebView } from "react-native";

class WebScreen extends Component {
  render() {
    const siteUrl = this.props._siteUrl;
    console.log(this.props);
    return <WebView source={{ uri: siteUrl }} style={{ marginTop: 20 }} />;
  }
}

export default WebScreen;
