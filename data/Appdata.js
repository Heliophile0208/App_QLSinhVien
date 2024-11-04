// Appdata.js

const database = {
    quanlysinhvien: {
        diem: {
            columns: ["id", "ma_sinh_vien", "ma_mon_hoc", "diem"],
            data: []
        },
        Khoa: {
            columns: ["ma_khoa", "ten_khoa"],
            data: [
                ["BT", "Bảo trì hệ thống thiết bị cơ khí"],
                ["CG", "Cắt gọt kim loại"],
                ["HA", "Hàn"],
                ["NSS", "Nguội sửa chữa máy công cụ"],
                ["HT", "Chế biến thực phẩm"],
                ["MTT", "May thời trang"],
                ["CNTT", "Công nghệ thông tin (Ứng dụng phần mềm)"],
                ["QTM", "Quản trị mạng máy tính"],
                ["ML", "Kỹ thuật máy lạnh và điều hoà không khí"],
                ["DC", "Điện công nghiệp"]
            ]
        },
        
        lop: {
            columns: ["ma_lop", "ten_lop", "ma_khoa", "khoa_hoc"],
            data: [
                ["CT20CD31", "Công Nghệ Thông Tin", "CNTT", "K2020"],
                ["MT20CD31", "Công Nghệ May", "MTT", "K2020"],
                ["KT21CD31", "Kinh Tế", "KT", "K2021"],
                ["OT22CD31", "Công Nghệ Ô Tô", "CG", "K2022"],
                ["MT23CD32", "Công Nghệ May", "MTT", "K2023"],
                ["HT21CD31", "Công Nghệ Hoá", "HT", "K2021"],
                ["CT22CD31", "Công Nghệ Thông Tin", "CNTT", "K2022"],
                ["CG22TC31", "Cắt Gọt", "CG", "K2022"],
                ["QT22CD31", "Quản Trị Mạng", "CNTT", "K2022"],
                ["HT20TC31", "Hoá Thực Phẩm", "HT", "K2020"]
            ]
        },

        mon_hoc: {
    columns: ["ma_mon_hoc", "ten_mon_hoc", "so_tin_chi", "ma_khoa"],
    data: [
        [1, "Lập trình PHP", 3, "CNTT"],
        [2, "Cơ sở dữ liệu", 3, "CNTT"],
        [3, "Lập trình Java", 4, "CNTT"],
        [4, "Mạng máy tính", 3, "CNTT"],
        [5, "Phát triển ứng dụng di động", 3, "CNTT"],
        [6, "Trí tuệ nhân tạo", 4, "CNTT"],
        [7, "Phân tích dữ liệu", 3, "CNTT"],
        [8, "Hóa hữu cơ", 3, "HT"],
        [9, "Hóa phân tích", 3, "HT"],
        [10, "Công nghệ thực phẩm", 2, "HT"],
        [11, "Sinh học", 2, "HT"],
        [12, "Quản lý chất lượng thực phẩm", 4, "HT"],
        [13, "Thiết kế web", 3, "CNTT"],
        [14, "Lập trình Python", 3, "CNTT"],
        [15, "Hệ điều hành", 4, "CNTT"],
        [16, "Kỹ thuật phần mềm", 3, "CNTT"],
        [17, "Lập trình C#", 3, "CNTT"],
        [18, "An toàn thông tin", 4, "CNTT"],
        [19, "Xử lý tín hiệu", 3, "CNTT"],
        [20, "Khoa học máy tính", 4, "CNTT"],
        [21, "Marketing trực tuyến", 3, "KT"],
        [22, "Quản lý dự án", 3, "KT"],
        [23, "Kinh tế vi mô", 3, "KT"],
        [24, "Kinh tế vĩ mô", 3, "KT"],
        [25, "Lý thuyết xác suất", 3, "KT"],
        [26, "Thống kê ứng dụng", 3, "KT"],
        [27, "Kế toán tài chính", 4, "KT"],
        [28, "Quản trị nhân sự", 3, "KT"],
        [29, "Quản lý sản xuất", 4, "KT"],
        [30, "Nguyên lý kế toán", 4, "KT"]
    ]
},
        phong_hoc: {
            columns: ["ma_phong", "ten_phong", "Nha_so"],
            data: [
                [1, "Phòng 101", 3],
                [2, "Phòng 102", 3],
                [3, "Phòng 103", 3],
                [4, "Phòng 104", 3],
                [5, "Phòng 105", 3],
                [6, "Phòng 106", 3],
                [7, "Phòng Máy 1", 2],
                [8, "Phòng Máy 2", 2],
                [9, "Phòng Máy 3", 2],
                [10, "Phòng Máy 4", 2],
                [11, "Phòng Máy 5", 2],
                [12, "Phòng Máy 6", 2],
                [13, "Phòng Máy 7", 2],
                [14, "Phòng 204", 3],
                [15, "Phòng 205", 3]
            ]
        },
        sinh_vien: {
            columns: ["ma_sinh_vien", "ho_ten", "ngay_sinh", "gioi_tinh", "dia_chi", "email", "so_dien_thoai", "ma_lop"],
            data: [
                [1, "Nguyễn Văn A", "2002-05-10", 1, "123 Lý Thường Kiệt, Hà Nội", "nguyenvana@example.com", "0123456789", "CT20CD31"],
                [2, "Trần Thị B", "2001-09-15", 0, "456 Đống Đa, Đà Nẵng", "tranthib@example.com", "0987654321", "KT21CD31"],
                [3, "Lê Văn C", "2000-12-20", 1, "789 Quận 1, TP.HCM", "levanc@example.com", "0167890123", "HT20TC31"],
                [4, "Phạm Thị D", "2002-08-25", 0, "111 Nguyễn Huệ, Huế", "phamthid@example.com", "0123456788", "OT22CD31"],
                [5, "Vũ Văn E", "2001-11-10", 1, "222 Trường Chinh, Hà Nội", "vuvane@example.com", "0912345678", "HT20TC31"],
                [6, "Hoàng Thị F", "2000-03-15", 0, "333 Lê Duẩn, Đà Nẵng", "hoangthif@example.com", "0988765432", "MT20CD31"],
                [7, "Lê Thị Kim Ngân", "2003-08-20", 0, "Đồng Nai", "lethikimngan20803@gmail.com", "0928338155", "CT20CD31"]
            ]
        },
        tai_khoan: {
            columns: ["id", "username", "password", "email", "ma_sinh_vien"],
            data: [
                [1, "admin", "123", "test@example.com", "5"],
                [1, "ngan", "2008", "test@example.com", "7"]
            ]
        },
        
        thoi_khoa_bieu: {
            columns: ["id", "ma_lop", "ma_mon_hoc", "ma_phong", "thu", "tuan", "gio_bat_dau", "gio_ket_thuc"],
            data: [
                [1, "CT20CD31", 1, 1, "Thứ 2", 1, "08:00", "10:00"],
                [2, "CT20CD31", 2, 2, "Thứ 3", 1, "10:00", "12:00"],
                [3, "MT20CD31", 3, 3, "Thứ 4", 1, "08:00", "11:00"],
                [4, "KT21CD31", 4, 4, "Thứ 5", 1, "09:00", "11:00"],
                [5, "CT20CD31", 5, 5, "Thứ 6", 1, "08:00", "10:00"],
                [6, "MT20CD31", 6, 6, "Thứ 7", 1, "10:00", "12:00"],
                [7, "KT21CD31", 7, 7, "Thứ 2", 2, "08:00", "09:30"],
                [8, "CT20CD31", 8, 1, "Thứ 3", 2, "10:00", "11:30"],
                [9, "MT20CD31", 9, 2, "Thứ 4", 2, "08:00", "10:00"],
                [10, "KT21CD31", 10, 3, "Thứ 5", 2, "09:00", "11:00"],
                [11, "CT20CD31", 11, 4, "Thứ 6", 2, "08:00", "10:00"],
                [12, "MT20CD31", 12, 5, "Thứ 7", 2, "10:00", "12:00"],
                [13, "KT21CD31", 13, 6, "Thứ 2", 3, "08:00", "09:30"],
                [14, "CT20CD31", 14, 1, "Thứ 3", 3, "10:00", "11:30"],
                [15, "MT20CD31", 15, 2, "Thứ 4", 3, "08:00", "10:00"],
                [16, "KT21CD31", 16, 3, "Thứ 5", 3, "09:00", "11:00"],
                [17, "CT20CD31", 17, 4, "Thứ 6", 3, "08:00", "10:00"],
                [18, "MT20CD31", 18, 5, "Thứ 7", 3, "10:00", "12:00"],
                [19, "KT21CD31", 19, 6, "Thứ 2", 4, "08:00", "09:30"],
                [20, "CT20CD31", 20, 1, "Thứ 3", 4, "10:00", "11:30"],
                [21, "MT20CD31", 21, 2, "Thứ 4", 4, "08:00", "10:00"],
                [22, "KT21CD31", 22, 3, "Thứ 5", 4, "09:00", "11:00"],
                [23, "CT20CD31", 23, 4, "Thứ 6", 4, "08:00", "10:00"],
                [24, "MT20CD31", 24, 5, "Thứ 7", 4, "10:00", "12:00"],
                [25, "KT21CD31", 25, 6, "Thứ 2", 5, "08:00", "09:30"],
                [26, "CT20CD31", 26, 1, "Thứ 3", 5, "10:00", "11:30"],
                [27, "MT20CD31", 27, 2, "Thứ 4", 5, "08:00", "10:00"],
                [28, "KT21CD31", 28, 3, "Thứ 5", 5, "09:00", "11:00"],
                [29, "CT20CD31", 29, 4, "Thứ 6", 5, "08:00", "10:00"],
                [30, "MT20CD31", 30, 5, "Thứ 7", 5, "10:00", "12:00"],
                
            ]
        }
    
};

export default database;
