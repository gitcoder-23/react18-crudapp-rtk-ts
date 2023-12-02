import React from "react";
import "./App.css";
import StudentList from "./pages/crud_json_server/StudentList";
import { Route, Routes } from "react-router-dom";
import StudentDetails from "./pages/crud_json_server/StudentDetails";
import StudentAdd from "./pages/crud_json_server/components/StudentAdd";
import ToastMessage from "./components/ToastMessage";

function App() {
  return (
    <div className="container">
      <ToastMessage />
      <h1 className="m-4">React18-Crudapp-Rtk-ts</h1>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/studentadd" element={<StudentAdd />} />
        <Route path="/studentdetails/:vid" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
