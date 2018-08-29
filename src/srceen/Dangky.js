import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput,TouchableOpacity } from 'react-native'

export default class Dangky extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Đăng ký </Text>
        <TextInput style={styles.TextInput} placeholder="Username"/>
        <TextInput style={styles.TextInput} placeholder="Email"/>
        <TextInput style={styles.TextInput} placeholder="Password"/>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Text>Đăng ký</Text></TouchableOpacity>
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
