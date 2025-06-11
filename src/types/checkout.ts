import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .min(1, "Full Name is required"),
  email: z
    .string({
      required_error: "Invalid email",
    })
    .email("Invalid email"),
  phone: z
    .string({
      required_error: "Phone must be 10 digits",
    })
    .regex(/^\d{10}$/, "Phone must be 10 digits"),
  address: z.string({
    required_error: "Address is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  state: z.string({
    required_error: "State is required",
  }),
  zip: z
    .string({
      required_error: "ZIP is required",
    })
    .regex(/^\d{5,6}$/, "Invalid ZIP"),
  cardNumber: z
    .string({ required_error: "Must be 16 digits" })
    .regex(/^\d{16}$/, "Must be 16 digits"),
  expiryDate: z
    .string({
      required_error: "Date is required",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in future",
    }),
  cvv: z
    .string({
      required_error: "Must be 3 digits",
    })
    .regex(/^\d{3}$/, "Must be 3 digits"),
});
