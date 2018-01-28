import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusWrapper } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import { connect } from "react-redux";

import { Header, Card, CardSection } from "../../../../components/common";
import AccountBalance from "../../../../components/common/accounts/AccountBalance";
import AccountName from "../../../../components/common/accounts/AccountName";
import TransactionsList from "../../../../components/common/accounts/TransactionsList";
import {
  selectTransaction, loadTransactions
} from "../../../../reducers/user/actions";
import {
  loading, loadingSuccess
} from "../../../../reducers/app/actions";

class Account extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Računi',
    drawerIcon: () => (
      <Image
        source={require("../../../../static/img/logo.png")}
        style={[styles.icon]}
      />
    ),
  };

  setDate(type: "start" | "end") {
    switch (type) {
      case "start":
        return (date) => {
          this.props.loadTransactions(date, this.props.account.transactionList.end, this.props.account);
        };
      case "end":
        return (date) => {
          this.props.loadTransactions(this.props.account.transactionList.start, date, this.props.account);
        };
    }
  }

  render() {
  const account = this.props.account;
  console.log(this.props.transactionList);
  const { start, end, list } = this.props.transactionList;
    return (
      <ScrollView style={styles.body}>
      <Header headerText="Računi">
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                  <Image
                    style={styles.drawerMenu}
                    source={require("../../../../static/img/drawer-menu.png")}
                  />
                </TouchableOpacity>
              </Header>
       <View style={styles.body}>
        <Card>
          <CardSection>
            <AccountBalance navigate={this.props.navigation.navigate} account={account}/>
          </CardSection>
          <CardSection>
            <TransactionsList
              navigate={this.props.navigation.navigate}
              start={start.format("DD.MM.YYYY")}
              end={end.format("DD.MM.YYYY")}
              transactionList={list}
              account={account}
              selectTransaction={this.props.selectTransaction}
              setStartDate={this.setDate("start").bind(this)}
              setEndDate={this.setDate("end").bind(this)}
            />
          </CardSection>
        </Card>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E2F2D9",
    flex: 1
  },
  icon: {
    width: 10,
    height: 10,
  },
  drawerMenu: {
    width: 40,
    height: 40
  }
});

const mapStateToProps = state => {
  return {
    account: state.user.account,
    transactionList: state.user.account.transactionList,
    isLoading: state.user.isLoading
  };
};

export default connect(mapStateToProps, { 
  selectTransaction, 
  loadTransactions,
  loading,
  loadingSuccess })(Account);