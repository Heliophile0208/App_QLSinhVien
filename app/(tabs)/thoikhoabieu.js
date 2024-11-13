import React, { useState, useEffect } from "react";
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
  const calculateEndTime = (startTime, duration) => {
    const [hour, minute] = startTime.split(":").map(Number);

    let endHour = hour + Math.floor(duration);
    let endMinute = minute + Math.round((duration % 1) * 60);

    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }

    endHour = endHour.toString().padStart(2, "0");
    endMinute = endMinute.toString().padStart(2, "0");

    return `${endHour}:${endMinute}`;
  };

  function generateTimetable() {
    const timetableData = [];
    const monHocData = database.quanlysinhvien.mon_hoc.data;
    const phongHocData = database.quanlysinhvien.phong_hoc.data;

    const timeSlots = [
      "07:00 - 08:30",
      "09:00 - 10:30",
      "13:00 - 14:30",
      "15:00 - 16:30",
    ];

    database.quanlysinhvien.thoi_khoa_bieu.data.forEach((entry) => {
      const maMonHoc = entry[2];
      const maLop = entry[1];
      const maPhong = entry[3];
      const namHoc = entry[4];
      const tuanBatDau = entry[5];
      const tuanKetThuc = entry[6];

      const monHoc = monHocData.find((m) => m[0] === maMonHoc);
      const phongHoc = phongHocData.find((p) => p[0] === maPhong);

      if (!monHoc || !phongHoc) return;

      const soBuoi = monHoc[6];
      const totalWeeks = tuanKetThuc - tuanBatDau + 1;
      const soBuoiMoiTuan = Math.floor(soBuoi / totalWeeks);
      let remainingSessions = soBuoi % totalWeeks;

      let currentDay = 2;
      let timeSlotIndex = 0;

      for (
        let currentWeek = tuanBatDau;
        currentWeek <= tuanKetThuc;
        currentWeek++
      ) {
        let sessionCount = soBuoiMoiTuan;
        if (remainingSessions > 0) {
          sessionCount++;
          remainingSessions--;
        }

        for (let session = 0; session < sessionCount; session++) {
          const timeSlot = timeSlots[timeSlotIndex];
          const endTime = calculateEndTime(timeSlot.split(" - ")[0], 1.5);

          timetableData.push({
            ma_tkb: entry[0],
            ma_lop: maLop,
            ma_mon_hoc: maMonHoc,
            ten_mon: monHoc[1],
            ma_phong: maPhong,
            ten_phong: phongHoc[1],
            thu: currentDay,
            tuan: currentWeek,
            gio_bat_dau: timeSlot.split(" - ")[0],
            gio_ket_thuc: endTime,
            nam_hoc: namHoc,
          });

          timeSlotIndex++;
          if (timeSlotIndex >= timeSlots.length) {
            timeSlotIndex = 0;
          }

          currentDay++;
          if (currentDay > 6) {
            currentDay = 2;
          }
        }
      }
    });

    const groupedByDay = timetableData.reduce((acc, item) => {
      if (!acc[item.thu]) {
        acc[item.thu] = [];
      }
      acc[item.thu].push(item);
      return acc;
    }, {});

    const sortedData = [];
    for (let day = 2; day <= 6; day++) {
      if (groupedByDay[day]) {
        sortedData.push(...groupedByDay[day]);
      }
    }

    return sortedData;
  }

  const thoiKhoaBieu = generateTimetable();

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notes, setNotes] = useState(database.quanlysinhvien.notes.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");

  const years = [...new Set(thoiKhoaBieu.map((item) => item.nam_hoc))];

  const handleSearch = () => {
    const results = thoiKhoaBieu.filter((item) => {
      const matchesClass = selectedClass ? item.ma_lop === selectedClass : true;
      const matchesYear = selectedYear ? item.nam_hoc === selectedYear : true;
      const matchesWeek = selectedWeek
        ? item.tuan === parseInt(selectedWeek)
        : true;
      return matchesClass && matchesYear && matchesWeek;
    });
    setFilteredData(results);
  };

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
        placeholder="Nhập số tuần"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
      />
      <TouchableOpacity onPress={() => setYearModalVisible(true)}>
        <Text style={styles.input}>
          {selectedYear ? `${selectedYear}` : "Chọn năm học"}
        </Text>
      </TouchableOpacity>
      <View style={{marginBottom:10}}>
      <Button title="Tìm kiếm" onPress={handleSearch} />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) =>
          `${item.ma_tkb}-${item.tuan}-${item.thu}-${item.gio_bat_dau}`
        }
        renderItem={({ item }) => {
          const id = item.ma_tkb;
          const note = notes.find((n) => n.ma_tkb === id);

          return (
            <View style={styles.item}>
              <Text> {`Thứ ${item.thu}`} </Text>
              <Text>
                Giờ {item.gio_bat_dau} - {item.gio_ket_thuc}
              </Text>
              <Text>Mã lớp {item.ma_lop}</Text>
              <Text>Môn {item.ten_mon || "Chưa có tên môn"}</Text>
              <Text>{item.ten_phong || "Chưa có tên phòng"}</Text>
              {note ? (
                <TouchableOpacity onPress={() => handleAddOrEditNote(id)}>
                  <Text>Chỉnh sửa ghi chú</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleAddOrEditNote(id)}>
                  <Text>Thêm ghi chú</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      {/* Modal chọn năm học */}
      <Modal visible={yearModalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Chọn Năm Học</Text>
          {years.map((year) => (
            <TouchableOpacity
              key={year}
              style={styles.modalOption}
              onPress={() => {
                setSelectedYear(year);
                setYearModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>{year}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Đóng" onPress={() => setYearModalVisible(false)} />
        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide">
  <View style={styles.modal}>
    <Text style={styles.modalTitle}>Ghi chú</Text>
    
    {/* Tiêu đề ghi chú */}
    <TextInput
      style={styles.input}
      placeholder="Tiêu đề ghi chú"
      value={currentNoteTitle}
      onChangeText={setCurrentNoteTitle}
    />

    {/* Nội dung ghi chú */}
    <TextInput
      style={[styles.input, styles.textArea]}  
      placeholder="Nội dung ghi chú"
      value={currentNoteContent}
      onChangeText={setCurrentNoteContent}
      multiline={true}
      numberOfLines={4}
    />

    {/* Button Container with evenly spaced buttons */}
    <View style={styles.buttonContainer}>
      <Button
        title="Lưu ghi chú"
        onPress={handleSaveNote}
        color="#4CAF50" 
      />
      
      {currentNoteId && (
        <Button
          title="Xóa ghi chú"
          onPress={() => handleDeleteNote(currentNoteId)}
          color="#F44336"  
        />
      )}
      
      <Button
        title="Đóng"
        onPress={() => setModalVisible(false)}
        color="#757575"
      />
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
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
    marginTop: 50,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalOptionText: {
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 120,  
    textAlignVertical: "top",  
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    width: "100%",  
    marginTop: 20,
  },
});
