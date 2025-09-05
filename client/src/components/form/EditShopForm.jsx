import { Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyShopData } from "@/store/slices/ownerSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditShopForm = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: myShopData?.name || "",
    city: myShopData?.city || "",
    state: myShopData?.state || "",
    address: myShopData?.address || "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      form.append("city", formData.city.trim());
      form.append("state", formData.state.trim());
      form.append("address", formData.address.trim());
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/shop/update-shop`,
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
        setFormData({
          name: "",
          city: "",
          state: "",
          address: "",
          image: null,
        });
        navigate("/");
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
          <h1 className="text-2xl font-semibold text-primary">Edit Shop</h1>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label>State</Label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
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
              myShopData &&
              myShopData.image && (
                <div className="mt-2">
                  <img
                    src={myShopData.image.url}
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
            {loading ? "Editing Shop..." : "Edit Shop"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditShopForm;
