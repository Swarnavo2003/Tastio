import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Utensils } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-6xl mx-auto">
        {!myShopData ? (
          <div className="w-full flex items-center justify-center">
            <Card className="w-3/4 md:w-1/2">
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <div className="rounded-full w-16 p-3 bg-primary mb-2">
                    <Utensils className="text-white size-10" />
                  </div>
                  <span className="text-2xl font-semibold">
                    Add You Resturant
                  </span>
                </CardTitle>
                <CardDescription>
                  Join our delivery platform and reach thousand of hungry
                  customers every day
                </CardDescription>
                <CardFooter className="flex items-center justify-center">
                  <Button
                    onClick={() => navigate("/create-shop")}
                    className="cursor-pointer"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </CardHeader>
            </Card>
          </div>
        ) : (
          <div>Add Items To Shop</div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
