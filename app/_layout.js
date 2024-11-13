import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { StudentProvider } from '../context/StudentContext';

export default function Layout() {
  const router = useRouter();
  const isLoggedIn = false; // Thay đổi điều này dựa trên trạng thái đăng nhập thực tế

  useEffect(() => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, điều hướng tới màn hình login
      router.replace('/LoginScreen');
    }
  }, [isLoggedIn]);

  return (
    // Bao bọc toàn bộ ứng dụng bằng StudentProvider
    <StudentProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Định nghĩa các màn hình của bạn */}
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sinhvien" />
      </Stack>
    </StudentProvider>
  );
}
