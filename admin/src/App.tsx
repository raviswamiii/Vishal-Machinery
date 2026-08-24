import { Dashboard } from "../src/Pages/Dashboard";
import { AddItem } from "../src/components/AddItem";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Dashboard />
      <Routes>
        <Route path="/addItem" element={<AddItem />} />
      </Routes>
    </div>
  );
};
