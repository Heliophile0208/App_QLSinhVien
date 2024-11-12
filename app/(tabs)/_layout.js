import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { StudentProvider } from '../context/StudentContext'; // Import StudentProvider

export default function _layout() {
  return (
    // Bao bọc Tabs trong StudentProvider
    <StudentProvider>
      <Tabs initialRouteName="index" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        {/* Tab Trang chủ */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Image source={require('../../data/images/home.png')} style={styles.img} />,
          }}
        />

        {/* Tab Thời khóa biểu */}
        <Tabs.Screen
          name="thoikhoabieu"
          options={{
            tabBarIcon: ({ color }) => <Image source={require('../../data/images/list.png')} style={styles.img} />,
          }}
        />

        {/* Tab Thông tin tài khoản */}
        <Tabs.Screen
          name="thongtintaikhoan"
          options={{
            tabBarIcon: ({ color }) => <Image source={require('../../data/images/user.png')} style={styles.img} />,
          }}
        />
      </Tabs>
    </StudentProvider>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
  },
});