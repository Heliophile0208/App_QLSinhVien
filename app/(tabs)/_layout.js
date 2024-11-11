import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useRoute } from '@react-navigation/native' // Để lấy params từ route

export default function _layout() {
  const route = useRoute(); // Lấy route hiện tại
  const { maSinhVien } = route.params || {}; // Lấy mã sinh viên từ params

  return (
    <Tabs initialRouteName="index" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      {/* Tab Trang chủ */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/home.png')} style={styles.img} />
        }}
      />

      {/* Tab Thời khóa biểu */}
      <Tabs.Screen
        name="thoikhoabieu"
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/list.png')} style={styles.img} />
        }}
      />

      {/* Tab Thông tin tài khoản, truyền maSinhVien vào params */}
      <Tabs.Screen
        name="thongtintaikhoan"
        initialParams={{ maSinhVien }} // Truyền mã sinh viên vào tham số
        options={{
          tabBarIcon: ({ color }) => <Image source={require('../../data/images/user.png')} style={styles.img} />
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