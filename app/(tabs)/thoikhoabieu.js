import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import database from "../../data/Appdata";

export default function Thoikhoabieu() {
  const thoiKhoaBieu = database.quanlysinhvien?.thoi_khoa_bieu;

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    const results = thoiKhoaBieu.data.filter((item) => {
      const matchesClass = selectedClass ? item[1] === selectedClass : true; // Nếu không có mã lớp thì không lọc theo lớp
      const matchesWeek = selectedWeek ? item[5].toString() === selectedWeek : true; // Nếu không có tuần thì không lọc theo tuần
      return matchesClass && matchesWeek;
    });
    setFilteredData(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời Khóa Biểu</Text>

      <TextInput
        placeholder="Nhập mã lớp"
        value={selectedClass}
        onChangeText={setSelectedClass}
        style={styles.input}
      />

      <TextInput
        placeholder="Nhập tuần (ví dụ: 1)"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button
        title="Tìm kiếm"
        onPress={handleSearch}
      />

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item[0].toString()} // Sử dụng id làm key
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Thứ: {item[4]}</Text>
              <Text>
                Giờ: {item[6]} - {item[7]}
              </Text>
              <Text>Mã lớp: {item[1]}</Text>
              <Text>Mã môn: {item[2]}</Text>
              <Text>Phòng: {item[3]}</Text>
            </View>
          )}
        />
      ) : (
        (selectedClass || selectedWeek) ? (
          <Text style={styles.noData}>Không có dữ liệu hiển thị</Text>
        ) : null
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});