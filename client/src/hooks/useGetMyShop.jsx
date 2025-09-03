import { axiosInstance } from "@/lib/axios";
import { setMyShopData } from "@/store/slices/ownerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetMyShop = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const fetchShop = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/shop/get-shop");
      console.log(response.data);
      dispatch(setMyShopData(response.data.data));
      setShop(response.data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  return { shop, loading, error, refetch: fetchShop };
};

export default useGetMyShop;
