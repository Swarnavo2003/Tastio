import { Loader2, Pen, Trash2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setMyShopData } from "@/store/slices/ownerSlice";
import { useState } from "react";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/item/delete-item/${item._id}`
      );
      if (response.data.success) {
        dispatch(setMyShopData(response.data.data));
        toast.success(response.data.message || "Item Deleted Successfully!");
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <img
            src={item.image.url}
            alt={item.name}
            className="w-30 h-22 rounded-lg"
          />
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
            <CardDescription>{item.category}</CardDescription>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-2xl">₹{item.price}</p>
              <div className="flex gap-2">
                <div
                  className="bg-primary rounded-full p-2"
                  onClick={() => navigate(`/edit-item/${item._id}`)}
                >
                  <Pen className="cursor-pointer size-4 text-white" />
                </div>
                <div
                  onClick={handleDelete}
                  className="bg-primary rounded-full p-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-white size-4" />
                  ) : (
                    <Trash2 className="cursor-pointer size-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ItemCard;
