import { axiosInstance } from "@/lib/axios";
import { setUserData } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/current-user");
      dispatch(setUserData(response.data.data));
      setUser(response.data.data);
      setError(null);
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

  return { user, loading, error, refetch: fetchUser };
};

export default useGetCurrentUser;
