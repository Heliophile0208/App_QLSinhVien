import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import database from "../../data/Appdata";

export default function Thoikhoabieu() {
  const timeSlots = [
    { slot: 1, start: "07:00", end: "08:30" },
    { slot: 2, start: "08:45", end: "10:15" },
    { slot: 3, start: "13:00", end: "14:30" },
    { slot: 4, start: "14:45", end: "16:15" },
  ];

  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [previousResults, setPreviousResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const years = [...new Set(database.quanlysinhvien.thoi_khoa_bieu.data.map(item => item[4]))];

  const generateTimetable = () => {
    const timetableData = [];
    const { thoi_khoa_bieu, mon_hoc, phong_hoc } = database.quanlysinhvien;

    if (!thoi_khoa_bieu || !mon_hoc || !phong_hoc) {
      alert("Dữ liệu không hợp lệ.");
      return [];
    }

    const filteredTKB = thoi_khoa_bieu.data.filter(entry => {
      const [_, ma_lop, __, ___, nam_hoc] = entry;
      return ma_lop === selectedClass && 
             (!selectedYear || nam_hoc === selectedYear) && 
             (!selectedWeek || (entry[5] <= selectedWeek && entry[6] >= selectedWeek));
    });

    if (filteredTKB.length === 0) {
      alert("Không tìm thấy thời khóa biểu cho lớp đã chọn.");
      return [];
    }

    // Tạo một object để lưu trữ các ca học đã xếp theo từng ngày
    const Lichdaxep = {};

    for (let entry of filteredTKB) {
      const [ma_tkb, ma_lop, ma_mon_hoc, ma_phong, nam_hoc, tuan_bat_dau, tuan_ket_thuc] = entry;
      const subjectInfo = mon_hoc.data.find(m => m[0] === ma_mon_hoc);
      const room = phong_hoc.data.find(p => p[0] === ma_phong);

      if (subjectInfo && room) {
        const day = Math.floor(Math.random() * 5) + 2; // Ngày ngẫu nhiên từ Thứ 2 đến Thứ 6

        // Kiểm tra xem đã có môn học nào ở ca này chưa. Nếu có, chọn ca khác
        let Lichtrong = timeSlots.find((timeSlot) => {
          // Kiểm tra xem ca học này đã được xếp trong ngày chưa
          const Trunglich = Lichdaxep[day] && Lichdaxep[day].includes(timeSlot.slot);
          return !Trunglich;  // Chỉ chọn ca chưa bị chiếm
        });

        if (!Lichtrong) {
          // Nếu không còn ca trống, tìm ca khác trong ngày
          Lichtrong = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        }

        // Lưu ca học vào object để tránh trùng
        if (!Lichdaxep[day]) {
          Lichdaxep[day] = [];
        }
        Lichdaxep[day].push(Lichtrong.slot);

        timetableData.push({
          ma_tkb,
          ma_lop,
          ten_lop: selectedClass,
          ma_khoa: subjectInfo[3],
          ten_mon: subjectInfo[1],
          ma_phong: room[0],
          ten_phong: room[1],
          nam_hoc,
          week: selectedWeek,
          day,
          slot: Lichtrong.slot,
          start: Lichtrong.start,
          end: Lichtrong.end,
        });
      }
    }

    return timetableData;
  };

  const handleSearch = () => {
    if (!selectedClass) {
      alert("Vui lòng chọn lớp.");
      return;
    }

    const previousData = getPreviousResults();
    if (previousData.length > 0) {
      setFilteredData(previousData); // Nếu đã có dữ liệu trước đó, sử dụng dữ liệu đó
    } else {
      const results = generateTimetable();
      if (results.length > 0) {
        setFilteredData(results );
        setPreviousResults(prev => [...prev, { week: selectedWeek, data: results }]); // Lưu kết quả vào biến tạm
      }
    }
  };

  const getPreviousResults = () => {
    const result = previousResults.find(item => item.week === selectedWeek);
    return result ? result.data : [];
  };

  const groupedData = (filteredData.length > 0 ? filteredData : getPreviousResults()).reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thời Khóa Biểu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã lớp (VD: CT20CD31)"
        value={selectedClass}
        onChangeText={setSelectedClass}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số tuần (VD: 3)"
        value={selectedWeek}
        onChangeText={setSelectedWeek}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.input}>
          {selectedYear ? selectedYear : "Chọn năm học"}
        </Text>
      </TouchableOpacity>
      <Button title="Tìm kiếm" onPress={handleSearch} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Chọn Năm Học</Text>
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={styles.modalOption}
              onPress={() => {
                setSelectedYear(year);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>{year}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Đóng" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <ScrollView>
        {Object.keys(groupedData).map(day => (
          <View key={day} style={styles.daySection}>
            <Text style={styles.dayTitle}>{daysOfWeek[day - 2]}</Text>
            {groupedData[day].map((item, index) => (
              <View key={index} style={styles.item}>
                <Text>Ca: {item.slot}</Text>
                <Text>
                  Giờ: {item.start} - {item.end}
                </Text>
                <Text>Môn: {item.ten_mon}</Text>
                <Text>{item.ten_phong}</Text>
                <Text>Lớp: {item.ten_lop}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
  item: { padding: 15, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 },
  daySection: { marginBottom: 20 },
  dayTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  modal: { flex: 1, padding: 20, justifyContent: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  modalOption: { padding: 10, backgroundColor: "#f1f1f1", marginBottom: 10 },
  modalOptionText: { fontSize: 16, textAlign: "center" },
});
