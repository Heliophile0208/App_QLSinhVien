-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 04, 2024 lúc 06:02 AM
-- Phiên bản máy phục vụ: 5.7.34
-- Phiên bản PHP: 8.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlysinhvien`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem`
--

CREATE TABLE `diem` (
  `id` int(11) NOT NULL,
  `ma_sinh_vien` int(11) DEFAULT NULL,
  `ma_mon_hoc` int(11) DEFAULT NULL,
  `diem` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Khoa`
--

CREATE TABLE `Khoa` (
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `ten_khoa` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `Khoa`
--

INSERT INTO `Khoa` (`ma_khoa`, `ten_khoa`) VALUES
('BT', 'Bảo trì hệ thống thiết bị cơ khí'),
('CG', 'Cắt gọt kim loại'),
('HA', 'Hàn'),
('NSS', 'Nguội sửa chữa máy công cụ'),
('HT', 'Chế biến thực phẩm'),
('MTT', 'May thời trang'),
('CNTT', 'Công nghệ thông tin (Ứng dụng phần mềm)'),
('QTM', 'Quản trị mạng máy tính'),
('ML', 'Kỹ thuật máy lạnh và điều hoà không khí'),
('DC', 'Điện công nghiệp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lop`
--

CREATE TABLE `lop` (
  `ma_lop` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `ten_lop` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `khoa_hoc` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lop`
--

INSERT INTO `lop` (`ma_lop`, `ten_lop`, `ma_khoa`, `khoa_hoc`) VALUES
('CT20CD31', 'Công Nghệ Thông Tin', '', 'K2020'),
('MT20CD31', 'Công Nghệ May', '', 'K2020'),
('KT21CD31', 'Kinh Tế', '', 'K2021'),
('OT22CD31', 'Công Nghệ Ô Tô', '', 'K2022'),
('MT23CD32', 'Công Nghệ May', '', 'K2023'),
('HT21CD31', 'Công Nghệ Hoá', '', 'K2021'),
('CT22CD31', 'Công Nghệ Thông Tin', '', 'K2022'),
('CG22TC31', 'Cắt Gọt', '', 'K2022'),
('QT22CD31', 'Quản Trị Mạng', '', 'K2022'),
('HT20TC31', 'Hoá Thực Phẩm', '', 'K2020');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mon_hoc`
--

CREATE TABLE `mon_hoc` (
  `ma_mon_hoc` int(11) NOT NULL,
  `ten_mon_hoc` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `so_tin_chi` int(11) NOT NULL,
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `mon_hoc`
--

INSERT INTO `mon_hoc` (`ma_mon_hoc`, `ten_mon_hoc`, `so_tin_chi`, `ma_khoa`) VALUES
(1, 'Lập trình PHP', 3, 'CNTT'),
(2, 'Cơ sở dữ liệu', 3, 'CNTT'),
(3, 'Lập trình Java', 4, 'CNTT'),
(4, 'Mạng máy tính', 3, 'CNTT'),
(5, 'Phát triển ứng dụng di động', 3, 'CNTT'),
(6, 'Trí tuệ nhân tạo', 4, 'CNTT'),
(7, 'Phân tích dữ liệu', 3, 'CNTT'),
(8, 'Hóa hữu cơ', 3, 'HT'),
(9, 'óa phân tích', 3, 'HT'),
(10, 'Công nghệ thực phẩm', 2, 'HT'),
(11, 'Sinh học', 2, 'HT'),
(12, 'Quản lý chất lượng thực phẩm', 4, 'HT');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phong_hoc`
--

CREATE TABLE `phong_hoc` (
  `ma_phong` int(11) NOT NULL,
  `ten_phong` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Nha_so` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phong_hoc`
--

INSERT INTO `phong_hoc` (`ma_phong`, `ten_phong`, `Nha_so`) VALUES
(1, 'Phòng 101', 3),
(2, 'Phòng 102', 3),
(3, 'Phòng 103', 3),
(4, 'Phòng 104', 3),
(5, 'Phòng 105', 3),
(6, 'Phòng 106', 3),
(7, 'Phòng Máy 1', 2),
(8, 'Phòng Máy 2', 2),
(9, 'Phòng Máy 3', 2),
(10, 'Phòng Máy 4', 2),
(11, 'Phòng Máy 4', 2),
(12, 'Phòng Máy 5', 2),
(13, 'Phòng Máy 6', 2),
(14, 'Phòng Máy 7', 2),
(15, 'Phòng 204', 3),
(16, 'Phòng 205', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sinh_vien`
--

CREATE TABLE `sinh_vien` (
  `ma_sinh_vien` int(11) NOT NULL,
  `ho_ten` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(1) DEFAULT NULL COMMENT '0: Nữ, 1: Nam',
  `dia_chi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `so_dien_thoai` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_lop` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sinh_vien`
--

INSERT INTO `sinh_vien` (`ma_sinh_vien`, `ho_ten`, `ngay_sinh`, `gioi_tinh`, `dia_chi`, `email`, `so_dien_thoai`, `ma_lop`) VALUES
(1, 'Nguyễn Văn A', '2002-05-10', 1, '123 Lý Thường Kiệt, Hà Nội', 'nguyenvana@example.com', '0123456789', 'CT20CD31'),
(2, 'Trần Thị B', '2001-09-15', 0, '456 Đống Đa, Đà Nẵng', 'tranthib@example.com', '0987654321', 'KT21CD31'),
(3, 'Lê Văn C', '2000-12-20', 1, '789 Quận 1, TP.HCM', 'levanc@example.com', '0167890123', 'HT20TC31'),
(4, 'Phạm Thị D', '2002-08-25', 0, '111 Nguyễn Huệ, Huế', 'phamthid@example.com', '0123456788', 'OT22CD31'),
(5, 'Vũ Văn E', '2001-11-10', 1, '222 Trường Chinh, Hà Nội', 'vuvane@example.com', '0912345678', 'HT20TC31'),
(6, 'Hoàng Thị F', '2000-03-15', 0, '333 Lê Duẩn, Đà Nẵng', 'hoangthif@example.com', '0988765432', 'MT20CD31'),
(7, 'Lê Thị Kim Ngân', '2003-08-20', 0, 'Đồng Nai', 'lethikimngan20803@gmail.com', '0928338155', 'CT20CD31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ma_sinh_vien` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`id`, `username`, `password`, `email`, `ma_sinh_vien`) VALUES
(1, 'testuser', '$2y$10$oDv2.wPaSTCGM.5iFYIrhe/byt.YVkmHZwB2i4U6rDvzEN8ZGAhFW', 'test@example.com', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thoi_khoa_bieu`
--

CREATE TABLE `thoi_khoa_bieu` (
  `id` int(11) NOT NULL,
  `ma_lop` int(11) DEFAULT NULL,
  `ma_mon_hoc` int(11) DEFAULT NULL,
  `ma_phong` int(11) DEFAULT NULL,
  `ngay_hoc` date DEFAULT NULL,
  `gio_bat_dau` time DEFAULT NULL,
  `gio_ket_thuc` time DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thoi_khoa_bieu`
--

INSERT INTO `thoi_khoa_bieu` (`id`, `ma_lop`, `ma_mon_hoc`, `ma_phong`, `ngay_hoc`, `gio_bat_dau`, `gio_ket_thuc`) VALUES
(1, 1, 1, 1, '2024-11-10', '08:00:00', '10:00:00'),
(2, 1, 2, 2, '2024-11-11', '10:00:00', '12:00:00'),
(3, 2, 3, 3, '2024-11-12', '08:00:00', '11:00:00'),
(4, 3, 4, 1, '2024-11-13', '13:00:00', '15:00:00'),
(5, 2, 5, 2, '2024-11-14', '09:00:00', '11:00:00'),
(6, 3, 6, 1, '2024-11-15', '13:00:00', '15:00:00'),
(7, 4, 7, 3, '2024-11-16', '08:00:00', '10:00:00'),
(8, 5, 8, 4, '2024-11-17', '10:00:00', '12:00:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `diem`
--
ALTER TABLE `diem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_sinh_vien` (`ma_sinh_vien`),
  ADD KEY `ma_mon_hoc` (`ma_mon_hoc`);

--
-- Chỉ mục cho bảng `Khoa`
--
ALTER TABLE `Khoa`
  ADD PRIMARY KEY (`ma_khoa`);

--
-- Chỉ mục cho bảng `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`ma_lop`),
  ADD KEY `ma_khoa` (`ma_khoa`);

--
-- Chỉ mục cho bảng `mon_hoc`
--
ALTER TABLE `mon_hoc`
  ADD PRIMARY KEY (`ma_mon_hoc`),
  ADD KEY `ma_khoa` (`ma_khoa`);

--
-- Chỉ mục cho bảng `phong_hoc`
--
ALTER TABLE `phong_hoc`
  ADD PRIMARY KEY (`ma_phong`);

--
-- Chỉ mục cho bảng `sinh_vien`
--
ALTER TABLE `sinh_vien`
  ADD PRIMARY KEY (`ma_sinh_vien`),
  ADD KEY `Khoa` (`ma_lop`),
  ADD KEY `ma_lop` (`ma_lop`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `ma_sinh_vien` (`ma_sinh_vien`);

--
-- Chỉ mục cho bảng `thoi_khoa_bieu`
--
ALTER TABLE `thoi_khoa_bieu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ma_lop` (`ma_lop`),
  ADD KEY `fk_ma_mon_hoc` (`ma_mon_hoc`),
  ADD KEY `fk_ma_phong` (`ma_phong`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `diem`
--
ALTER TABLE `diem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `mon_hoc`
--
ALTER TABLE `mon_hoc`
  MODIFY `ma_mon_hoc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `phong_hoc`
--
ALTER TABLE `phong_hoc`
  MODIFY `ma_phong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `sinh_vien`
--
ALTER TABLE `sinh_vien`
  MODIFY `ma_sinh_vien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `thoi_khoa_bieu`
--
ALTER TABLE `thoi_khoa_bieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
