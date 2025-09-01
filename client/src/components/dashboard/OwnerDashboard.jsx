import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { setUserData } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.data.success) {
        dispatch(setUserData(null));
        toast.success(response.data.message || "Logged out successfully!");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-20 flex items-center justify-between px-5 fixed top-0 z-50 bg-gray-100 border-b">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary">Tastio</h1>
      </div>

      {/* Center - Search Input */}
      <div className="flex-1 max-w-md mx-4 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for restaurants, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* Right side - Avatar */}
      <div className="flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={userData?.image?.url}
                alt={userData?.fullName || "User"}
              />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {getInitials(userData?.fullName)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleLogout}
              className={"cursor-pointer"}
            >
              {loading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default OwnerDashboard;
