import React, { createContext, useContext, useState } from 'react';

// Tạo context để quản lý maSinhVien
const StudentContext = createContext();

// Tạo Provider để cung cấp context cho các component con
export const StudentProvider = ({ children }) => {
  const [maSinhVien, setMaSinhVien] = useState(null);

  return (
    <StudentContext.Provider value={{ maSinhVien, setMaSinhVien }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook để dễ dàng truy cập context
export const useStudent = () => useContext(StudentContext);
