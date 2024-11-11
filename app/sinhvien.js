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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("(tabs)")}>  
          <Image
            style={styles.backButton}
            source={require("../data/images/back.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={{textAlign:'center',fontSize:20,color:'red'}}>Thông tin chi tiết sinh viên</Text>
      <View style={styles.infoContainers}>
        <Text style={styles.detail}>Tên: { student[1] }</Text>
        <Text style={styles.detail}>Ngày sinh: { student[2] }</Text>
        <Text style={styles.detail}>Giới tính: { student[3]  === 1 ? 'Nam' : 'Nữ' } </Text>
        <Text style={styles.detail}>Địa chỉ: { student[4] }</Text>
        <Text style={styles.detail}>Email: { student[5] }</Text>
        <Text style={styles.detail}>SDT: { student[6] }</Text>
        <Text style={styles.detail}>Mã lớp: { student[7] }</Text>
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
  infoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: "#333",
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    color: "#555",
  },
});