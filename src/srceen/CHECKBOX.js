import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList,TextInput,Dimensions } from 'react-native';
import Expo, { Constants } from 'expo';
import {Ionicons,Entypo,Icon} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
let { height, width } = Dimensions.get('window')
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsach: [],
      checked:false,
      danhsachchon: []
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
    this.setState({ danhsach: contacts.data.sort() })
    console.log(contacts)
    const elapsed = (Date.now() - time) / 1000;
    Alert.alert('Contacts Read', `Read ${contacts.data.length} contacts in ${elapsed} seconds`);
  }
  press = (hey) => {
    Alert.alert(hey.firstName)
    this.state.danhsach.map((item) => {
      if (item.recordID === hey.recordID) {
        item.check = !item.check
        if (item.check === true) {
          this.state.danhsachchon.push(item);
          console.log('selected:' + item.firstName);
        } else if (item.check === false) {
          const i = this.state.danhsachchon.indexOf(item)
          if (1 != -1) {
            this.state.danhsachchon.splice(i, 1)
            console.log('unselect:' + item.firstName)
            return this.state.danhsachchon
          }
        }
      }
    })
    this.setState({danhsach: this.state.danhsach})
  }
  _showSelectedContact() {
    return this.state.danhsachchon.length;
  }
  render() {
    return (
      <View>
        <Text>ABC</Text>
        <TextInput />
        <TouchableOpacity onPress={() => this.Danhba()}><Text>Chọn danh bạ</Text></TouchableOpacity>
        <FlatList
          style={{width:width,height: 100,}}
          data={this.state.danhsach}
          keyExtractor={item => item.recordID} 
          extraData={this.state}
          renderItem={({ item,index }) => (
          <TouchableOpacity 
          onPress={() => {
          this.press(item,index)
          }}
          style={{flexDirection: 'row',width:width,height: 50,backgroundColor:"#6e6f72",marginTop:5,}}>
          <View>
          {item.check
                  ? (
                    <Text style={{
                      fontWeight: 'bold'
                    }}>{`${item.firstName}`}</Text>
                  )
                  : (
                    <Text>{`${item.firstName}`}</Text>
                  )}
          </View>
          <View>
          {item.check
                  ? (
                    <Ionicons name="md-square-outline" size={20} color="white"/>
                  )
                  : (
                    <Ionicons name="md-checkbox-outline" size={20} color="white"/>
                  )}
          </View>
          </TouchableOpacity>
          )} />
          <View>
          {(this.state.danhsachchon.length > 0)
            ? (
              <View>
                <View>
                  <FlatList data={this.state.danhsachchon} horizontal={true} extraData={this.state} keyExtractor={(item, index) => item.recordID} renderItem={({item, index}) => {
                    return <View style={{
                      paddingTop: 10
                    }}>
                      <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        padding: 2
                      }}>{`${item.firstName},`}
                      </Text>
                    </View>
                  }}/>

                </View>
                <View>
                  <TouchableOpacity style={{
                    padding: 10
                  }} onPress={() => Alert.alert('Message sent :)')}>

                    <Ionicons name="md-checkbox-outline" size={20} color="white"/>
                  </TouchableOpacity>
                </View>
              </View>
            )
            : null
}
        </View>
     
     

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
