import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, useNavigation } from 'expo-router'


export default function _layout() {
  const navigation = useNavigation();

  return (
   
    <Tabs initialRouteName="index" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen 
        name="index" 
        
        options={{  
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/home.png')} style={styles.img} />,
        }} 
      />
      
      <Tabs.Screen 
        name="thoikhoabieu" 
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/list.png')} style={styles.img} />,
        }} 
      />

      <Tabs.Screen 
        name="thongtintaikhoan" 
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/user.png')} style={styles.img} />,
        
        }} 
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
  }
})
