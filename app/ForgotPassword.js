import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import database from '../data/Appdata';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordReset = () => {
    const accountIndex = database.quanlysinhvien.tai_khoan.data.findIndex(
      (account) => account[1] === username
    );

    if (accountIndex === -1) {
      Alert.alert("Thông báo", "Tên người dùng không tồn tại");
      return;
    }

    database.quanlysinhvien.tai_khoan.data[accountIndex][2] = newPassword;
    Alert.alert("Thông báo", "Đặt lại mật khẩu thành công!");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image style={styles.backButton} source={require('../data/images/back.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Đặt lại mật khẩu" onPress={handlePasswordReset} />
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
});
