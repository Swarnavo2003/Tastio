import { useSelector } from "react-redux";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pen, Utensils } from "lucide-react";
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
          <div className="w-full max-w-3xl mx-auto">
            <Card className="w-full pt-0 relative">
              <div
                onClick={() => navigate("/create-shop")}
                className="absolute top-4 right-4 cursor-pointer bg-primary p-2 rounded-full"
              >
                <Pen className="text-white size-4" />
              </div>
              <img
                src={myShopData.image.url}
                alt=""
                className="rounded-t-2xl w-fit object-cover h-80"
              />
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  {myShopData.name}
                </CardTitle>
                <CardDescription>
                  {myShopData.city}, {myShopData.state}
                  <br />
                  {myShopData.address}
                </CardDescription>
              </CardHeader>
            </Card>
            {myShopData.items.length === 0 ? (
              <div className="text-center mt-2 w-full max-w-lg mx-auto">
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                      Add Your Food Items
                    </CardTitle>
                    <CardDescription>
                      Share your delicious creation with our cutomers by adding
                      them to the menu
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-center">
                    <Button
                      onClick={() => navigate("/create-item")}
                      className="rounded-full cursor-pointer"
                    >
                      Add Food
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div>Items Are Here</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
