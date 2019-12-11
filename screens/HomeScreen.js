import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { encode } from 'base-64';

const PUSH_REGISTRATION_ENDPOINT = 'https://test.backend.holliapp.com/api/v4/pushnotification';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
    };
  }

  static navigationOptions = {
    title: 'Pusher',
  };

    registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-authorization': '539169d340eda42d50c384efc2f9aa227eabcce7',
        'Authorization': 'Basic ' + encode('hollidev' + ":" + 'hollidev03847')
      },
      body: JSON.stringify({
        
          push_token: token,
          date: this.state.date,
          message: 'test message'
        
      }),
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //Setting the value of the date time
      date:
        year + '-' + month + '-' + date ,
    });

  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={{borderRadius: 5, backgroundColor: '#0069d9'}}>
        <TouchableOpacity
            style={styles.button}
            onPress={this._showAlert}>
            <Text style={{fontSize: 20, color: 'white',  padding: 15, borderRadius: 5}}>Send Push Message!</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }

  _showAlert = () => {
    Alert.alert(
      'Push Test',
      'Do you want to send a push message?',
      [
        {text: 'Not sure', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.registerForPushNotificationsAsync()},
      ],
      { cancelable: false }
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  button: {
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 14,
    color: '#fff'
  },
  label: {
    fontSize: 14
  }
});