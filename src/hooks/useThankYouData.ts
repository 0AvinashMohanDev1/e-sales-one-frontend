// src/hooks/useThankYouData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useOrderDetails = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order-details", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const { data } = await axios.get(`/order/${orderId}`);
      return data;
    },
  });
};
