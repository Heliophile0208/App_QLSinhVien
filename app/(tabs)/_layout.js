import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs, useNavigation } from 'expo-router';

export default function _layout() {
  const navigation = useNavigation();

  return (
    <Tabs initialRouteName="index" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen 
        name="index" 
        options={{  
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Image source={require('../../data/images/home.png')} style={styles.img} />
              <Text style={styles.label}>Trang Chủ</Text>
            </View>
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="thoikhoabieu" 
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Image source={require('../../data/images/list.png')} style={styles.img} />
              <Text style={styles.label}>Thời Khóa Biểu</Text>
            </View>
          ),
        }} 
      />

      <Tabs.Screen 
        name="thongtintaikhoan" 
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Image source={require('../../data/images/user.png')} style={styles.img} />
              <Text style={styles.label}>Thông Tin</Text>
            </View>
          ),
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    alignItems: 'center', 
  },
  label: {
    fontSize: 10,  
    marginTop: 4,  
    color: 'black', 
  }
});
