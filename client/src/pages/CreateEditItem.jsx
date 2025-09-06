import CreateItemForm from "@/components/form/CreateItemForm";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateEditItem = () => {
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
        <div>
          <CreateItemForm />
        </div>
      </div>
    </div>
  );
};

export default CreateEditItem;
