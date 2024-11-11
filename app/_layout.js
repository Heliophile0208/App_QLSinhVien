import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function _layout() {
  const router = useRouter();
  const isLoggedIn = false; 

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/LoginScreen'); // Điều hướng đến LoginScreen nếu chưa đăng nhập
    }
  }, [isLoggedIn]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sinhvien" />
    </Stack>
  );
}

