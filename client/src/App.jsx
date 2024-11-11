import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}
