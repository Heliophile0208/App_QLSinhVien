import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import database from "../../data/Appdata"; // Simulated database

export default function Thoikhoabieu() {
  const thoiKhoaBieu = database.quanlysinhvien.thoi_khoa_bieu;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedNamHoc, setSelectedNamHoc] = useState(""); // State for selected academic year
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data); // Initial notes
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // Extract unique academic years (nam_hoc) from the timetable data
  const namHocOptions = [...new Set(thoiKhoaBieu.data.map(item => item[8]))]; // Assuming nam_hoc is at index 8 in thoi_khoa_bieu

  // Handle searching for specific classes, weeks, and academic year
  const handleSearch = () => {
    const results = thoiKhoaBieu.data.filter(item => {
      const matchesClass = selectedClass ? item[1] === selectedClass : true;
      const matchesWeek = selectedWeek ? item[5].toString() === selectedWeek : true;
      const matchesNamHoc = selectedNamHoc ? item[8] === selectedNamHoc : true; // Filter by nam_hoc
      return matchesClass && matchesWeek && matchesNamHoc;
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

      {/* Dropdown for Nam Hoc (Academic Year) */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>{selectedNamHoc || "Chọn năm học"}</Text>
      </TouchableOpacity>

      {/* Show a modal with academic year options */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollView}>
              <FlatList
                data={namHocOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedNamHoc(item); // Set the selected academic year
                      setModalVisible(false); // Close the dropdown/modal
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

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
              <Text style={styles.text}>Thứ: {item[4]}</Text>
              <Text style={styles.text}>Giờ: {item[6]} - {item[7]}</Text>
              <Text style={styles.text}>Mã lớp: {item[1]}</Text>
              <Text style={styles.text}>Mã môn: {item[2]}</Text>
              <Text style={styles.text}>Phòng: {item[3]}</Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleAddOrEditNote(id)} style={styles.addNoteButton}>
                  <Text style={styles.buttonText}>Thêm Ghi Chú</Text>
                </TouchableOpacity>

                {/* Delete note button */}
                <TouchableOpacity onPress={() => handleDeleteNote(id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>

              {/* Display the note content */}
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
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 18,
    color: "#2c3e50",
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
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  noteText: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#7f8c8d",
  },
});