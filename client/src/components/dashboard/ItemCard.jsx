import { Pen, Trash2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
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
                <div className="bg-primary rounded-full p-2">
                  <Trash2 className="cursor-pointer size-4 text-white" />
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
