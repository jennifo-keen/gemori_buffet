import React from "react";
import { Box } from "@mui/material";
import Header from "../../users_components/layout/Header";
import HeroSection from "../../users_components/home/HeroSection";
import BuffetSection from "../../users_components/home/BuffetSection";
import PromoteSection from "../../users_components/home/PromoteSection";
import AboutSection from "../../users_components/home/AboutSection";
import FeedBackSection from "../../users_components/home/FeedBackSection";
import Footer from "../../users_components/layout/Footer";
function Home() {
  return (
    <Box sx={{backgroundColor: "#FFF7F3",}}>
      <HeroSection />
      <BuffetSection />
      <PromoteSection />
      <AboutSection />
      <FeedBackSection />
    </Box>
  );
}

export default Home;