import { Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { Machines } from "./pages/Machines";
import { AboutUs } from "./pages/AboutUs";
import { Contact } from "./pages/Contact";
import { ScrollToTop } from "./components/ScrollToTop";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { SideBar } from "./components/SideBar";

export const App = () => {
  const location = useLocation();

  const hideNavbarAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <ScrollToTop />

      {!hideNavbarAndFooter && <Navbar />}
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>

      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};