<?php
// Kết nối đến cơ sở dữ liệu
$servername = "localhost"; // Thay đổi theo cấu hình của bạn
$username = "root"; // Thay đổi theo tên đăng nhập của bạn
$password = ""; // Thay đổi theo mật khẩu của bạn
$dbname = "quanlysinhvien"; // Thay đổi theo tên cơ sở dữ liệu của bạn

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Mảng chứa dữ liệu của tất cả các bảng
$data = [];

// Danh sách các bảng
$tables = ['diem', 'Khoa', 'lop', 'mon_hoc', 'phong_hoc', 'sinh_vien', 'tai_khoan', 'thoi_khoa_bieu'];

foreach ($tables as $table) {
    $sql = "SELECT * FROM $table";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Lưu dữ liệu vào mảng
        while($row = $result->fetch_assoc()) {
            $data[$table][] = $row;
        }
    } else {
        $data[$table] = []; // Nếu không có dữ liệu, gán mảng rỗng
    }
}

// Đóng kết nối
$conn->close();

// Chuyển đổi mảng thành JSON và in ra
header('Content-Type: application/json');
echo json_encode($data);
?>