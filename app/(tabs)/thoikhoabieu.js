import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import database from "../../data/Appdata"; // Simulated database

export default function Thoikhoabieu() {
  const thoiKhoaBieu = database.quanlysinhvien.thoi_khoa_bieu;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedNamHoc, setSelectedNamHoc] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data); 
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // Lấy tên phòng
  const getRoomName = (roomId) => {
    const room = database.phong_hoc.find(room => room.ma_phong_hoc === roomId);
    return room ? room.ten_phong : "Không xác định"; // Return the room name or default text if not found
  };

  // Lấy năm học từ thời khoá biểu
  const namHocOptions = [...new Set(thoiKhoaBieu.data.map(item => item[8]))]; 
  
  // Lọc dữ liệu
  const handleSearch = () => {
    const results = thoiKhoaBieu.data.filter(item => {
      const matchesClass = selectedClass ? item[1] === selectedClass : true;
      const matchesWeek = selectedWeek ? item[5].toString() === selectedWeek : true;
      const matchesNamHoc = selectedNamHoc ? item[8] === selectedNamHoc : true; 
      return matchesClass && matchesWeek && matchesNamHoc;
    });
    setFilteredData(results);
  };

  // Thêm ghi chú hoặc chỉnh sửa ghi chú
  const handleAddOrEditNote = (id) => {
    setCurrentNoteId(id);
    const existingNote = notes.find(note => note.ma_tkb === id);

    if (existingNote) {
      setCurrentNoteTitle(existingNote.title);
      setCurrentNoteContent(existingNote.content);
    } else {
      setCurrentNoteTitle("");
      setCurrentNoteContent("");
    }

    setModalVisible(true); // Mở Modal
  };

  // Lưu ghi chú
  const handleSaveNote = () => {
    if (currentNoteId) {
      const newNote = {
        ma_ghi_chu: Date.now().toString(),
        ma_tkb: currentNoteId, 
        title: currentNoteTitle,
        content: currentNoteContent,
        created_at: new Date().toISOString(),
      };

      const updatedNotes = notes.filter(note => note.ma_tkb !== currentNoteId); // Remove old note
      updatedNotes.push(newNote); // Add new or updated note
      setNotes(updatedNotes);
      database.quanlysinhvien.notes.data = updatedNotes; // Lưu vào database

      console.log("Note saved:", newNote);

      setModalVisible(false); // Đóng Modal sau khi lưu
    }
  };

  // Xoá ghi chú
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.ma_tkb !== id);

    setNotes(updatedNotes);
    database.quanlysinhvien.notes.data = updatedNotes; // Lưu vào database

    console.log("Note deleted for timetable ID:", id);

    setModalVisible(false); // Đóng Modal sau khi xóa
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời Khóa Biểu</Text>

      {/* Lọc theo lớp và tuần */}
      <TextInput
        style={styles.input}
        placeholder="Nhập mã lớp"
        value={selectedClass}
        onChangeText={setSelectedClass}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tuần"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
        keyboardType="numeric"
      />

      {/* Modal cho Năm Học */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>{selectedNamHoc || "Chọn năm học"}</Text>
      </TouchableOpacity>

      {/* Modal cho Năm Học */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollView}>
              {/* Input cho ghi chú */}
              <TextInput
                style={styles.input}
                placeholder="Tiêu đề ghi chú"
                value={currentNoteTitle}
                onChangeText={setCurrentNoteTitle}
              />
              <TextInput
                style={[styles.input, { height: 150 }]}
                placeholder="Nội dung ghi chú"
                value={currentNoteContent}
                onChangeText={setCurrentNoteContent}
                multiline
              />

              {/* Nút Lưu */}
              <TouchableOpacity onPress={handleSaveNote} style={styles.addNoteButton}>
                <Text style={styles.buttonText}>Lưu Ghi Chú</Text>
              </TouchableOpacity>

              {/* Nút Xóa */}
              {currentNoteId && (
                <TouchableOpacity 
                  onPress={() => handleDeleteNote(currentNoteId)} 
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Xóa Ghi Chú</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Button title="Tìm kiếm" onPress={handleSearch} />

      {/* Lọc thời khoá biểu */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item[0].toString()}
        renderItem={({ item }) => {
          const id = item[0]; 
          const note = notes.find(n => n.ma_tkb === id); 
          const roomname = getRoomName(item[3]);
        
          return (
            <View style={styles.item}>
              <Text style={styles.text}>Thứ: {item[4]}</Text>
              <Text style={styles.text}>Giờ: {item[6]} - {item[7]}</Text>
              <Text style={styles.text}>Mã lớp: {item[1]}</Text>
              <Text style={styles.text}>Mã môn: {item[2]}</Text>
              <Text style={styles.text}>Phòng: {roomname}</Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleAddOrEditNote(id)} style={styles.addNoteButton}>
                  <Text style={styles.buttonText}>Thêm Ghi Chú</Text>
                </TouchableOpacity>
              </View>

              {/* Hiện ghi chú */}
              <Text style={styles.noteText}>{note ? note.content : "Chưa có ghi chú"}</Text>
            </View>
          );
        }}
      />
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: 400,
  },
  scrollView: {
    maxHeight: 300,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#34495e",
  },
  addNoteButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noteText: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#7f8c8d",
  },
});