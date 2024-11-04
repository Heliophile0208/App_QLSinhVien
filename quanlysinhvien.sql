-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2024 at 07:35 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlysinhvien`
--

-- --------------------------------------------------------

--
-- Table structure for table `diem`
--

CREATE TABLE `diem` (
  `id` int(11) NOT NULL,
  `ma_sinh_vien` int(11) DEFAULT NULL,
  `ma_mon_hoc` int(11) DEFAULT NULL,
  `diem` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `diem`
--

INSERT INTO `diem` (`id`, `ma_sinh_vien`, `ma_mon_hoc`, `diem`) VALUES
(1, 7, 1, 9),
(2, 7, 4, 9),
(3, 7, 6, 6),
(4, 3, 8, 6),
(5, 3, 11, 7),
(6, 3, 8, 9),
(7, 3, 12, 8);

-- --------------------------------------------------------

--
-- Table structure for table `khoa`
--

CREATE TABLE `khoa` (
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `ten_khoa` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khoa`
--

INSERT INTO `khoa` (`ma_khoa`, `ten_khoa`) VALUES
('BT', 'Bảo trì hệ thống thiết bị cơ khí'),
('CG', 'Cắt gọt kim loại'),
('HA', 'Hàn'),
('NSS', 'Nguội sửa chữa máy công cụ'),
('HT', 'Chế biến thực phẩm'),
('MT', 'May thời trang'),
('CNTT', 'Công nghệ thông tin (Ứng dụng phần mềm)'),
('QTM', 'Quản trị mạng máy tính'),
('ML', 'Kỹ thuật máy lạnh và điều hoà không khí'),
('DC', 'Điện công nghiệp'),
('KT', 'Kinh Tế'),
('OT', 'Công Nghệ Ô Tô');

-- --------------------------------------------------------

--
-- Table structure for table `lop`
--

