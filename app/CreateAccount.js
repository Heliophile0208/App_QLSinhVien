import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';  // Import useRouter từ expo-router
import database from '../data/Appdata'; // Import cơ sở dữ liệu của bạn

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [maSinhVien, setMaSinhVien] = useState("");  // Thêm state cho ma_sinh_vien
  const router = useRouter(); // Khởi tạo useRouter

  const handleCreateAccount = () => {

    // Kiểm tra mã sinh viên không được để trống
    if (!maSinhVien) {
      Alert.alert("Thông báo", "Mã sinh viên không thể để trống");
      return;
    }

    // Chuyển mã sinh viên về chữ thường để so sánh không phân biệt hoa thường
    const maSinhVienLower = maSinhVien.toLowerCase();

    // Kiểm tra nếu mã sinh viên đã tồn tại trong bảng sinh_vien
    const existingStudent = database.quanlysinhvien.sinh_vien.data.find(
      (student) => student[0].toLowerCase() === maSinhVienLower // Chuyển sinh viên trong cơ sở dữ liệu về chữ thường
    );

    if (!existingStudent) {
      Alert.alert("Thông báo", "Mã sinh viên không tồn tại");
      return;
    }

    // Kiểm tra nếu mã sinh viên đã được đăng ký trong bảng tai_khoan
    const existingStudentAccount = database.quanlysinhvien.tai_khoan.data.find(
      (account) => account[4].toLowerCase() === maSinhVienLower // Chuyển mã sinh viên trong tài khoản về chữ thường
    );

    if (existingStudentAccount) {
      Alert.alert(
        "Thông báo",
        "Mã sinh viên đã được đăng ký. Bạn có thể nhấn vào 'Quên mật khẩu' nếu bạn đã quên mật khẩu.",
        [
          {
            text: "Quên mật khẩu",
            onPress: () => router.push('ForgotPassword'), 
          },
          {
            text: "OK",
            style: "cancel",
          }
        ]
      );
      return;
    }

    // Kiểm tra nếu tên người dùng đã tồn tại trong bảng tai_khoan (chuyển tên người dùng về chữ thường)
    const existingUser = database.quanlysinhvien.tai_khoan.data.find(
      (account) => account[1].toLowerCase() === username.toLowerCase() 
    );

    if (existingUser) {
      Alert.alert("Thông báo", "Tên người dùng đã tồn tại");
      return;
    }

    // Tạo tài khoản mới
    const newId = database.quanlysinhvien.tai_khoan.data.length + 1;
    database.quanlysinhvien.tai_khoan.data.push([newId, username, password, email, maSinhVien]);

    console.log('Dữ liệu tài khoản sau khi thêm:', database.quanlysinhvien.tai_khoan.data); // Kiểm tra dữ liệu

    Alert.alert("Thông báo", "Tạo tài khoản thành công!");
    router.push('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('LoginScreen')}>
          <Image style={styles.backButton} source={require('../data/images/back.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Tạo Tài Khoản Mới</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Mã Sinh Viên"
        value={maSinhVien}
        onChangeText={setMaSinhVien}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
    marginLeft: -10,
  },  
  backButton: {
    width: 24,
    height: 24,
  },
  
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
