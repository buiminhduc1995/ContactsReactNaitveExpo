import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput,TouchableOpacity } from 'react-native'

export default class QuenMk extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Quên mật khẩu </Text>
        <TextInput style={styles.TextInput} placeholder="Username"/>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Text>Lấy mật khẩu</Text></TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput:{
    width: 200,
    height: 50,
  }
})
