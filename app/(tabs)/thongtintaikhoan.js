import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ThongTinTaiKhoan() {
    const route = useRoute();
    const { student } = route.params; 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông Tin Tài Khoản</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.detail}>Mã sinh viên: <Text style={styles.value}>{student[0]}</Text></Text>
                <Text style={styles.detail}>Họ tên: <Text style={styles.value}>{student[1]}</Text></Text>
                <Text style={styles.detail}>Ngày sinh: <Text style={styles.value}>{student[2]}</Text></Text>
                <Text style={styles.detail}>Giới tính: <Text style={styles.value}>{student[3] === 1 ? 'Nam' : 'Nữ'}</Text></Text>
                <Text style={styles.detail}>Địa chỉ: <Text style={styles.value}>{student[4]}</Text></Text>
                <Text style={styles.detail}>Email: <Text style={styles.value}>{student[5]}</Text></Text>
                <Text style={styles.detail}>Số điện thoại: <Text style={styles.value}>{student[6]}</Text></Text>
                <Text style={styles.detail}>Mã lớp: <Text style={styles.value}>{student[7]}</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f9fc",
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2c3e50",
        textAlign: 'center',
        marginBottom: 20,
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
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    detail: {
        fontSize: 18,
        marginBottom: 15,
        color: "#34495e",
    },
    value: {
        fontWeight: "bold",
        color: "#2980b9",
    },
});