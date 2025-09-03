import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Receipt, Search, ShoppingCart } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { setUserData } from "@/store/slices/userSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userData, city } = useSelector((state) => state.user);
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
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="w-full max-w-6xl mx-auto h-16 flex items-center justify-between px-4 bg-white border border-gray-200 rounded-sm shadow-sm">
        <div className="flex-shrink-0 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-primary cursor-pointer">
            Tastio
          </h1>
          <div className="flex items-center gap-1/2">
            <FaLocationDot className="text-primary text-xs" />
            <span className="font-semibold text-xs">{city}</span>
          </div>
        </div>

        {userData.role === "user" && (
          <div className="hidden md:block flex-1 max-w-2xl mx-6 relative">
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
        )}

        <div className="flex-shrink-0 flex items-center justify-center gap-2">
          {userData.role === "user" ? (
            <div className="relative">
              <ShoppingCart className="text-primary" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          ) : (
            <Button
              size={"sm"}
              variant="outline"
              className="border-2 border-primary text-primary hover:text-primary/90 hover:bg-primary/10 cursor-pointer"
            >
              <PlusCircle className="mr-0 md:mr-1" />
              <span className="hidden md:inline">Add Food Items</span>
            </Button>
          )}
          {userData.role === "user" ? (
            <Button
              size={"sm"}
              variant="outline"
              className="border-2 border-primary text-primary hover:text-primary/90 hover:bg-primary/10 cursor-pointer"
            >
              My Orders
            </Button>
          ) : (
            <div className="relative">
              <Button
                size={"sm"}
                variant="outline"
                className="border-2 border-primary text-primary hover:text-primary/90 hover:bg-primary/10 cursor-pointer"
              >
                <Receipt />
                <span className="hidden md:inline">My Orders</span>
              </Button>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-8 cursor-pointer">
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
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                My Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                {loading ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
