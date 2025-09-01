import { setCity } from "@/store/slices/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCity = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${
          import.meta.env.VITE_GEOAPIKEY
        }`
      );
      dispatch(setCity(result.data.results[0].city));
    });
  }, [userData]);
};

export default useGetCity;
