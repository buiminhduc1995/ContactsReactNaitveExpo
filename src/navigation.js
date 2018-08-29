import React, {Component} from 'react';
import Login from './srceen/Login'
import Dangky from './srceen/Dangky'
import QuenMk from './srceen/QuenMk'
import Gioithieu from './srceen/Gioithieu'
import Nhantin from './srceen/Nhantin'
import Tintuc from './srceen/Tintuc'
import Trangchu from './srceen/Trangchu'
import {TabNavigator,StackNavigator,DrawerNavigator} from 'react-navigation'
import {Ionicons,Entypo} from '@expo/vector-icons';

const Router = TabNavigator({
    Trangchu:{
        screen:Trangchu,
        navigationOptions: {
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({tintColor}) => <Entypo name="home" size={20} color="white"/>
          }},
    Nhantin:{
        screen:Nhantin,
        navigationOptions: {
            tabBarLabel: 'Nhắn tin',
            tabBarIcon: ({tintColor}) => <Entypo name="message" size={20} color="white"/>
          }},
    Tintuc:{
        screen:Tintuc,
        navigationOptions: {
            tabBarLabel: 'Tin tức',
            tabBarIcon: ({tintColor}) => <Entypo name="news" size={20} color="white"/>
          }},
    Gioithieu:{
        screen:Gioithieu,
        navigationOptions: {
            tabBarLabel: 'Giới thiệu',
            tabBarIcon: ({tintColor}) => <Ionicons name="md-help-buoy" size={20} color="white"/>
          }},
},{ 
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#124c7d'
      },
      labelStyle: {
        fontSize: 6,
        color: "white"
      },
      showIcon: true,
      showLabel:true,
      inactiveTintColor: 'white',
      activeTinColor: '#1e67a6'
    }
  })
  const Stack = StackNavigator({
    Login:{screen:Login},
    Dangky:{screen:Dangky},
    QuenMk:{screen:QuenMk},
    Router:{screen:Router},
  },{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   })
   const Drawer=DrawerNavigator({
    Stack:{screen:Stack},
    Router:{screen:Router}
  })
export default Stack