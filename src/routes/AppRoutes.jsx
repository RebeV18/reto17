import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Create } from "../pages/Create/Create";
import { Navbar } from "../components/Navbar/Navbar";

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
};
