// LoginScreen.js
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import database from "../data/Appdata";
import { useStudent } from "../StudentContext"; // Import useStudent

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { setMaSinhVien } = useStudent(); // Lấy setMaSinhVien từ context

  const handleLogin = () => {
    if (username === "" || pass === "") {
      Alert.alert("Thông báo", "Vui lòng nhập Tên người dùng và mật khẩu");
      return;
    }

    // Lấy dữ liệu tài khoản từ database
    const tai_khoan = database.quanlysinhvien.tai_khoan.data;
    const user = tai_khoan.find(
      (account) => account[1] === username && account[2] === pass
    );

    if (!user) {
      Alert.alert("Thông báo", "Tên Người Dùng hoặc mật khẩu không đúng");
    } else {
      const maSinhVien = user[4]; // Lấy mã sinh viên từ tài khoản

      // Tìm sinh viên trong bảng sinh_vien dựa vào maSinhVien
      const student = database.quanlysinhvien.sinh_vien.data.find(
        (student) => student[0] === maSinhVien
      );

      if (student) {
        setMaSinhVien(maSinhVien); // Lưu maSinhVien vào context
        navigation.navigate("(tabs)", { screen: "index" }); // Điều hướng đến trang index
      } else {
        Alert.alert("Thông báo", "Không tìm thấy thông tin sinh viên.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.subtitle}>
        Vui lòng đăng nhập để có thể tiếp tục sử dụng dịch vụ
      </Text>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Tên Người Dùng</Text>
        <Text style={styles.required}> *</Text>
      </View>

      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Mật Khẩu</Text>
        <Text style={styles.required}> *</Text>
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
            source={
              showPassword
                ? require("../data/images/eye_open.png")
                : require("../data/images/eye_close.png")
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.linkText}>Tạo tài khoản?</Text>
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
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  required: {
    color: "red",
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  img: {
    width: 24,
    height: 24,
    marginLeft: 8,
    tintColor: "#888",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  linkText: {
    color: "blue",
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
});