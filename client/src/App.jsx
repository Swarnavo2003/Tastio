import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import CreateEditShop from "./pages/CreateEditShop";

function App() {
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/register"
        element={!userData ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/create-shop" element={<CreateEditShop />} />
    </Routes>
  );
}

export default App;