CREATE TABLE `lop` (
  `ma_lop` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `ten_lop` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `khoa_hoc` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lop`
--

INSERT INTO `lop` (`ma_lop`, `ten_lop`, `ma_khoa`, `khoa_hoc`) VALUES
('CT20CD31', 'Công Nghệ Thông Tin', 'CNTT', 'K2020'),
('MT20CD31', 'Công Nghệ May', 'MT', 'K2020'),
('KT21CD31', 'Kinh Tế', 'KT', 'K2021'),
('OT22CD31', 'Công Nghệ Ô Tô', 'OT', 'K2022'),
('MT23CD32', 'Công Nghệ May', 'MT', 'K2023'),
('HT21CD31', 'Công Nghệ Hoá', 'HT', 'K2021'),
('CT22CD31', 'Công Nghệ Thông Tin', 'CNTT', 'K2022'),
('CG22TC31', 'Cắt Gọt', 'CG', 'K2022'),
('QT22CD31', 'Quản Trị Mạng', 'QTM', 'K2022'),
('HT20TC31', 'Hoá Thực Phẩm', 'HT', 'K2020');

-- --------------------------------------------------------

--
-- Table structure for table `mon_hoc`
--

CREATE TABLE `mon_hoc` (
  `ma_mon_hoc` int(11) NOT NULL,
  `ten_mon_hoc` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `so_tin_chi` int(11) NOT NULL,
  `ma_khoa` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mon_hoc`
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
(9, 'Hóa phân tích', 3, 'HT'),
(10, 'Công nghệ thực phẩm', 2, 'HT'),
(11, 'Sinh học', 2, 'HT'),
(12, 'Quản lý chất lượng thực phẩm', 4, 'HT');

-- --------------------------------------------------------

--
-- Table structure for table `phong_hoc`
--

CREATE TABLE `phong_hoc` (
  `ma_phong` int(11) NOT NULL,
  `ten_phong` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Nha_so` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `phong_hoc`
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
-- Table structure for table `sinh_vien`
--

CREATE TABLE `sinh_vien` (
  `ma_sinh_vien` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `ho_ten` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(1) DEFAULT NULL COMMENT '0: Nữ, 1: Nam',
  `dia_chi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `so_dien_thoai` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_lop` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sinh_vien`
--

INSERT INTO `sinh_vien` (`ma_sinh_vien`, `ho_ten`, `ngay_sinh`, `gioi_tinh`, `dia_chi`, `email`, `so_dien_thoai`, `ma_lop`) VALUES
('CT20CD3140', 'Nguyễn Văn A', '2002-05-10', 1, '123 Lý Thường Kiệt, Hà Nội', 'nguyenvana@example.com', '0123456789', 'CT20CD31'),
('KT21CD3129', 'Trần Thị B', '2001-09-15', 0, '456 Đống Đa, Đà Nẵng', 'tranthib@example.com', '0987654321', 'KT21CD31'),
('HT20TC3102', 'Lê Văn C', '2000-12-20', 1, '789 Quận 1, TP.HCM', 'levanc@example.com', '0167890123', 'HT20TC31'),
('OT22CD3102', 'Phạm Thị D', '2002-08-25', 0, '111 Nguyễn Huệ, Huế', 'phamthid@example.com', '0123456788', 'OT22CD31'),
('HT20TC3112', 'Vũ Văn E', '2001-11-10', 1, '222 Trường Chinh, Hà Nội', 'vuvane@example.com', '0912345678', 'HT20TC31'),
('MT20CD3102', 'Hoàng Thị F', '2000-03-15', 0, '333 Lê Duẩn, Đà Nẵng', 'hoangthif@example.com', '0988765432', 'MT20CD31'),
('CT20CD3143', 'Lê Thị Kim Ngân', '2003-08-20', 0, 'Đồng Nai', 'lethikimngan20803@gmail.com', '0928338155', 'CT20CD31'),
('KT21CD3120', 'Trần Thị B', '2001-09-15', 0, '456 Đống Đa, Đà Nẵng', 'tranthib@example.com', '0987654321', 'KT21CD31');

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ma_sinh_vien` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`id`, `username`, `password`, `email`, `ma_sinh_vien`) VALUES
(1, 'CT20CD3143', '$2y$10$oDv2.wPaSTCGM.5iFYIrhe/byt.YVkmHZwB2i4U6rDvzEN8ZGAhFW', 'test@example.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `thoi_khoa_bieu`
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
-- Dumping data for table `thoi_khoa_bieu`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `diem`
--
ALTER TABLE `diem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ma_sinh_vien` (`ma_sinh_vien`),
  ADD KEY `ma_mon_hoc` (`ma_mon_hoc`);

--
-- Indexes for table `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`ma_khoa`);

--
-- Indexes for table `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`ma_lop`),
  ADD KEY `ma_khoa` (`ma_khoa`);

--
-- Indexes for table `mon_hoc`
--
ALTER TABLE `mon_hoc`
  ADD PRIMARY KEY (`ma_mon_hoc`),
  ADD KEY `ma_khoa` (`ma_khoa`);

--
-- Indexes for table `phong_hoc`
--
ALTER TABLE `phong_hoc`
  ADD PRIMARY KEY (`ma_phong`);

--
-- Indexes for table `sinh_vien`
--
ALTER TABLE `sinh_vien`
  ADD PRIMARY KEY (`ma_sinh_vien`),
  ADD KEY `Khoa` (`ma_lop`),
  ADD KEY `ma_lop` (`ma_lop`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `ma_sinh_vien` (`ma_sinh_vien`);

--
-- Indexes for table `thoi_khoa_bieu`
--
ALTER TABLE `thoi_khoa_bieu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ma_lop` (`ma_lop`),
  ADD KEY `fk_ma_mon_hoc` (`ma_mon_hoc`),
  ADD KEY `fk_ma_phong` (`ma_phong`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diem`
--
ALTER TABLE `diem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mon_hoc`
--
ALTER TABLE `mon_hoc`
  MODIFY `ma_mon_hoc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `phong_hoc`
--
ALTER TABLE `phong_hoc`
  MODIFY `ma_phong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thoi_khoa_bieu`
--
ALTER TABLE `thoi_khoa_bieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
