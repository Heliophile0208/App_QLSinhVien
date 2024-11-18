# App Quản Lý Sinh Viên ( Đang Phát Triển )

Ứng dụng **Quản Lý Sinh Viên** (App_QLSinhVien) là một công cụ đơn giản giúp quản lý thông tin sinh viên trong một hệ thống.

## Tính năng

- **Đăng nhập, đăng kí, đổi mật khẩu, tạo tài khoản**: Cung cấp các chức năng cơ bản cho trang đăng nhập.
- **Hiển thị danh sách sinh viên**: Liệt kê tất cả sinh viên cùng lớp với sinh viên đang đăng nhập.
- **Hiển thị thông tin sinh viên**: Xem chi tiết thông tin của sinh viên đang đăng nhập, bao gồm thông tin cơ bản và điểm số.
- **Xem thời khoá biểu**: Hiển thị thời khoá biểu của sinh viên, với khả năng lọc các buổi học.

## Cài đặt

#### Bước 1: Cài đặt môi trường phát triển
 Các phần mềm cần thiết trong quá trình phát triển
- **Node.js**, **Android Studio** và **Visual Studio Code**

 Thư viện cần thiết cho Expo Router
+ npm install expo
+ npm install -g expo-cli
+ npm install @react-navigation/native
+ npm install react-native-screens react-native-safe-area-context
+ npm install @react-navigation/stack
+ npm install expo-router
+ npm install react-native-gesture-handler react-native-reanimated
+ npx expo install react-native-screens
+ npx expo install expo-linking
+ npx expo install expo-constants
+ npx expo install expo-status-bar
+ npx expo install react-native-gesture-handler

#### Bước 2: Cài đặt các Extension trong Visual Studio Code

- **ES7 + React/Redux/React-Native snippets**
- **React Native Tools**
- **Babel JavaScript**
- Các extension khác hỗ trợ phát triển...

#### Bước 3: Tạo Folder dự án
+ Mở hộp thoại Terminal ( Windows + R -> Nhập CMD ) hoặc PowerShell ( Windows + X -> Tìm PowerShell )
+ Tạo dự án trong ổ đĩa cần lưu: expo init my-new-project
+ Điều hướng đến folder vừa tạo: cd my-new-project
+ Chạy dự án trên máy ảo: npx expo start

#### Bước 4: Mở và chạy dự án sinh viên

- Sửa file app.json:
 "scheme": "myapp" -> **"scheme": "your-app-scheme"**
- Dán **app**, **context** và **data** vào folder dự án của bạn
  
## Clone dự án
```bash
git clone https://github.com/Heliophile0208/App_QLSinhVien.git
