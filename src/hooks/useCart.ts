// src/hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
// import { CartItem } from "@/types/cart";

const CART_QUERY_KEY = ["cart-items"];

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => axios.post("/cart", item),
    onSuccess: () => {
      queryClient.invalidateQueries(CART_QUERY_KEY);
    },
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const { data } = await axios.get("/cart");
      return data;
    },
  });
};
