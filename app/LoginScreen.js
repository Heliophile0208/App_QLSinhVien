import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import database from "../data/Appdata";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

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
      navigation.navigate("(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 40, marginLeft: -10 }}></View>
      <View style={{ flex: 6, marginTop: -40 }}>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: "blue" }}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={{ color: "blue" }}>Tạo tài khoản?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Đăng Nhập" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 3,
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  required: {
    color: "red",
  },
  textinput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
  img: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
