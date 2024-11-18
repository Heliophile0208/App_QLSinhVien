import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {  useNavigation } from "@react-navigation/native"; 
import database from "../../data/Appdata"; 
import { useStudent } from "../../context/StudentContext";

export default function StudentListScreen() {

  const navigation = useNavigation(); 

  const { maSinhVien } =useStudent();

  const student = database.quanlysinhvien.sinh_vien.data.find(
    (student) => student[0] === maSinhVien 
  );


  const maLop = student ? student[7] : null;

  const sinhVienTheoLop = maLop
    ? database.quanlysinhvien.sinh_vien.data.filter((student) => student[7] === maLop)
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>

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
            <View>
              <Text style={styles.studentText}>
                {student[1]} - {student[6]} {/*  */}
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
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,

  },
  backButton: {
    width: 30,
    height: 30,

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
