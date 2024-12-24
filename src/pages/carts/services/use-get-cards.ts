import { useQuery } from "@tanstack/react-query";
import request from "../../../configs/request";

export const fetchExampleData = async (): Promise<any> => {
    const response = await request.get("/carts");
    return response.data;
  };
  
  export const useExampleData = () => {
    return useQuery({
        queryKey: ['carts'],
        queryFn: fetchExampleData,
      });
  };