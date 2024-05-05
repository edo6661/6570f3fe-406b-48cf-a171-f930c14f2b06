import { errHandler } from "@/utils/errHandler";
import { data } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useModalContext } from "./useModalContext";

export const useDataById = () => {
  const { setInitialData, selectedIds } = useModalContext();
  const selectedIdThatTrue = Object.entries(selectedIds)
    .filter(([_key, value]) => value === true)
    .map(([key]) => key)
    .toString();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["data", selectedIdThatTrue],
    queryFn: async () => {
      try {
        const { data } = await axios.get<data>(
          `/api/data?id=${selectedIdThatTrue}`
        );
        setInitialData(data);
      } catch (err) {
        errHandler(err, "Error fetching data by id");
      }
    },
    enabled: !!selectedIdThatTrue,
  });
  return { data, isLoading, isError, error, refetch };
};
