import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Modal, TouchableOpacity, StyleSheet } from "react-native";
import database from "../../data/Appdata"; // Simulated database

export default function Thoikhoabieu() {
  const thoiKhoaBieu = database.quanlysinhvien.thoi_khoa_bieu;

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data); // Initial notes
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // Handle searching for specific classes and weeks
  const handleSearch = () => {
    const results = thoiKhoaBieu.data.filter(item => {
      const matchesClass = selectedClass ? item[1] === selectedClass : true;
      const matchesWeek = selectedWeek ? item[5].toString() === selectedWeek : true;
      return matchesClass && matchesWeek;
    });
    setFilteredData(results);
  };

  // Handle adding or editing notes for a timetable entry
  const handleAddOrEditNote = (id) => {
    setCurrentNoteId(id); // Set the current timetable entry ID for the note
    const existingNote = notes.find(note => note.ma_tkb === id); // Find existing note if any

    if (existingNote) {
      setCurrentNoteTitle(existingNote.title); // Set title for editing
      setCurrentNoteContent(existingNote.content); // Set content for editing
    } else {
      setCurrentNoteTitle(""); // Empty title for new notes
      setCurrentNoteContent(""); // Empty content for new notes
    }

    setModalVisible(true); // Show the modal to add/edit note
  };

  // Handle saving or updating the note
  const handleSaveNote = () => {
    if (currentNoteId) {
      const newNote = {
        ma_ghi_chu: Date.now().toString(), // Unique ID for the note (using Date.now())
        ma_tkb: currentNoteId, // Link the note to the timetable entry ID
        title: currentNoteTitle,
        content: currentNoteContent,
        created_at: new Date().toISOString(),
      };

      // Check if the note exists and update it or add new
      const updatedNotes = notes.filter(note => note.ma_tkb !== currentNoteId); // Remove old note
      updatedNotes.push(newNote); // Add the new/updated note
      setNotes(updatedNotes);
      database.quanlysinhvien.notes.data = updatedNotes; // Save to the database

      console.log("Note saved:", newNote); // Log the saved note details

      setModalVisible(false); // Close the modal
    }
  };

  // Handle deleting a note
  const handleDeleteNote = (id) => {
    // Remove the note with the matching ma_tkb (timetable ID)
    const updatedNotes = notes.filter(note => note.ma_tkb !== id);

    setNotes(updatedNotes); // Update the notes in state
    database.quanlysinhvien.notes.data = updatedNotes; // Save the updated notes to the database

    console.log("Note deleted for timetable ID:", id); // Log the deletion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời Khóa Biểu</Text>

      {/* Class and week search filters */}
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
      <Button title="Tìm kiếm" onPress={handleSearch} />

      {/* Display filtered timetable data */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item[0].toString()} // Timetable entry ID (ma_tkb)
        renderItem={({ item }) => {
          const id = item[0]; // Timetable entry ID (ma_tkb)
          const note = notes.find(n => n.ma_tkb === id); // Find the note for this timetable entry

          return (
            <View style={styles.item}>
              <Text>Thứ: {item[4]}</Text>
              <Text>Giờ: {item[6]} - {item[7]}</Text>
              <Text>Mã lớp: {item[1]}</Text>
              <Text>Mã môn: {item[2]}</Text>
              <Text>Phòng: {item[3]}</Text>

              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => handleAddOrEditNote(id)} style={styles.addNoteButton}>
                  <Text style={styles.buttonText}>Thêm Ghi Chú</Text>
                </TouchableOpacity>

                {/* Delete note button */}
                <TouchableOpacity onPress={() => handleDeleteNote(id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>

              {/* Display the note content */}
              <Text>{note ? note.content : "Chưa có ghi chú"}</Text>
            </View>
          );
        }}
      />

      {/* Modal for adding/editing notes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              placeholder="Tiêu đề ghi chú"
              value={currentNoteTitle}
              onChangeText={setCurrentNoteTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Nội dung ghi chú"
              value={currentNoteContent}
              onChangeText={setCurrentNoteContent}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleSaveNote} style={styles.saveButton}>
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addNoteButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});
