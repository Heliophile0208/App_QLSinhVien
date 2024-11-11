import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useNavigation
import database from "../../data/Appdata"; // Import dữ liệu sinh viên

export default function StudentListScreen() {
  const route = useRoute();
  const navigation = useNavigation();  // Khai báo useNavigation để điều hướng

  const { maLop } = route.params || {}; // Nếu route.params không có, sẽ trả về object rỗng
  console.log(route.params); // Kiểm tra giá trị của route.params
  console.log(maLop); // Kiểm tra maLop có được gán giá trị hợp lệ không

  // Lọc danh sách sinh viên theo mã lớp
  const sinhVienTheoLop = database.quanlysinhvien.sinh_vien.data.filter(
    (student) => student[7] === maLop
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Điều hướng về màn hình đăng nhập */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Image style={styles.backButton} source={require('../../data/images/back.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Danh sách sinh viên lớp {maLop}:</Text>

      {sinhVienTheoLop.length > 0 ? (
        sinhVienTheoLop.map((student, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.studentItem}
            onPress={() => navigation.navigate('sinhvien', { student })} 
          >
          <View key={index}>
            <Text style={styles.studentText}>
              {student[1]} - {student[6]}
            </Text>
          </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noStudentText}>
          Không có sinh viên trong lớp này.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: -10,
  },

  backButton: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },

  studentItem: {
    backgroundColor: "#eaf4fc",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  studentText: {
    fontSize: 16,
    color: "#333",
  },

  noStudentText: {
    fontSize: 16,
    color: "#ff4d4d",
    textAlign: "center",
    marginTop: 20,
  },
});
