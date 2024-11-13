import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import database from "../../data/Appdata"; // Giả lập cơ sở dữ liệu

export default function Thoikhoabieu() {
  // Tính giờ kết thúc
  const calculateEndTime = (startTime, duration) => {
    const [hour, minute] = startTime.split(":").map(Number);
    const endHour = hour + duration;
    return `${endHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  // Hàm tạo lịch trình cho các tuần từ tuan_bat_dau đến tuan_ket_thuc
  function generateTimetable() {
    const timetableData = [];
    const monHocData = database.quanlysinhvien.mon_hoc.data; // Dữ liệu môn học
    const phongHocData = database.quanlysinhvien.phong_hoc.data; // Dữ liệu phòng học

    // Lặp qua từng mục trong thời khóa biểu
    database.quanlysinhvien.thoi_khoa_bieu.data.forEach((entry) => {
        const maMonHoc = entry[2];  // Mã môn học
        const maLop = entry[1];      // Mã lớp
        const maPhong = entry[3];    // Mã phòng
        const namHoc = entry[4];     // Năm học
        const tuanBatDau = entry[5]; // Tuần bắt đầu
        const tuanKetThuc = entry[6]; // Tuần kết thúc

        // Tìm tên môn học và tên phòng học
        const monHoc = monHocData.find((m) => m[0] === maMonHoc);  // Tìm môn học theo mã
        const phongHoc = phongHocData.find((p) => p[0] === maPhong);  // Tìm phòng học theo mã

        // Kiểm tra nếu không tìm được môn học hoặc phòng học
        if (!monHoc || !phongHoc) return;

        const soTuan = monHoc[6];  // Số tuần học
        const soBuoi = monHoc[5];  // Số buổi học
        let currentDay = 2;  // Bắt đầu từ thứ 2
        let startTime = "08:00";  // Giờ bắt đầu

        // Lặp qua các tuần học từ tuan_bat_dau đến tuan_ket_thuc
        for (let currentWeek = tuanBatDau; currentWeek <= tuanKetThuc; currentWeek++) {
            // Tính thời gian kết thúc
            const endTime = calculateEndTime(startTime, 2);  // Giả sử mỗi buổi học là 2 giờ

            // Thêm dữ liệu vào timetableData
            timetableData.push({
                ma_tkb: entry[0],         // Mã thời khóa biểu
                ma_lop: maLop,            // Mã lớp
                ma_mon_hoc: maMonHoc,     // Mã môn học
                ten_mon: monHoc[1],       // Lấy tên môn học
                ma_phong: maPhong,        // Mã phòng học
                ten_phong: phongHoc[1],   // Lấy tên phòng học
                thu: `Thứ ${currentDay}`, // Thứ trong tuần
                tuan: currentWeek,        // Tuần học
                gio_bat_dau: startTime,   // Giờ bắt đầu
                gio_ket_thuc: endTime,    // Giờ kết thúc
                nam_hoc: namHoc,          // Năm học
            });

            currentDay++;  // Tiến sang ngày tiếp theo
            if (currentDay > 6) {  // Nếu qua thứ 6 thì quay lại thứ 2
                currentDay = 2;
            }
        }
    });

    return timetableData;  // Trả về toàn bộ lịch trình
}


  const thoiKhoaBieu = generateTimetable(); // Tạo lịch trình mặc định

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(""); // Thêm lọc theo tuần
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data); // Ghi chú ban đầu
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // Hàm tìm kiếm lớp, tuần, năm học
  const handleSearch = () => {
    const results = generateTimetable().filter((item) => {
      const matchesClass = selectedClass ? item.ma_lop === selectedClass : true;
      const matchesYear = selectedYear ? item.nam_hoc === selectedYear : true;
      const matchesWeek = selectedWeek ? item.tuan === parseInt(selectedWeek) : true; // Lọc theo tuần
      return matchesClass && matchesYear && matchesWeek;
    });
    setFilteredData(results);
  };

  // Xử lý thêm hoặc sửa ghi chú
  const handleAddOrEditNote = (id) => {
    setCurrentNoteId(id);
    const existingNote = notes.find((note) => note.ma_tkb === id);

    if (existingNote) {
      setCurrentNoteTitle(existingNote.title);
      setCurrentNoteContent(existingNote.content);
    } else {
      setCurrentNoteTitle("");
      setCurrentNoteContent("");
    }
    setModalVisible(true);
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
      const updatedNotes = notes.filter(
        (note) => note.ma_tkb !== currentNoteId
      );
      updatedNotes.push(newNote);
      setNotes(updatedNotes);
      database.quanlysinhvien.notes.data = updatedNotes;
      setModalVisible(false);
    }
  };

  // Xóa ghi chú
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.ma_tkb !== id);
    setNotes(updatedNotes);
    database.quanlysinhvien.notes.data = updatedNotes;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời Khóa Biểu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã lớp"
        value={selectedClass}
        onChangeText={setSelectedClass}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập năm học"
        value={selectedYear}
        onChangeText={setSelectedYear}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số tuần"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />

      <FlatList
    data={filteredData}
    keyExtractor={(item) => item.ma_tkb.toString()} // Dùng ma_tkb làm key
    renderItem={({ item }) => {
        const id = item.ma_tkb;
        const note = notes.find((n) => n.ma_tkb === id);

        return (
            <View style={styles.item}>
                <Text>Thứ: {item.thu}</Text>
                <Text>Giờ: {item.gio_bat_dau} - {item.gio_ket_thuc}</Text>
                <Text>Mã lớp: {item.ma_lop}</Text>
                <Text>{item.ten_mon || "Chưa có tên môn"}</Text> {/* Kiểm tra tên môn */}
                <Text>{item.ten_phong || "Chưa có phòng học"}</Text> {/* Kiểm tra tên phòng */}
                <Text>Tuần: {item.tuan}</Text>
                <Text>Năm học: {item.nam_hoc}</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => handleAddOrEditNote(id)}
                        style={styles.addNoteButton}
                    >
                        <Text style={styles.buttonText}>Thêm Ghi Chú</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteNote(id)}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.buttonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
                {/* Đảm bảo ghi chú cũng được bọc trong <Text> */}
                <Text>{note ? note.content : "Chưa có ghi chú"}</Text>
            </View>
        );
    }}
/>


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
              <TouchableOpacity
                onPress={handleSaveNote}
                style={styles.saveButton}
              >
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  addNoteButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
});
