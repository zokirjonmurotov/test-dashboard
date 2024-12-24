import { useQuery } from "@tanstack/react-query";
import request from "../../configs/request";


export const useGetMe = () => {
    const requestMe = async () => { 
        const response = await request.get('/auth/me');
        return response.data;
    }
  return useQuery({queryKey: ['me-request'], queryFn: requestMe});
}