import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, FlatList,TextInput,Dimensions } from 'react-native';
import Expo, { Constants } from 'expo';
import {Ionicons,Entypo,Icon} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Odoo from 'react-native-odoo';
let { height, width } = Dimensions.get('window')
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhsach: [],
      danhsachchon: [],
      nguoigui:""
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
    let danhsach = this.state.danhsach.map((item) => {
      if (item.id === hey.id) {
        item.check = !item.check
      }
      return {
        ...item
      }
    });
    
    let danhsachdachon = danhsach.filter((item)=>item.check);
    
    this.setState({danhsach: danhsach, danhsachchon: danhsachdachon})
  }
  _showSelectedContact() {
    return this.state.danhsachchon.length;
  }
  SEND(hey){
    let danhsachchon =this.state.danhsachchon
    for(i=0;i<danhsachchon.length;i++){console.log(danhsachchon[i].phoneNumbers[0].number)}
    //   const odoo = new Odoo({
    //     host: 'mysmsbrandname.com',
    //     port: 80,
    //     database: 'sms_bms',
    //     username: 'cs',
    //     password: '1'
    //   });
    //   // Connect to Odoo
    //   odoo.connect(function (err) {
    //     if (err) { return console.log(err); }
    //   });
    // //   //Tạo giá trị
    //   odoo.create('bms.send_sms_xmlrpc', {
    //     title: 'title',
    //     brandname: 'SoLienLacDT',
    //     accent: 'True',
    //     content: 'Ngu di xem it thoi',
    //     phone: danhsachchon[i].phoneNumbers[0].number,
    //   }, function (err, partners) {
    //     if (err) { return console.log(err); }
    //     console.log(partners);
    //   })
  }
  render() {
    return (
      <View>
        <Text>ABC</Text>
        <TouchableOpacity onPress={() => this.Danhba()}><Text>Chọn danh bạ</Text></TouchableOpacity>
        <FlatList
          style={{width:width,height: 300,}}
          data={this.state.danhsach}
          keyExtractor={item => item.id} 
          extraData={this.state}
          renderItem={({ item}) => (
          <TouchableOpacity 
          onPress={() => {
          this.press(item)
          }}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: '#ecf0f1'}}>
          <View
          style={{
            flex: 3,
            alignItems: 'flex-start',
            justifyContent: 'center'}}>
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
                    <Ionicons name="md-checkbox-outline" size={20} color="#1abc9c"/>
                  )
                  : (
                    <Ionicons name="md-square-outline" size={20} color="#bdc3c7"/>
                  )}
          </View>
          </TouchableOpacity>
          )} />
         {/* Hết flatlist danh bạ */}
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
                  }} onPress={() => this.SEND()}>

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
