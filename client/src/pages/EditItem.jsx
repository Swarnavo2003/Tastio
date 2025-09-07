import EditItemForm from "@/components/form/EditItemForm";
import useGetItem from "@/hooks/useGetItem";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading } = useGetItem(id);

  if (loading) return <div>loading</div>;

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
          <EditItemForm item={item} />
        </div>
      </div>
    </div>
  );
};

export default EditItem;
