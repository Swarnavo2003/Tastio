import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const useGetItem = (id) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getItemInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/item/get-item/${id}`);
      if (response.data.success) {
        setItem(response.data.data);
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getItemInfo();
    }
  }, [id]);

  return { item, loading, error };
};

export default useGetItem;
