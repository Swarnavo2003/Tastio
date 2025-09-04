import CreateShopForm from "@/components/form/CreateShopForm";
import EditShopForm from "@/components/form/EditShopForm";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateEditShop = () => {
  const { shopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div
        className="absolute top-10 left-10 cursor-pointer p-2 bg-primary/30 rounded-full"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="text-primary" />
      </div>
      <div className="w-full max-w-xl md:max-w-3xl mx-auto py-10">
        <div>{shopData ? <EditShopForm /> : <CreateShopForm />}</div>
      </div>
    </div>
  );
};

export default CreateEditShop;
