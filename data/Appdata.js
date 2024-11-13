// Appdata.js

const database = {
  quanlysinhvien: {
    diem: {
      columns: [
        "ma_diem",
        "ma_sinh_vien",
        "ma_mon_hoc",
        "diem",
        "ma_loai_diem",
      ],
      data: [],
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
        ["KQ", "Kết Quả"],
      ],
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
        ["DC", "Điện công nghiệp"],
      ],
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
        ["HT20TC31", "Hoá Thực Phẩm", "HT", "K2020"],
      ],
    },

    mon_hoc: {
      columns: [
        "ma_mon_hoc",
        "ten_mon_hoc",
        "so_tin_chi",
        "ma_khoa",
        "so_gio",
        "so_buoi",
        "so_tuan",
      ],
      data: [
        [1, "Lập trình PHP", 3, "CNTT", 60, 20, 10],
        [2, "Cơ sở dữ liệu", 3, "CNTT", 60, 20, 10],
        [3, "Lập trình Java", 4, "CNTT", 60, 20, 10],
        [4, "Mạng máy tính", 3, "CNTT", 60, 20, 10],
        [5, "Phát triển ứng dụng di động", 3, "CNTT", 60, 20, 10],
        [6, "Trí tuệ nhân tạo", 4, "CNTT", 60, 20, 10],
        [7, "Phân tích dữ liệu", 3, "CNTT", 60, 20, 10],
        [8, "Hóa hữu cơ", 3, "HT", 30, 10, 5],
        [9, "Hóa phân tích", 3, "HT", 30, 10, 5],
        [10, "Công nghệ thực phẩm", 2, "HT", 30, 10, 5],
        [11, "Sinh học", 2, "HT", 30, 10, 5],
        [12, "Quản lý chất lượng thực phẩm", 4, "HT", 60, 20, 10],
        [13, "Thiết kế web", 3, "CNTT", 60, 20, 10],
        [14, "Lập trình Python", 3, "CNTT", 60, 20, 10],
        [15, "Hệ điều hành", 4, "CNTT", 60, 20, 10],
        [16, "Kỹ thuật phần mềm", 3, "CNTT", 60, 20, 10],
        [17, "Lập trình C#", 3, "CNTT", 60, 20, 10],
        [18, "An toàn thông tin", 4, "CNTT", 60, 20, 10],
        [19, "Xử lý tín hiệu", 3, "CNTT", 60, 20, 10],
        [20, "Khoa học máy tính", 4, "CNTT", 60, 20, 10],
        [21, "Marketing trực tuyến", 3, "KT", 30, 10, 5],
        [22, "Quản lý dự án", 3, "KT", 60, 20, 10],
        [23, "Kinh tế vi mô", 3, "KT", 30, 10, 5],
        [24, "Kinh tế vĩ mô", 3, "KT", 30, 10, 5],
        [25, "Lý thuyết xác suất", 3, "KT", 30, 10, 5],
        [26, "Thống kê ứng dụng", 3, "KT", 30, 10, 5],
        [27, "Kế toán tài chính", 4, "KT", 60, 20, 10],
        [28, "Quản trị nhân sự", 3, "KT", 30, 10, 5],
        [29, "Quản lý sản xuất", 4, "KT", 60, 20, 10],
        [30, "Nguyên lý kế toán", 4, "KT", 60, 20, 10],
        [31, "Kỹ thuật cắt gọt", 4, "CG", 60, 20, 10],
        [32, "Công nghệ cắt gọt kim loại", 4, "CG", 60, 20, 10],
        [33, "Kỹ thuật gia công cơ khí", 4, "CG", 60, 20, 10],
        [34, "Lý thuyết cắt gọt", 3, "CG", 30, 10, 5],
        [35, "Máy cắt kim loại", 3, "CG", 30, 10, 5],
        [36, "Công nghệ chế tạo khuôn mẫu", 4, "CG", 60, 20, 10],
        [37, "Kỹ thuật điều khiển máy cắt", 3, "CG", 30, 10, 5],
        [38, "Công nghệ mài", 3, "CG", 30, 10, 5],
        [39, "Quản lý sản xuất trong gia công", 3, "CG", 30, 10, 5],
        [40, "Vật liệu cắt", 3, "CG", 30, 10, 5],
        [41, "Kỹ thuật hàn", 3, "CG", 30, 10, 5],
        [42, "Máy công cụ trong gia công", 4, "CG", 60, 20, 10],
        [43, "Kỹ thuật lập trình máy CNC", 4, "CG", 60, 20, 10],
        [44, "Công nghệ phay", 3, "CG", 30, 10, 5],
        [45, "Công nghệ tiện", 3, "CG", 30, 10, 5],
        [46, "Quản lý chất lượng trong gia công", 3, "CG", 30, 10, 5],
        [47, "Công nghệ đột dập", 3, "CG", 30, 10, 5],
        [48, "Kỹ thuật gia công kim loại bằng áp lực", 3, "CG", 30, 10, 5],
        [49, "Kỹ thuật hàn ống", 3, "CG", 30, 10, 5],
        [50, "Lý thuyết cơ khí", 3, "CG", 30, 10, 5],
      ],
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
        [15, "Phòng 205", 3],
      ],
    },
    sinh_vien: {
      columns: [
        "ma_sinh_vien",
        "ho_ten",
        "ngay_sinh",
        "gioi_tinh",
        "dia_chi",
        "email",
        "so_dien_thoai",
        "ma_lop",
      ],
      data: [
        [
          "CT20CD3123",
          "Nguyễn Văn A",
          "2002-05-10",
          1,
          "123 Lý Thường Kiệt, Hà Nội",
          "nguyenvana@example.com",
          "0123456789",
          "CT20CD31",
        ],
        [
          "KT21CD3124",
          "Trần Thị B",
          "2001-09-15",
          0,
          "456 Đống Đa, Đà Nẵng",
          "tranthib@example.com",
          "0987654321",
          "KT21CD31",
        ],
        [
          "HT20TC3112",
          "Lê Văn C",
          "2000-12-20",
          1,
          "789 Quận 1, TP.HCM",
          "levanc@example.com",
          "0167890123",
          "HT20TC31",
        ],
        [
          "OT22CD3127",
          "Phạm Thị D",
          "2002-08-25",
          0,
          "111 Nguyễn Huệ, Huế",
          "phamthid@example.com",
          "0123456788",
          "OT22CD31",
        ],
        [
          "HT20TC3120",
          "Vũ Văn E",
          "2001-11-10",
          1,
          "222 Trường Chinh, Hà Nội",
          "vuvane@example.com",
          "0912345678",
          "HT20TC31",
        ],
        [
          "MT20CT3111",
          "Hoàng Thị F",
          "2000-03-15",
          0,
          "333 Lê Duẩn, Đà Nẵng",
          "hoangthif@example.com",
          "0988765432",
          "MT20CD31",
        ],
        [
          "CT20CD3143",
          "Lê Thị Kim Ngân",
          "2003-08-20",
          0,
          "Đồng Nai",
          "lethikimngan20803@gmail.com",
          "0928338155",
          "CT20CD31",
        ],
        [
          "CG22TC3143",
          "Trần Văn G",
          "2001-03-05",
          1,
          "123 Trần Hưng Đạo, TP.HCM",
          "tranvanga@example.com",
          "0123456790",
          "CG22TC31",
        ],
        [
          "KT22CD3167",
          "Nguyễn Thị H",
          "2000-11-22",
          0,
          "456 Lê Lợi, Hà Nội",
          "nguyenh@example.com",
          "0987654322",
          "KT22CD31",
        ],
        [
          "QT22CD3154",
          "Lê Thị I",
          "2002-07-12",
          1,
          "789 Phạm Ngọc Thạch, TP.HCM",
          "lethi@example.com",
          "0167890156",
          "QT22CD31",
        ],
        [
          "QT22CD3101",
          "Phạm Thị J",
          "2003-02-17",
          0,
          "222 Cầu Giấy, Hà Nội",
          "phamthij@example.com",
          "0912345679",
          "QT22CD31",
        ],
        [
          "QT22CD3103",
          "Vũ Thị K",
          "2002-10-29",
          1,
          "333 Bến Thành, TP.HCM",
          "vuthik@example.com",
          "0988765433",
          "QT22CD31",
        ],
      ],
    },
    tai_khoan: {
      columns: ["id", "username", "password", "email", "ma_sinh_vien"],
      data: [
        [1, "admin", "123", "test@example.com", "CT20CD3123"],
        [2, "ngan", "2008", "test@example.com", "QT22CD3103"],
        [3, "bao", "2008", "test@example.com", "OT22CD3127"],
      ],
    },
    notes: {
      columns: ["ma_ghi_chu", "ma_tkb", "title", "content", "created_at"],
      data: [],
    },
    thoi_khoa_bieu: {
      columns: ["ma_tkb", "ma_lop", "ma_mon_hoc", "ma_phong", "nam_hoc","tuan_bat_dau", "tuan_ket_thuc"],
      data: [
        [1, "CT20CD31", 1, 1, "2023-2024", 1, 5],
        [2, "CT20CD31", 2, 2, "2023-2024", 3, 8],
        [3, "MT20CD31", 3, 3, "2023-2024", 2, 7],
        [4, "KT21CD31", 4, 4, "2023-2024", 4, 10],
        [5, "CT20CD31", 5, 5, "2023-2024", 6, 11],
        [6, "MT20CD31", 6, 6, "2023-2024", 5, 12],
        [7, "KT21CD31", 7, 7, "2023-2024", 8, 15],
        [8, "CT20CD31", 8, 1, "2023-2024", 9, 14],
        [9, "MT20CD31", 9, 2, "2023-2024", 7, 13],
        [10, "KT21CD31", 10, 3, "2023-2024", 12, 18],
        [11, "CT20CD31", 11, 4, "2023-2024", 11, 19],
        [12, "MT20CD31", 12, 5, "2023-2024", 10, 17],
        [13, "KT21CD31", 13, 6, "2023-2024", 15, 20],
        [14, "CT20CD31", 14, 1, "2023-2024", 16, 22],
        [15, "MT20CD31", 15, 2, "2023-2024", 18, 24],
        [16, "KT21CD31", 16, 3, "2023-2024", 14, 21],
        [17, "CT20CD31", 17, 4, "2023-2024", 19, 25],
        [18, "MT20CD31", 18, 5, "2023-2024", 20, 26],
        [19, "KT21CD31", 19, 6, "2023-2024", 22, 28],
        [20, "CT20CD31", 20, 1, "2023-2024", 21, 27],
        [21, "MT20CD31", 21, 2, "2023-2024", 23, 29],
        [22, "KT21CD31", 22, 3, "2023-2024", 24, 30],
        [23, "CT20CD31", 23, 4, "2023-2024", 25, 32],
        [24, "MT20CD31", 24, 5, "2023-2024", 26, 33],
        [25, "KT21CD31", 25, 6, "2023-2024", 27, 34],
        [26, "CT20CD31", 26, 1, "2023-2024", 28, 35],
        [27, "MT20CD31", 27, 2, "2023-2024", 30, 36],
        [28, "KT21CD31", 28, 3, "2023-2024", 31, 37],
        [29, "CT20CD31", 29, 4, "2023-2024", 29, 38],
        [30, "MT20CD31", 30, 5, "2023-2024", 32, 39],
        [31, "MT20CD31", 8, 1, "2021-2022", 3, 8],
        [32, "MT20CD31", 9, 2, "2021-2022", 4, 9],
        [33, "KT21CD31", 21, 3, "2021-2022", 2, 7],
        [34, "KT21CD31", 22, 4, "2021-2022", 1, 6],
        [35, "OT22CD31", 7, 5, "2021-2022", 5, 10],
        [36, "OT22CD31", 6, 6, "2021-2022", 3, 9],
        [37, "CG22TC31", 10, 1, "2020-2021", 2, 7],
        [38, "CG22TC31", 11, 2, "2020-2021", 4, 11],
        [39, "HT20TC31", 8, 3, "2020-2021", 5, 12],
        [40, "HT20TC31", 9, 4, "2020-2021", 7, 13],
        [41, "QT22CD31", 5, 5, "2020-2021", 6, 10],
        [42, "QT22CD31", 6, 6, "2020-2021", 8, 14],
        [43, "MT23CD32", 8, 1, "2021-2022", 2, 7],
        [44, "MT23CD32", 9, 2, "2021-2022", 4, 9],
        [45, "KT21CD31", 21, 3, "2021-2022", 3, 8],
        [46, "KT21CD31", 22, 4, "2021-2022", 1, 6],
        [47, "OT22CD31", 7, 5, "2021-2022", 5, 11],
        [48, "OT22CD31", 6, 6, "2021-2022", 2, 8],
        [49, "CG22TC31", 10, 1, "2020-2021", 4, 12],
        [50, "CG22TC31", 11, 2, "2020-2021", 6, 13],
        [51, "HT20TC31", 8, 3, "2020-2021", 5, 9],
        [52, "HT20TC31", 9, 4, "2020-2021", 3, 8],
        [53, "QT22CD31", 5, 5, "2020-2021", 1, 5],
        [54, "QT22CD31", 6, 6, "2020-2021", 7, 11],
        [55, "MT23CD32", 8, 1, "2021-2022", 4, 10],
        [56, "MT23CD32", 9, 2, "2021-2022", 5, 12],
        [57, "KT21CD31", 21, 3, "2021-2022", 2, 7],
        [58, "KT21CD31", 22, 4, "2021-2022", 3, 8],
        [59, "OT22CD31", 7, 5, "2021-2022", 4, 9],
        [60, "OT22CD31", 6, 6, "2021-2022", 6, 12],
      ],
    },
  },
};

export default database;
