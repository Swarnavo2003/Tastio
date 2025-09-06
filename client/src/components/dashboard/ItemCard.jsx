import { Pen } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ItemCard = ({ item }) => {
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
              <div className="bg-primary rounded-full p-2">
                <Pen className="cursor-pointer size-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ItemCard;
