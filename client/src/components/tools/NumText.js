"use strict";

import React, { Component } from "react";
import { Text } from "react-native";

export default class NumText extends Component {
  constructor(props) {
    super(props);
    // Put your default font styles here.
    this.style = [
      {
        fontFamily: "Teko-Bold",
        fontSize: 17,
        color: "black",
      },
    ];
    if (props.style) {
      if (Array.isArray(props.style)) {
        console.log("numstyle color:", this.style.color);
        this.style = this.style.concat(props.style);
      } else {
        this.style.push(props.style);
      }
    }
  }

  render() {
    return (
      <Text {...this.props} style={this.style}>
        {this.props.children}
      </Text>
    );
  }
}
