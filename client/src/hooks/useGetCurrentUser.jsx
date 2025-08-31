import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/current-user");
      setUser(response.data.data);
    } catch (error) {
      setError(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useGetCurrentUser;
