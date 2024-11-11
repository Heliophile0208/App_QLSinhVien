// Appdata.js

const database = {
    quanlysinhvien: {
       diem: {
            columns: ["ma_diem", "ma_sinh_vien", "ma_mon_hoc", "diem","ma_loai_diem"],
            data: []
        },
        loai_diem: {
    columns: ["ma_loai_diem", "ten_loai"],
    data: [
        ["KTTX", "Điểm Kiểm Tra Thường Xuyên (Hệ số 1)"],
        ["KTĐK", "Điểm Kiểm Tra Định Kỳ (Hệ số 2)"],
        ["TBKT", "Trung Bình Kiểm Tra"],
        ["THI", "Điểm Thi"],
        ["TKM", "Tổng Kết Môn"],
        ["DQT", "Điểm Quy Đổi"],
        ["KQ", "Kết Quả"]
    ]
}
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
        [30, "Nguyên lý kế toán", 4, "KT"],
        [31, "Kỹ thuật cắt gọt", 4, "CG"],
        [32, "Công nghệ cắt gọt kim loại", 4, "CG"],
        [33, "Kỹ thuật gia công cơ khí", 4, "CG"],
        [34, "Lý thuyết cắt gọt", 3, "CG"],
        [35, "Máy cắt kim loại", 3, "CG"],
        [36, "Công nghệ chế tạo khuôn mẫu", 4, "CG"],
        [37, "Kỹ thuật điều khiển máy cắt", 3, "CG"],
        [38, "Công nghệ mài", 3, "CG"],
        [39, "Quản lý sản xuất trong gia công", 3, "CG"],
        [40, "Vật liệu cắt", 3, "CG"],
        [41, "Kỹ thuật hàn", 3, "CG"],
        [42, "Máy công cụ trong gia công", 4, "CG"],
        [43, "Kỹ thuật lập trình máy CNC", 4, "CG"],
        [44, "Công nghệ phay", 3, "CG"],
        [45, "Công nghệ tiện", 3, "CG"],
        [46, "Quản lý chất lượng trong gia công", 3, "CG"],
        [47, "Công nghệ đột dập", 3, "CG"],
        [48, "Kỹ thuật gia công kim loại bằng áp lực", 3, "CG"],
        [49, "Kỹ thuật hàn ống", 3, "CG"],
        [50, "Lý thuyết cơ khí", 3, "CG"],
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
                ["CT20CD3123", "Nguyễn Văn A", "2002-05-10", 1, "123 Lý Thường Kiệt, Hà Nội", "nguyenvana@example.com", "0123456789", "CT20CD31"],
                ["KT21CD3124", "Trần Thị B", "2001-09-15", 0, "456 Đống Đa, Đà Nẵng", "tranthib@example.com", "0987654321", "KT21CD31"],
                ["HT20TC3112", "Lê Văn C", "2000-12-20", 1, "789 Quận 1, TP.HCM", "levanc@example.com", "0167890123", "HT20TC31"],
                ["OT22CD3127", "Phạm Thị D", "2002-08-25", 0, "111 Nguyễn Huệ, Huế", "phamthid@example.com", "0123456788", "OT22CD31"],
                ["HT20TC3120", "Vũ Văn E", "2001-11-10", 1, "222 Trường Chinh, Hà Nội", "vuvane@example.com", "0912345678", "HT20TC31"],
                ["MT20CT3111", "Hoàng Thị F", "2000-03-15", 0, "333 Lê Duẩn, Đà Nẵng", "hoangthif@example.com", "0988765432", "MT20CD31"],
                ["CT20CD3143", "Lê Thị Kim Ngân", "2003-08-20", 0, "Đồng Nai", "lethikimngan20803@gmail.com", "0928338155", "CT20CD31"],
                ["CG22TC3143", "Trần Văn G", "2001-03-05", 1, "123 Trần Hưng Đạo, TP.HCM", "tranvanga@example.com", "0123456790", "CG22TC31"],
                ["KT22CD3167", "Nguyễn Thị H", "2000-11-22", 0, "456 Lê Lợi, Hà Nội", "nguyenh@example.com", "0987654322", "KT22CD31"],
                ["QT22CD3154", "Lê Thị I", "2002-07-12", 1, "789 Phạm Ngọc Thạch, TP.HCM", "lethi@example.com", "0167890156", "QT22CD31"],
                ["QT22CD3101", "Phạm Thị J", "2003-02-17", 0, "222 Cầu Giấy, Hà Nội", "phamthij@example.com", "0912345679", "QT22CD31"],
                ["QT22CD3103", "Vũ Thị K", "2002-10-29", 1, "333 Bến Thành, TP.HCM", "vuthik@example.com", "0988765433", "QT22CD31"]
            ]
        },
        tai_khoan: {
            columns: ["id", "username", "password", "email", "ma_sinh_vien"],
            data: [
                [1, "admin", "123", "test@example.com", "CT20CD3123"],
                [2, "ngan", "2008", "test@example.com", "QT22CD3103"],
                [3, "bao", "2008", "test@example.com", "OT22CD3127"],
            ]
        },
        notes: {
            columns: ["ma_ghi_chu", "ma_tkb", "title", "content", "created_at"],
            data: [
                
            ]
            }, 
