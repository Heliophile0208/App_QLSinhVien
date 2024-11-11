import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import database from "../../data/Appdata"; // Giả sử bạn đã import cơ sở dữ liệu

export default function ThongTinTaiKhoan() {
    const route = useRoute();
    const { maSinhVien } = route.params; // Lấy mã sinh viên từ params

    // Tìm thông tin sinh viên
    const student = database.quanlysinhvien.sinh_vien.data.find(
        (student) => student[0] === maSinhVien[0] // Tìm sinh viên theo mã sinh viên
    );

    // Lọc điểm của sinh viên từ bảng diem
    const studentScores = database.diem.data.filter(
        (score) => score[1] === maSinhVien[0] // Lọc các điểm có mã sinh viên tương ứng
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thông Tin Tài Khoản</Text>
            </View>
            
            <View style={styles.detailContainer}>
                <Text style={styles.sectionTitle}>Thông Tin Sinh Viên</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Mã sinh viên:</Text>
                    <Text style={styles.value}>{student[0]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Họ tên:</Text>
                    <Text style={styles.value}>{student[1]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Ngày sinh:</Text>
                    <Text style={styles.value}>{student[2]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Giới tính:</Text>
                    <Text style={styles.value}>{student[3] === 1 ? 'Nam' : 'Nữ'}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <Text style={styles.value}>{student[4]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{student[5]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <Text style={styles.value}>{student[6]}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Mã lớp:</Text>
                    <Text style={styles.value}>{student[7]}</Text>
                </View>

                {/* Hiển thị điểm của sinh viên */}
                <Text style={styles.sectionTitle}>Kết Quả Học Tập</Text>
                {studentScores.length > 0 ? (
                    studentScores.map((score, index) => (
                        <View key={index} style={styles.scoreItem}>
                            <Text style={styles.scoreText}>Môn: <Text style={styles.value}>{score[2]}</Text></Text>
                            <Text style={styles.scoreText}>Điểm: <Text style={styles.value}>{score[3]}</Text></Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noScoreText}>Chưa có điểm</Text>
                )}
            </View>

            {/* Optional: Thêm nút quay lại trang chính */}
            <TouchableOpacity style={styles.backButton} onPress={() => route.params.navigation.goBack()}>
                <Text style={styles.backButtonText}>Quay lại</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        padding: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2c3e50",
        textAlign: 'center',
    },
    detailContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2c3e50",
        marginTop: 20,
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#34495e",
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#2980b9",
    },
    scoreItem: {
        backgroundColor: "#ecf0f1",
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
    },
    scoreText: {
        fontSize: 16,
        color: "#34495e",
    },
    noScoreText: {
        fontSize: 16,
        color: "#e74c3c",
        textAlign: "center",
        marginTop: 20,
    },
    backButton: {
        backgroundColor: "#2980b9",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "bold",
    },
});