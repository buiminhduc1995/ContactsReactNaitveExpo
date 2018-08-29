import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native'
let { height, width } = Dimensions.get('window')
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Odoo from 'react-native-odoo';
import Expo, { Constants } from 'expo';
export default class Nhantin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
      danhsach: [],
      danhsachchon: [],
      nguoigui: "",
      status: false,
      number: ''
    };
  }
  async Contact() {
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
    //console.log(contacts)
    const elapsed = (Date.now() - time) / 1000;
    // Alert.alert('Contacts Read', `Read ${contacts.data.length} contacts in ${elapsed} seconds`);
    if (this.state.status == true) {
      this.setState({ status: false })
    }
    else {
      this.setState({ status: true })
    }
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

    let danhsachdachon = danhsach.filter((item) => item.check);

    this.setState({ danhsach: danhsach, danhsachchon: danhsachdachon })
  }
  _showSelectedContact() {
    return this.state.danhsachchon.length;
  }
  Send() {
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
    // //Tạo giá trị
    //   odoo.create('bms.send_sms_xmlrpc', {
    //     title: 'title',
    //     brandname: 'SoLienLacDT',
    //     accent: 'True',
    //     content: this.state.text,
    //     phone: ,
    //   }, function (err, partners) {
    //     if (err) { return console.log(err); }
    //     console.log(partners);
    //   });
    console.log('Danh sách điện thoại')
    var mang_sdt = []
    let danhsachchon = this.state.danhsachchon
    for (i = 0; i < danhsachchon.length; i++) {
      if (danhsachchon[i].hasOwnProperty("phoneNumbers")) {
        mang_sdt.push(danhsachchon[i].phoneNumbers[0].number)
      } else {
        mang_sdt.push(danhsachchon[i]["number"])
      }
    }
    // for (i = 0; i<mang_sdt.length;i++)
    // {if (mang_sdt[i].slice(0,1) == 0 ) {console.log("84"+mang_sdt[i].slice(1))} else {console.log(mang_sdt[i].slice(1))}}
     for (i = 0; i<mang_sdt.length;i++)
    {if(mang_sdt[i].slice(0,1) == 0 )
       { const odoo = new Odoo({
        host: 'mysmsbrandname.com',
        port: 80,
        database: 'sms_bms',
        username: 'cs',
        password: '1'
      });
      // Connect to Odoo
      odoo.connect(function (err) {
        if (err) { return console.log(err); }
      });
    //Tạo giá trị
      odoo.create('bms.send_sms_xmlrpc', {
        title: 'title',
        brandname: 'SoLienLacDT',
        accent: 'True',
        content: this.state.text,
        phone: "84"+mang_sdt[i].slice(1),
      }, function (err, partners) {
        if (err) { return console.log(err); }
        console.log(partners);
      })} 
       else 
       { const odoo = new Odoo({
        host: 'mysmsbrandname.com',
        port: 80,
        database: 'sms_bms',
        username: 'cs',
        password: '1'
      });
      // Connect to Odoo
      odoo.connect(function (err) {
        if (err) { return console.log(err); }
      });
    //Tạo giá trị
      odoo.create('bms.send_sms_xmlrpc', {
        title: 'title',
        brandname: 'SoLienLacDT',
        accent: 'True',
        content: this.state.text,
        phone: mang_sdt[i].slice(1) ,
      }, function (err, partners) {
        if (err) { return console.log(err); }
        console.log(partners);
      })}
    }
    Alert.alert('Đã gửi tin nhắn')
  }
  _Remove(index, item) {
    let danhsachchon = this.state.danhsachchon
    danhsachchon.splice(index, 1);
    this.setState({ danhsachchon: danhsachchon })
  }
  AddNumber() {
    if (this.state.number.length >= 10) {
      let danhsachchon = [...this.state.danhsachchon, { number: this.state.number }]
      this.setState({ danhsachchon })
    } else { Alert.alert('Số điện thoại < 10 ký tự') }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text> Nhắn tin </Text>
          </View>
          <View style={styles.content}>
            <View style={{ marginTop: 10, borderBottomWidth: 0.5, borderBottomColor: 'black', justifyContent: 'space-between', flexDirection: 'row' }}>
              <TextInput
                onChangeText={(text) => this.setState({ number: text })}
                multiline={true}
                onSubmitEditing={() => this.AddNumber()}
                keyboardType="numeric"
                style={styles.InputNguoiNhan}
                underlineColorAndroid='transparent'
                placeholder="Nhập số điện thoại"
              />
              <TouchableOpacity onPress={() => this.Contact()} style={{ marginRight: 10, position: 'relative' }}>
                {this.state.status ? <MaterialIcons name="done" size={30} color="black" /> : <Ionicons name="md-contacts" size={30} color="black" />}
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "red", }}>
              {(this.state.danhsachchon.length > 0)
                ? (
                  <View>
                    <View>
                      <FlatList data={this.state.danhsachchon} horizontal={true} extraData={this.state} keyExtractor={(item, index) => item.recordID} renderItem={({ item, index }) => {
                        return <TouchableOpacity
                          onPress={() => this._Remove(index, item)}
                          style={{
                            paddingTop: 10
                          }}>
                          <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            padding: 2
                          }}>{item.firstName || item.number},
                      </Text>
                        </TouchableOpacity>
                      }} />

                    </View>
                  </View>
                )
                : null
              }
            </View>
            {this.state.status ? <FlatList
              style={{ width: width, height: 300, }}
              data={this.state.danhsach}
              keyExtractor={item => item.id}
              extraData={this.state}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.press(item)
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ecf0f1'
                  }}>
                  <View
                    style={{
                      flex: 3,
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    {item.check
                      ? (
                        <Text style={{
                          fontWeight: 'bold'
                        }}>{item.firstName}</Text>
                      )
                      : (
                        <Text>{item.firstName}</Text>
                      )}
                  </View>
                  <View>
                    {item.check
                      ? (
                        <Ionicons name="md-checkbox-outline" size={20} color="#1abc9c" />
                      )
                      : (
                        <Ionicons name="md-square-outline" size={20} color="#bdc3c7" />
                      )}
                  </View>
                </TouchableOpacity>
              )} /> : null}
            <View style={{ marginBottom: 10, borderTopWidth: 0.5, borderTopColor: 'black', }}>
              <TextInput
                underlineColorAndroid='transparent'
                placeholder="Nhập tin nhắn"
                {...this.props}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ text })
                }}
                onContentSizeChange={(event) => {
                  this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                style={[styles.InputTinNhan, { height: Math.max(35, this.state.height) }]}
                value={this.state.text}
              />
              <View style={{ position: 'relative', justifyContent: 'space-between', flexDirection: 'row', }}>
                <View><Text></Text></View>
                <View>
                  <TouchableOpacity onPress={() => this.Send()} style={{ marginRight: 10 }}>
                    <Ionicons name="md-send" size={30} color="black" />
                  </TouchableOpacity>
                  <Text>{this.state.text.length}/130</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  content: {
    flex: 8,
    backgroundColor: 'white',
    width: width,
    justifyContent: 'space-between'
  },
  InputTinNhan: {
    marginLeft: 10,
  },
  InputNguoiNhan: {
    marginLeft: 10,
    height: 50,
    width: 300,
  }
})
