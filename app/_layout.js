import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { StudentProvider } from '../context/StudentContext';

export default function Layout() {
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, điều hướng tới màn hình login
      router.replace('/LoginScreen');
    }
  }, [isLoggedIn]);

  return (
    
    <StudentProvider>
      <Stack screenOptions={{ headerShown: false }}>
    
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sinhvien" />
      </Stack>
    </StudentProvider>
  );
}
