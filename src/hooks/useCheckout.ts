// src/hooks/useCheckout.ts
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

type CheckoutPayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cartItems: [];
  totalAmount: number;
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (data: CheckoutPayload) => axios.post("/checkout", data),
  });
};
