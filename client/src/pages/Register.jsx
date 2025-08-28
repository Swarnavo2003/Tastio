import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.mobile ||
      !formData.role
    ) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          mobile: "",
          role: "user",
        });
        setShowPassword(false);
        navigate("/");
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">
            Tastio
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm font-semibold">
            Create an account to start using Tastio today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <Input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <p className="font-light text-sm cursor-pointer">
                  Forgot Password?
                </p>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="size-5 absolute right-4 top-10 -translate-y-1/4"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="size-5 absolute right-4 top-10 -translate-y-1/4"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-3 gap-2">
                {["user", "owner", "deliveryBoy"].map((role, index) => (
                  <Button
                    type="button"
                    variant={formData.role === role ? "default" : "outline"}
                    key={index}
                    value={role}
                    onClick={handleRoleChange}
                    className={`border-2 border-primary text-primary cursor-pointer ${
                      role === formData.role ? "text-white" : ""
                    }
                      `}
                  >
                    <span>{role}</span>
                  </Button>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-1" />
                  Loading...
                </>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
          <Separator className="my-2" />
          <Button variant={"outline"} className="w-full cursor-pointer">
            <FcGoogle />
            Register with Google
          </Button>
          <p className="text-center mt-2 text-sm">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
