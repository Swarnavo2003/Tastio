import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import Home from "./pages/Home";

function App() {
  const { user, loading } = useGetCurrentUser();
  if (!loading) console.log("User", user);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
