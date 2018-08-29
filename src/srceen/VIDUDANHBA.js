import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList,TextInput,Dimensions } from 'react-native';
import Expo, { Constants } from 'expo';
import {Ionicons,Entypo} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
let { height, width } = Dimensions.get('window')
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsach: [],
      checked:false,
    }
  }
  async Danhba() {
    const time = Date.now();
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') { return; }

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
      ],
      pageSize: 10000,
      pageOffset: 0,
    });
    this.setState({ danhsach: contacts.data })
    console.log(contacts)
    console.log(contacts.phoneNumbers[0].number)
    const elapsed = (Date.now() - time) / 1000;
    Alert.alert('Contacts Read', `Read ${contacts.data.length} contacts in ${elapsed} seconds`);
  }
  LuuMK(item,index){{this.setState({checked:!this.state.checked})}
  console.log(this.state.checked)
}
  render() {
    return (
      <View style={styles.container}>
        <Text>ABC</Text>
        <TextInput />
        <TouchableOpacity onPress={() => this.Danhba()}><Text>Chọn danh bạ</Text></TouchableOpacity>
        <FlatList
          data={this.state.danhsach}
          renderItem={({ item,index }) => (
          <View style={{flexDirection: 'row',width:width,height: 50,backgroundColor:"#6e6f72",marginTop:5,}}>
           <CheckBox checked={this.state.checked}
          checkedColor='white'
          containerStyle={{backgroundColor:null,borderWidth:0,}}
          onPress={()=>this.LuuMK()}
          />
          <Ionicons name="ios-contacts" size={30} color="white"/>
            <View style={{alignContent:'center'}}>
              <Text>{item.firstName}</Text>
              {/* <Text>{item.phoneNumbers[0].number == undefined ?item.firstName:item.phoneNumbers[0].number}</Text> */}
            </View>
          </View>
          )} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
