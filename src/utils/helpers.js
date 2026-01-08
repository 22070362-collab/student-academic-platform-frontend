// Tính điểm trung bình
export const calculateAverage = (mid, final) => {
  if (mid === "" || final === "") return "";
  return ((Number(mid) * 0.4 + Number(final) * 0.6)).toFixed(2);
};

// Tính % chuyên cần
export const calculateAttendancePercent = (present, total) => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};

// Format ngày
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN");
};

// Kiểm tra role
export const isStudent = (user) => user?.role === "student";
export const isLecturer = (user) => user?.role === "lecturer";
export const isAdmin = (user) => user?.role === "admin";
