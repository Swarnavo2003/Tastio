import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import CreateEditShop from "./pages/CreateEditShop";
import EditItem from "./pages/EditItem";
import CreateItem from "./pages/CreateItem";

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
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/create-shop" element={<CreateEditShop />} />
      <Route path="/create-item" element={<CreateItem />} />
      <Route path="/edit-item/:id" element={<EditItem />} />
    </Routes>
  );
}

export default App;
