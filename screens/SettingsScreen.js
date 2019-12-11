import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { StyleSheet } from 'react-native';
import { encode } from "base-64";

const PUSH_REGISTRATION_ENDPOINT = 'https://test.backend.holliapp.com/api/v4/pushnotification';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
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
        'Authorization': 'Basic ' + encode('hollidev' + ":" + 'hollidev03847'),
      },
      body: JSON.stringify({
        
          push_token: token,
          date: '2019-12-09',
          message: 'test message from work'
        
      }),
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    
  }

  render() {

    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Alert,
//   TouchableOpacity
// } from 'react-native';
// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';

// const PUSH_REGISTRATION_ENDPOINT = 'http://ddf558bd.ngrok.io/token';
// const MESSAGE_ENPOINT = 'http://ddf558bd.ngrok.io/message';

// export default class App extends React.Component {
//   state = {
//     notification: null,
//     messageText: ''
//   }

//   handleNotification = (notification) => {
//     this.setState({ notification });
//   }

//   handleChangeText = (text) => {
//     this.setState({ messageText: text });
//   }

//   sendMessage = async () => {
//     fetch(MESSAGE_ENPOINT, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: this.state.messageText,
//       }),
//     });
//     this.setState({ messageText: '' });
//   }

//   registerForPushNotificationsAsync = async () => {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     if (status !== 'granted') {
//       return;
//     }
//     let token = await Notifications.getExpoPushTokenAsync();
//     return fetch(PUSH_REGISTRATION_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token: {
//           value: token,
//         },
//         user: {
//           username: 'warly',
//           name: 'Dan Ward'
//         },
//       }),
//     });

//     this.notificationSubscription = Notifications.addListener(this.handleNotification);
//   }

//   componentDidMount() {
//     this.registerForPushNotificationsAsync();
//   }

//   renderNotification() {
//     return(
//       <View style={styles.container}>
//         <Text style={styles.label}>A new message was recieved!</Text>
//         <Text>{this.state.notification.data.message}</Text>
//       </View>
//     )
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           value={this.state.messageText}
//           onChangeText={this.handleChangeText}
//           style={styles.textInput}
//         />
//         <TouchableOpacity
//           style={styles.button}
//           onPress={this.sendMessage}
//         >
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//         {this.state.notification ?
//           this.renderNotification()
//         : null}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  button: {
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  label: {
    fontSize: 18
  }
});