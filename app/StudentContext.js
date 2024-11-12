// StudentContext.js
import React, { createContext, useContext, useState } from 'react';

// Tạo context
const StudentContext = createContext();

// Custom hook để dùng context dễ dàng
export const useStudent = () => useContext(StudentContext);

// Provider để bao bọc app và cung cấp dữ liệu cho toàn bộ app
export const StudentProvider = ({ children }) => {
  const [maSinhVien, setMaSinhVien] = useState(null);

  return (
    <StudentContext.Provider value={{ maSinhVien, setMaSinhVien }}>
      {children}
    </StudentContext.Provider>
  );
};