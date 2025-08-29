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
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setStep(3);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          {step === 1 && (
            <>
              <div className="flex items-center gap-2">
                <ChevronLeft
                  onClick={() => navigate("/login")}
                  className="size-5 cursor-pointer"
                />
                <CardTitle>Forgot Password</CardTitle>
              </div>
              <CardDescription>
                Enter your email to reset your password
              </CardDescription>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-2">
                <ChevronLeft onClick={() => setStep(1)} className="size-5" />
                <CardTitle>Enter OTP</CardTitle>
              </div>
              <CardDescription>
                Enter the OTP send in your email
              </CardDescription>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center gap-2">
                <ChevronLeft onClick={() => setStep(2)} className="size-5" />
                <CardTitle>Enter New Password</CardTitle>
              </div>
              <CardDescription>Enter your new password</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="">
                  Send OTP
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-2">
              <div className="space-y-1">
                <Label>OTP</Label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="email"
                  className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex justify-end">
                <Button className="">Send OTP</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-4">
              <div className="space-y-2 ">
                <Label>Password</Label>
                <Input
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2 relative">
                <Label>Confirm Password</Label>
                <Input
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  name="confirmPassword"
                  className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button className="w-full">Reset Password</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
