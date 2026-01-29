import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFm = async (args) => {
    try {
      setIsLoading(true);
      await delayFn();
      const response = await callback(args);

      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFm, isLoading, error];
};
