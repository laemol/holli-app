import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList, 
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

export default class App extends React.Component {

  state = {
    data: [1, 2, 3]
  }

  _getData = async () => {
    const url = 'https://backend.holliapp.com/api/basic/products';
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ 
          data: json 
        });
      });
  }

  componentDidMount() {
    this._getData();
  }

  _renderItem = ({item}) => (
    <View style={styles.itemImage}>
      <Image source={{ uri: item.img }} style={{ height: 200}} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
          title="Buy Now"
          backgroundColor="#f194ff"
          onPress={() => Alert.alert('GET MONEY!')}
        />
    </View>
  );

  render() {
    return (
      <FlatList 
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemImage: {
    marginTop: 3,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 24,
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
});
