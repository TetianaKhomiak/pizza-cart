import { z } from "zod";

export const orderSchema = z.object({
  firstName: z
    .string()
    .trim()
    .refine((value) => value.length > 0, {
      message: "First Name cannot be empty",
    }),
  phoneNumber: z
    .string({
      message: "Phone number format must be +12 345 678 90 12",
    })
    .min(13, {
      message: "Phone number format must be +12 345 678 90 12",
    })
    .regex(/^\+\d{2} \d{3} \d{3} \d{2} \d{2}$/, {
      message: "Phone number format must be +12 345 678 90 12",
    }),
  address: z.string().min(5, {
    message: "Address should include both city and street",
  }),
});

export type OrderFormData = z.infer<typeof orderSchema>;
