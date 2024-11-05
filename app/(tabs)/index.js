import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import database from "../../data/Appdata";

export default function Index() {
  const navigation = useNavigation();
  const { sinh_vien } = database.quanlysinhvien;

  const handleStudentPress = (student) => {
    navigation.navigate('sinhvien', { student });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Image
            style={styles.backButton}
            source={require("../../data/images/back.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Danh sách sinh viên:</Text>
      <View style={styles.studentListContainer}>
        {sinh_vien.data.map((student, index) => (
          <TouchableOpacity onPress={() => handleStudentPress(student)} key={index} style={styles.studentItem}>
            <Text style={styles.studentText}>
              {student[1]} - {student[6]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  studentListContainer: {
    marginTop: 10,
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
});
