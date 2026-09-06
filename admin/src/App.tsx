import { Dashboard } from "../src/Pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const App = () => {
  return (
    <div>
      <ToastContainer />
      <Dashboard />
    </div>
  );
};
