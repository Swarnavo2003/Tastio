import { Utensils } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setMyShopData } from "@/store/slices/ownerSlice";

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

const EditItemForm = ({ item }) => {
  const [formData, setFormData] = useState({
    name: item.name || "",
    price: item.price || "",
    category: item.category || "",
    foodType: item.foodType || "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/item/edit-item/${
          item._id
        }`,
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
          foodType: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-2">
          <div className="bg-primary/30 rounded-full w-16 p-3">
            <Utensils className="text-primary size-10" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Edit Item</h1>
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
              placeholder="Enter shop name"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
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

            {formData.image ? (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Shop Image"
                  className="w-60 h-40 object-cover rounded-2xl"
                />
              </div>
            ) : (
              item &&
              item.image && (
                <div className="mt-2">
                  <img
                    src={item.image.url}
                    alt="Shop Image"
                    className="w-60 h-40 object-cover rounded-2xl"
                  />
                </div>
              )
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? "Editing Item..." : "Edit Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditItemForm;
