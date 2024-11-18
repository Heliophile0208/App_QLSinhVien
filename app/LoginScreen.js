import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStudent } from "../context/StudentContext"; // Import useStudent
import database from "../data/Appdata";

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

    const tai_khoan = database.quanlysinhvien.tai_khoan.data;
    const user = tai_khoan.find(
      (account) => account[1] === username && account[2] === pass
    );

    if (!user) {
      Alert.alert("Thông báo", "Tên Người Dùng hoặc mật khẩu không đúng");
    } else {
      const maSinhVien = user[4]; // Lấy mã sinh viên từ tài khoản

      setMaSinhVien(maSinhVien); // Cập nhật maSinhVien trong context

      // Điều hướng đến trang chứa thông tin lớp và truyền maSinhVien
      navigation.navigate("(tabs)"); // Hoặc điều hướng đến màn hình bạn muốn
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../data/images/logo.png")}
        />
      </View>

      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.subtitle}>
        Vui lòng đăng nhập để có thể tiếp tục sử dụng dịch vụ
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            style={styles.eyeIcon}
            source={
              showPassword
                ? require("../data/images/eye_open.png")
                : require("../data/images/eye_close.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.registerText}>Quên Mật Khẩu?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.registerText}>Chưa Có Tài Khoản?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
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
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    tintColor: "#888",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
