import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Header, Button, Card, CardSection, Input, Spinner, HomePageButton, HomePageSection } from './common';

const axios = require('axios');

class HomeScreen extends Component {
  static navigationOptions = {
    header: (
      <Header headerText="Vakufska Banka" />
    ),
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style={styles.homePage} >
      <HomePageSection>
        <HomePageButton src={require("../static/img/lock.png")} text="Login" nav="Login" navigate={this.props.navigation} />
        <HomePageButton src={require("../static/img/qr.png")} text="QR Plaćanje" nav="Login" navigate={this.props.navigation} />
      </HomePageSection>
      <HomePageSection>
        <HomePageButton src={require("../static/img/place.png")} text="Bankomat" nav="Login" navigate={this.props.navigation} />
        <HomePageButton src={require("../static/img/scan.png")} text="Sken Plaćcanje" nav="Login" navigate={this.props.navigation} />
      </HomePageSection>
      <HomePageSection>
        <HomePageButton src={require("../static/img/contact.png")} text="Kontakt" nav="Login" navigate={this.props.navigation} />
      </HomePageSection>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  iconStyle: {
    width: 60,
    height: 60,
  },
  card: {
    justifyContent: 'space-around',
    flexDirection: "row",
  },
  homePage: {
    backgroundColor: "#88ca5e",
    flex: 1
  }
});

export default HomeScreen;