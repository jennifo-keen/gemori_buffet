import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userJson = localStorage.getItem("user") || sessionStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    // Nếu có yêu cầu role cụ thể (ví dụ chỉ admin mới được vào)
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/admin/login" replace />; // Hoặc trang login
    }

    return children;
};

export default ProtectedRoute;