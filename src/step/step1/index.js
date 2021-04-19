import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";


class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nextStep = this.nextStep.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    console.log(this.props);
    return (
      <View >
        <Text> Step 1 </Text>
        <View>
          <TouchableOpacity onPress={this.nextStep}>
            <Text>Next</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

export default step1;
