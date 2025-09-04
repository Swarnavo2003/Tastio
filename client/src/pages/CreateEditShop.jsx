import CreateShopForm from "@/components/form/CreateShopForm";
import EditShopForm from "@/components/form/EditShopForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUtensils } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CreateEditShop = () => {
  const { shopData } = useSelector((state) => state.owner);
  return (
    <div className="w-full max-w-xl mx-auto py-10">
      {shopData ? <EditShopForm /> : <CreateShopForm />}
    </div>
  );
};

export default CreateEditShop;
