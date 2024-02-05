"use client"

import Review from "@/components/Review/Review";
import All from "@/components/Social/All";
import Banner from "@/components/banner/banner";
import Chatbot from "@/components/chatbot/chatbot";
import DrawerAppBar from "@/components/shared/Navbar/Navbar";
import Count from "@/components/shared/count/Count";
import Footer from "@/components/shared/footer/Footer";
import Logo from "@/components/shared/logo/Logo";
import { Box, Container, Divider } from "@mui/material";
import Discuss from "./discussion/Discuss";


// import PostSection from "@/components/ui/PostSection/PostSection";

const HomePage = () => {
  return (
    <Box sx={{ maxWidth: "xl", mx: "auto" }} >
      <DrawerAppBar></DrawerAppBar>
      <Divider sx={{ backgroundColor: 'white',paddingTop:'45px' }} />
      <Banner></Banner>
      <Discuss></Discuss>
      {/* <Chatbot></Chatbot>
      <Review></Review>
      <All></All>
      <Count></Count>
      <Logo></Logo>
      <Footer></Footer> */}
    </Box>
  );
};

export default HomePage;
