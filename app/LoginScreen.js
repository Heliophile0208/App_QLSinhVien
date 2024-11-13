// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStudent } from '../context/StudentContext';  // Import useStudent
import database from '../data/Appdata';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { setMaSinhVien } = useStudent();  // Lấy setMaSinhVien từ context

  const handleLogin = () => {
    if (username === '' || pass === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập Tên người dùng và mật khẩu');
      return;
    }

    const tai_khoan = database.quanlysinhvien.tai_khoan.data;
    const user = tai_khoan.find(
      (account) => account[1] === username && account[2] === pass
    );

    if (!user) {
      Alert.alert('Thông báo', 'Tên Người Dùng hoặc mật khẩu không đúng');
    } else {
      const maSinhVien = user[4]; // Lấy mã sinh viên từ tài khoản


        setMaSinhVien(maSinhVien);  // Cập nhật maSinhVien trong context

        // Điều hướng đến trang chứa thông tin lớp và truyền maSinhVien
        navigation.navigate('(tabs)');  // Hoặc điều hướng đến màn hình bạn muốn

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.subtitle}>
        Vui lòng đăng nhập để có thể tiếp tục sử dụng dịch vụ
      </Text>

      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={pass}
          secureTextEntry={!showPassword}
          onChangeText={setPass}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            style={styles.img}
            source={showPassword
              ? require('../data/images/eye_open.png')
              : require('../data/images/eye_close.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Đăng Nhập" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    width: 24,
    height: 24,
    marginLeft: 8,
    tintColor: '#888',
  },
});
