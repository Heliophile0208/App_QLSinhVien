import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import database from '../../data/Appdata';  

export default function ThongTinTaiKhoan({ maSinhVien }) {
  
  // Tìm sinh viên trong cơ sở dữ liệu dựa trên ma_sinh_vien
  const student = database.quanlysinhvien.sinh_vien.data.find(
    (student) => student[0] === maSinhVien
  );


  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy thông tin sinh viên!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin tài khoản sinh viên</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.detail}>Tên: {student[1]}</Text>
        <Text style={styles.detail}>Ngày sinh: {student[2]}</Text>
        <Text style={styles.detail}>Giới tính: {student[3] === 1 ? 'Nam' : 'Nữ'}</Text>
        <Text style={styles.detail}>Địa chỉ: {student[4]}</Text>
        <Text style={styles.detail}>Email: {student[5]}</Text>
        <Text style={styles.detail}>Số điện thoại: {student[6]}</Text>
        <Text style={styles.detail}>Mã lớp: {student[7]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    marginVertical: 8,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
