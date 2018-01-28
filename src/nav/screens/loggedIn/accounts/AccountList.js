import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { connect } from "react-redux";
import moment from "moment";

import { setAccount, loadTransactions } from "../../../../reducers/user/actions";

import { Header, Card, CardSection } from "../../../../components/common";
import AccountBalance from "../../../../components/common/accounts/AccountBalance";
import AccountName from "../../../../components/common/accounts/AccountName";
import TransactionsList from "../../../../components/common/accounts/TransactionsList";
import AccountListItem from "../../../../components/common/accounts/AccountListItem";


class AccountList extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Računi',
    drawerIcon: () => (
      <Image
        source={require('../../../../static/img/logo.png')}
        style={[styles.icon]}
      />
    ),
  };

  onButtonPress(account) {
    this.props.setAccount(account).then(() => {
      if (!account.transactionList) {
        let start = new moment().date(1);
        let end = new moment();
        this.props.loadTransactions(start, end, account).then(() => {
          this.props.navigation.navigate("Account");
        });
      } else {
        this.props.navigation.navigate("Account");
      }
    }); 
  }

  render() {
    return (
      <View style={styles.body}>
      <Header headerText="Računi">
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DrawerOpen")}>
          <Image
            style={styles.drawerMenu}
            source={require("../../../../static/img/drawer-menu.png")}
          />
        </TouchableOpacity>
      </Header>
      <ScrollView style={{ marginTop: 20 }}>
        {this.props.accounts.map((account, index) => {
          return  <AccountListItem 
                    key={index} 
                    account={account}
                    navigate={this.onButtonPress.bind(this)}
                  />
        })}
      </ScrollView>
      </View>
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
    accounts: state.user.accounts,
    selectedAccount: state.user.account
  };
};

export default connect(mapStateToProps, { setAccount, loadTransactions })(AccountList);