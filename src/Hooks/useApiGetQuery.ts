import { useQuery } from "@tanstack/react-query";
import api from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

interface IApiGetQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig
}

const useApiGetQuery = ({queryKey,url,config}:IApiGetQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get(url,config);
      return data.todos;
    },
  });
};
export default useApiGetQuery;
