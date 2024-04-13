import { z } from "zod";
import { productsSchema } from ".";

enum SalesStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

const salesSchema = z.object({
  id: z.number(),
  userId: z.number(),
  products: z.array(productsSchema),
  price: z.number(),
  quantity: z.number().int(),
  total: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  paymentMethod: z.string().max(100).optional(),
  shippingAddress: z.string().max(100),
  shippedAt: z.date(),
  deliveredAt: z.date(),
  TrackingCode: z.string().max(100).optional(),
});

export {
    salesSchema
}
