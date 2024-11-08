import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Picker } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Import useRouter từ Expo Router
import database from "../data/Appdata"; // Dữ liệu thời khóa biểu của bạn

export default function ThoiKhoaBieu() {
  const thoiKhoaBieu = database.quanlysinhvien?.thoi_khoa_bieu;

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState({}); // Object để lưu ghi chú cho từng mục
  const [notificationTime, setNotificationTime] = useState("60"); // Mặc định là 60 phút (1 giờ)

  useEffect(() => {
    loadNotes();
    // Lấy quyền và cài đặt thông báo
    requestNotificationPermissions();
  }, []);

  const loadNotes = async () => {
    try {
      const notesData = await AsyncStorage.getItem("thoiKhoaBieuNotes");
      if (notesData) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.log("Error loading notes:", error);
    }
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Bạn cần cấp quyền để nhận thông báo");
    }
  };

  const handleSearch = () => {
    const results = thoiKhoaBieu.data.filter((item) => {
      const matchesClass = selectedClass ? item[1] === selectedClass : true;
      const matchesWeek = selectedWeek ? item[5].toString() === selectedWeek : true;
      return matchesClass && matchesWeek;
    });
    setFilteredData(results);
  };

  const scheduleNotification = (time, title, body, reminderTime) => {
    const triggerTime = new Date(time).getTime() / 1000; // Chuyển sang giây
    const notificationTime = triggerTime - reminderTime * 60; // Lên lịch thông báo trước `reminderTime` phút

    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        seconds: notificationTime - Math.floor(Date.now() / 1000), // Tính toán thời gian thông báo
        repeats: false,
      },
    });
  };

  const addNotificationForClass = (item) => {
    const startTime = `${item[6]}:${item[7]}`; // Lấy giờ bắt đầu môn học
    const title = `Đến giờ học: ${item[2]}`; // Tên môn học
    const body = `Lớp: ${item[1]} - Phòng: ${item[3]}`;

    const notificationTime = new Date(); // Tạo đối tượng thời gian
    notificationTime.setHours(parseInt(item[6]), parseInt(item[7]), 0); // Cài đặt giờ thông báo

    scheduleNotification(notificationTime, title, body, parseInt(notificationTime)); // Lên lịch thông báo
  };

  const addNote = (id, noteContent) => {
    const newNotes = { ...notes, [id]: noteContent };
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("thoiKhoaBieuNotes", JSON.stringify(newNotes));
    } catch (error) {
      console.log("Error saving notes:", error);
    }
  };

  const deleteNote = (id) => {
    const newNotes = { ...notes };
    delete newNotes[id];
    setNotes(newNotes);
    saveNotes(newNotes);
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

      <Button title="Tìm kiếm" onPress={handleSearch} />

      {/* Dropdown để chọn thời gian báo thức */}
      <Text>Chọn thời gian báo thức (phút):</Text>
      <Picker
        selectedValue={notificationTime}
        onValueChange={(itemValue) => setNotificationTime(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="15 phút trước" value="15" />
        <Picker.Item label="30 phút trước" value="30" />
        <Picker.Item label="1 giờ trước" value="60" />
        <Picker.Item label="2 giờ trước" value="120" />
      </Picker>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item[0].toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Thứ: {item[4]}</Text>
              <Text>Giờ: {item[6]} - {item[7]}</Text>
              <Text>Mã lớp: {item[1]}</Text>
              <Text>Mã môn: {item[2]}</Text>
              <Text>Phòng: {item[3]}</Text>

              {/* Input ghi chú */}
              <TextInput
                placeholder="Nhập ghi chú"
                value={notes[item[0]] || ""}
                onChangeText={(text) => addNote(item[0], text)}
                style={styles.noteInput}
              />

              {/* Nút xóa ghi chú */}
              {notes[item[0]] && (
                <TouchableOpacity onPress={() => deleteNote(item[0])}>
                  <Text style={styles.deleteNote}>Xóa ghi chú</Text>
                </TouchableOpacity>
              )}

              {/* Nút đặt thông báo */}
              <TouchableOpacity onPress={() => addNotificationForClass(item)}>
                <Text style={styles.notificationButton}>Đặt Báo Thức</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>Không có dữ liệu hiển thị</Text>
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
  noteInput: {
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  deleteNote: {
    color: "red",
    marginTop: 5,
  },
  notificationButton: {
    color: "#007BFF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});