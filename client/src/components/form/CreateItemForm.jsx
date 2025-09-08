import { Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { setMyShopData } from "@/store/slices/ownerSlice";
import { toast } from "sonner";

const categories = [
  "Snacks",
  "Main Course",
  "Desserts",
  "Pizza",
  "Burgers",
  "Sandwiches",
  "South Indian",
  "North Indian",
  "Chinese",
  "Fast Food",
  "Others",
];

const foodTypes = ["Veg", "Non-Veg"];

const CreateItemForm = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    foodType: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategorySelect = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleFoodTypeSelect = (value) => {
    setFormData({ ...formData, foodType: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("price", formData.price.trim());
      form.append("category", formData.category.trim());
      form.append("foodType", formData.foodType.trim());
      if (formData.image) {
        form.append("image", formData.image);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/item/create-item`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setMyShopData(response.data.data));
        toast.success(response.data.message);
        navigate("/");
        setFormData({
          name: "",
          price: "",
          category: "",
          footType: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!myShopData) navigate("/");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-2">
          <div className="bg-primary/30 rounded-full w-16 p-3">
            <Utensils className="text-primary size-10" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Create Item</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="text"
              name="price"
              onChange={handleInputChange}
              placeholder="Enter price"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategorySelect}
              >
                <SelectTrigger className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Food Type</Label>
              <Select
                value={formData.foodType}
                onValueChange={handleFoodTypeSelect}
              >
                <SelectTrigger className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {foodTypes.map((foodType) => (
                    <SelectItem key={foodType} value={foodType}>
                      {foodType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            <Input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="cursor-pointer"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? "Creating Item..." : "Create Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateItemForm;
