import DeliveryBoyDashboard from "@/components/dashboard/DeliveryBoyDashboard";
import Navbar from "@/components/dashboard/Navbar";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import useGetCity from "@/hooks/useGetCity";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import useGetMyShop from "@/hooks/useGetMyShop";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { loading } = useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  useGetCity();
  useGetMyShop();

  const isLoading = loading || !userData;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen pt-24 flex flex-col items-center bg-gray-100">
        {!userData && <Navigate to="/register" />}
        {userData.role === "user" && <UserDashboard />}
        {userData.role === "owner" && <OwnerDashboard />}
        {userData.role === "deliveryBoy" && <DeliveryBoyDashboard />}
      </div>
    </>
  );
};

export default Home;
