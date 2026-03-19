import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../actors/users/users_pages/users_profile/users_profile";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
    </Routes>
  );
}