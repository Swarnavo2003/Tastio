import { useSelector } from "react-redux";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-6xl mx-auto">
        {!myShopData ? (
          <div>Create Shop Form</div>
        ) : (
          <div>Add Items To Shop</div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
