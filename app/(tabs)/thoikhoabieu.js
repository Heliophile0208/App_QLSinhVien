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

  // Hàm tạo lịch trình
  function generateTimetable() {
    const timetableData = [];
    const monHocData = database.quanlysinhvien.mon_hoc.data;

    database.quanlysinhvien.thoi_khoa_bieu.data.forEach((entry) => {
      const maMonHoc = entry[2];
      const maLop = entry[1];
      const maPhong = entry[3];
      const namHoc = entry[4];
      const monHoc = monHocData.find((m) => m[0] === maMonHoc);

      if (!monHoc) return;
      const soTuan = monHoc[6];
      const soBuoi = monHoc[5];
      let currentDay = 2; // Bắt đầu từ thứ 2
      let startTime = "07:00"; // Khởi điểm giờ học sáng
      let isMorning = true;

      for (let i = 0; i < soBuoi; i++) {
        if (currentDay > 6) {
          currentDay = 2;
          startTime = "07:00"; // Reset giờ học sáng cho tuần mới
          isMorning = true;
        }

        // Điều chỉnh giờ ra chơi và thời gian kết thúc tùy theo buổi
        let sessionDuration = 1.5; // 1.5 giờ cho mỗi tiết
        let breakTime = "08:30";
        let endMorning = "10:30";
        let startAfternoon = "13:00";
        let endAfternoon = "16:30";
        
        if (isMorning) {
          const endTime = calculateEndTime(startTime, sessionDuration); // Buổi sáng học từ 7h đến 10h30
          timetableData.push({
            ma_tkb: entry[0],
            ma_lop: maLop,
            ma_mon_hoc: maMonHoc,
            ma_phong: maPhong,
            thu: `Thứ ${currentDay}`,
            tuan: Math.floor(i / 3) + 1,
            gio_bat_dau: startTime,
            gio_ket_thuc: endTime,
            nam_hoc: namHoc,
          });

          // Cập nhật thời gian bắt đầu cho tiết tiếp theo
          startTime = calculateEndTime(startTime, 2); // Giờ kế tiếp sau 2 tiếng

          // Nếu tới giờ ra chơi, điều chỉnh lại giờ học tiếp theo
          if (startTime >= breakTime) {
            startTime = calculateEndTime(breakTime, 0.5); // Nghỉ 30 phút
          }

          // Chuyển sang buổi chiều nếu đã qua 10h30
          if (startTime >= endMorning) {
            isMorning = false;
            startTime = startAfternoon;
          }
        } else {
          const endTime = calculateEndTime(startTime, sessionDuration); // Buổi chiều học từ 13h đến 16h30
          timetableData.push({
            ma_tkb: entry[0],
            ma_lop: maLop,
            ma_mon_hoc: maMonHoc,
            ma_phong: maPhong,
            thu: `Thứ ${currentDay}`,
            tuan: Math.floor(i / 3) + 1,
            gio_bat_dau: startTime,
            gio_ket_thuc: endTime,
            nam_hoc: namHoc,
          });

          // Cập nhật thời gian bắt đầu cho tiết tiếp theo
          startTime = calculateEndTime(startTime, 2); // Giờ kế tiếp sau 2 tiếng

          // Nếu tới giờ ra chơi, điều chỉnh lại giờ học tiếp theo
          if (startTime >= "14:30") {
            startTime = calculateEndTime("14:30", 0.5); // Nghỉ 30 phút
          }

          // Chuyển sang ngày tiếp theo nếu đã qua 16h30
          if (startTime >= endAfternoon) {
            currentDay++;
            startTime = "07:00";
            isMorning = true;
          }
        }
      }
    });

    return timetableData;
  }

  const thoiKhoaBieu = generateTimetable(); // Tạo lịch trình
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data); // Ghi chú ban đầu
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  // Hàm tìm kiếm lớp, tuần, năm học
  const handleSearch = () => {
    const results = thoiKhoaBieu.filter((item) => {
      const matchesClass = selectedClass ? item.ma_lop === selectedClass : true;
      const matchesWeek = selectedWeek
        ? item.tuan.toString() === selectedWeek
        : true;
      const matchesYear = selectedYear ? item.nam_hoc === selectedYear : true;

      return (
        matchesClass &&
        (selectedWeek ? matchesWeek : true) &&
        (selectedYear ? matchesYear : true)
      );
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
        placeholder="Nhập tuần"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập năm học"
        value={selectedYear}
        onChangeText={setSelectedYear}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key để kiểm tra lỗi
        renderItem={({ item }) => {
          const id = item.ma_tkb;
          const note = notes.find((n) => n.ma_tkb === id);

          return (
            <View style={styles.item}>
              <Text>Thứ: {item.thu}</Text>
              <Text>
                Giờ: {item.gio_bat_dau} - {item.gio_ket_thuc}
              </Text>
              <Text>Mã lớp: {item.ma_lop}</Text>
              <Text>Mã môn: {item.ma_mon_hoc}</Text>
              <Text>Phòng: {item.ma_phong}</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  addNoteButton: {
    backgroundColor: "#5cb85c",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 8,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#5cb85c",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});