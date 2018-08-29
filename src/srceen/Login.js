import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
        };
      }
    dangnhap = () => {
    var xhr = new XMLHttpRequest();
    var jsonResponse = "";
    xhr.open("POST", 'http://mysmsbrandname.com/api/auth', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.onreadystatechange = function() {
      //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var data = xhr.responseText;
        jsonResponse = JSON.parse(data);
        mytoken = jsonResponse.token;
        //Neu dang nhap thanh cong thi redirect den trang khac
        if (typeof mytoken !== 'undefined') {
            Alert.alert('Thông báo','Thành công');
        } else {
        Alert.alert('Thông báo','Vui lòng kiểm tra lại tên đăng nhập và mật khẩu');
        }
      }
    }

    //Truyen noi dung request
    var formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    xhr.send(formData);
  }

    render() {
        return (
            <View style={styles.container}>
                <Text> Login </Text>
                <TextInput 
                style={styles.TextInput} 
                placeholder="Username"
                onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput 
                style={styles.TextInput}
                placeholder="Password" 
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('QuenMk')}>
                    <Text>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.dangnhap()}>
                    <Text>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Router')}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput:{
        height: 50,
        width: 200,
        
    }
})
