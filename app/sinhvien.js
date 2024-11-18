import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

export default function SinhVien() {
  const navigation = useNavigation();
  const router = useRoute();
  const student = router.params?.student || [];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("(tabs)")}>
          <Image
            style={styles.backButton}
            source={require("../data/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Thông tin chi tiết sinh viên</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.detailLabel}>Tên: <Text style={styles.detail}>{student[1]}</Text></Text>
        <Text style={styles.detailLabel}>Ngày sinh: <Text style={styles.detail}>{student[2]}</Text></Text>
        <Text style={styles.detailLabel}>Giới tính: <Text style={styles.detail}>{student[3] === 1 ? 'Nam' : 'Nữ'}</Text></Text>
        <Text style={styles.detailLabel}>Địa chỉ: <Text style={styles.detail}>{student[4]}</Text></Text>
        <Text style={styles.detailLabel}>Email: <Text style={styles.detail}>{student[5]}</Text></Text>
        <Text style={styles.detailLabel}>SDT: <Text style={styles.detail}>{student[6]}</Text></Text>
        <Text style={styles.detailLabel}>Mã lớp: <Text style={styles.detail}>{student[7]}</Text></Text>
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
    paddingBottom: 15,

  },
  backButton: {
    width: 30,
    height: 30,

  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop:40,
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
    fontWeight: "600",
  },
  detail: {
    fontSize: 16,
    color: "#555",
    fontWeight: "400",
  },
});
