import React from "react";
import ProfileSidebar from "../../users_components/profile/ProfileSidebar";
import Header from "../../users_components/layout/Header";
function ProfilePage() {
  return (
    <div style={{ display: "flex" }}>
      <ProfileSidebar />
      <Header/>
    </div>
  );
}

export default ProfilePage;