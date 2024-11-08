import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import database from "../../data/Appdata";

export default function Thoikhoabieu() {
  const thoiKhoaBieu = database.quanlysinhvien?.thoi_khoa_bieu;
  
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState({}); // Object để lưu ghi chú cho từng mục
  
  useEffect(() => {
    loadNotes();
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

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("thoiKhoaBieuNotes", JSON.stringify(newNotes));
    } catch (error) {
      console.log("Error saving notes:", error);
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

  const addNote = (id, noteContent) => {
    const newNotes = { ...notes, [id]: noteContent };
    setNotes(newNotes);
    saveNotes(newNotes);
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
              
              <TextInput
                placeholder="Nhập ghi chú"
                value={notes[item[0]] || ""}
                onChangeText={(text) => addNote(item[0], text)}
                style={styles.noteInput}
              />

              {notes[item[0]] && (
                <TouchableOpacity onPress={() => deleteNote(item[0])}>
                  <Text style={styles.deleteNote}>Xóa ghi chú</Text>
                </TouchableOpacity>
              )}
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
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});