thoi_khoa_bieu: {
    columns: ["ma_tkb", "ma_lop", "ma_mon_hoc", "ma_phong", "thu", "tuan", "gio_bat_dau", "gio_ket_thuc", "nam_hoc"],
    data: [
        [1, "CT20CD31", 1, 1, "Thứ 2", 1, "08:00", "10:00", "2023-2024"],
        [2, "CT20CD31", 2, 2, "Thứ 3", 1, "10:00", "12:00", "2023-2024"],
        [3, "MT20CD31", 3, 3, "Thứ 4", 1, "08:00", "11:00", "2023-2024"],
        [4, "KT21CD31", 4, 4, "Thứ 5", 1, "09:00", "11:00", "2023-2024"],
        [5, "CT20CD31", 5, 5, "Thứ 6", 1, "08:00", "10:00", "2023-2024"],
        [6, "MT20CD31", 6, 6, "Thứ 7", 1, "10:00", "12:00", "2023-2024"],
        [7, "KT21CD31", 7, 7, "Thứ 2", 2, "08:00", "09:30", "2023-2024"],
        [8, "CT20CD31", 8, 1, "Thứ 3", 2, "10:00", "11:30", "2023-2024"],
        [9, "MT20CD31", 9, 2, "Thứ 4", 2, "08:00", "10:00", "2023-2024"],
        [10, "KT21CD31", 10, 3, "Thứ 5", 2, "09:00", "11:00", "2023-2024"],
        [11, "CT20CD31", 11, 4, "Thứ 6", 2, "08:00", "10:00", "2023-2024"],
        [12, "MT20CD31", 12, 5, "Thứ 7", 2, "10:00", "12:00", "2023-2024"],
        [13, "KT21CD31", 13, 6, "Thứ 2", 3, "08:00", "09:30", "2023-2024"],
        [14, "CT20CD31", 14, 1, "Thứ 3", 3, "10:00", "11:30", "2023-2024"],
        [15, "MT20CD31", 15, 2, "Thứ 4", 3, "08:00", "10:00", "2023-2024"],
        [16, "KT21CD31", 16, 3, "Thứ 5", 3, "09:00", "11:00", "2023-2024"],
        [17, "CT20CD31", 17, 4, "Thứ 6", 3, "08:00", "10:00", "2023-2024"],
        [18, "MT20CD31", 18, 5, "Thứ 7", 3, "10:00", "12:00", "2023-2024"],
        [19, "KT21CD31", 19, 6, "Thứ 2", 4, "08:00", "09:30", "2023-2024"],
        [20, "CT20CD31", 20, 1, "Thứ 3", 4, "10:00", "11:30", "2023-2024"],
        [21, "MT20CD31", 21, 2, "Thứ 4", 4, "08:00", "10:00", "2023-2024"],
        [22, "KT21CD31", 22, 3, "Thứ 5", 4, "09:00", "11:00", "2023-2024"],
        [23, "CT20CD31", 23, 4, "Thứ 6", 4, "08:00", "10:00", "2023-2024"],
        [24, "MT20CD31", 24, 5, "Thứ 7", 4, "10:00", "12:00", "2023-2024"],
        [25, "KT21CD31", 25, 6, "Thứ 2", 5, "08:00", "09:30", "2023-2024"],
        [26, "CT20CD31", 26, 1, "Thứ 3", 5, "10:00", "11:30", "2023-2024"],
        [27, "MT20CD31", 27, 2, "Thứ 4", 5, "08:00", "10:00", "2023-2024"],
        [28, "KT21CD31", 28, 3, "Thứ 5", 5, "09:00", "11:00", "2023-2024"],
        [29, "CT20CD31", 29, 4, "Thứ 6", 5, "08:00", "10:00", "2023-2024"],
        [30, "MT20CD31", 30, 5, "Thứ 7", 5, "10:00", "12:00", "2023-2024"],
                [31, "MT20CD31", 8, 1, "Thứ 2", 6, "08:00", "10:00", "2021-2022"],
        [32, "MT20CD31", 9, 2, "Thứ 3", 6, "10:00", "12:00", "2021-2022"],
        [33, "KT21CD31", 21, 3, "Thứ 4", 6, "08:00", "10:00", "2021-2022"],
        [34, "KT21CD31", 22, 4, "Thứ 5", 6, "10:00", "12:00", "2021-2022"],
        [35, "OT22CD31", 7, 5, "Thứ 6", 6, "08:00", "10:00", "2021-2022"],
        [36, "OT22CD31", 6, 6, "Thứ 7", 6, "10:00", "12:00", "2021-2022"],
        [37, "CG22TC31", 10, 1, "Thứ 2", 7, "08:00", "10:00", "2020-2021"],
        [38, "CG22TC31", 11, 2, "Thứ 3", 7, "10:00", "12:00", "2020-2021"],
        [39, "HT20TC31", 8, 3, "Thứ 4", 7, "08:00", "10:00", "2020-2021"],
        [40, "HT20TC31", 9, 4, "Thứ 5", 7, "10:00", "12:00", "2020-2021"],
        [41, "QT22CD31", 5, 5, "Thứ 6", 7, "08:00", "10:00", "2020-2021"],
        [42, "QT22CD31", 6, 6, "Thứ 7", 7, "10:00", "12:00", "2020-2021"],
        [43, "MT23CD32", 8, 1, "Thứ 2", 8, "08:00", "10:00", "2021-2022"],
        [44, "MT23CD32", 9, 2, "Thứ 3", 8, "10:00", "12:00", "2021-2022"],
        [45, "KT21CD31", 21, 3, "Thứ 4", 8, "08:00", "10:00", "2021-2022"],
        [46, "KT21CD31", 22, 4, "Thứ 5", 8, "10:00", "12:00", "2021-2022"],
        [47, "OT22CD31", 7, 5, "Thứ 6", 8, "08:00", "10:00", "2021-2022"],
        [48, "OT22CD31", 6, 6, "Thứ 7", 8, "10:00", "12:00", "2021-2022"],
        [49, "CG22TC31", 10, 1, "Thứ 2", 9, "08:00", "10:00", "2020-2021"],
        [50, "CG22TC31", 11, 2, "Thứ 3", 9, "10:00", "12:00", "2020-2021"],
        [51, "HT20TC31", 8, 3, "Thứ 4", 9, "08:00", "10:00", "2020-2021"],
        [52, "HT20TC31", 9, 4, "Thứ 5", 9, "07:00", "10:30", "2020-2021"],
        [53, "QT22CD31", 5, 5, "Thứ 6", 9, "07:00", "10:00", "2020-2021"],
        [54, "QT22CD31", 6, 6, "Thứ 7", 9, "10:00", "12:00", "2020-2021"],
        [55, "MT23CD32", 8, 1, "Thứ 2", 10, "07:00", "10:00", "2021-2022"],
        [56, "MT23CD32", 9, 2, "Thứ 3", 10, "07:00", "12:00", "2021-2022"],
        [57, "KT21CD31", 21, 3, "Thứ 4", 10, "13:00", "16:30", "2021-2022"],
        [58, "KT21CD31", 22, 4, "Thứ 5", 10, "10:00", "12:00", "2021-2022"],
        [59, "OT22CD31", 7, 5, "Thứ 6", 10, "13:00", "16:30", "2021-2022"],
        [60, "OT22CD31", 6, 6, "Thứ 7", 10, "13:00", "16:30", "2021-2022"]    ]
},  
    } 
};

export default database;
