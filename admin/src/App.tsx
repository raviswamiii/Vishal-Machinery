import { Dashboard } from "../src/Pages/Dashboard";
import { AddItem } from "../src/components/AddItem";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const App = () => {
  return (
    <div>
      <ToastContainer />
      <Dashboard />
      <Routes>
        <Route path="/addItem" element={<AddItem />} />
      </Routes>
    </div>
  );
};
