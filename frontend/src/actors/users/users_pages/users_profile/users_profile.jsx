import React from "react";
import ProfileSidebar from "../../users_components/ProfileSidebar";
import Header from "../../users_components/Header";
function ProfilePage() {
  return (
    <div style={{ display: "flex" }}>
      <ProfileSidebar />
      <Header/>
      
    </div>
  );
}

export default ProfilePage;