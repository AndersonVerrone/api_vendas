import { z } from "zod";
import { commentsSchema, tagsProductsSchema } from ".";

const productsSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  description: z.string().max(255),
  photo: z.string().max(120).url(),
  stock: z.number().int(),
  price: z.number(),
  promotion: z.boolean(),
  discountPromotion: z.number().optional(),
  size: z.string().max(10).optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  length: z.number().optional(),
  weight: z.number().optional(),
  cep: z.string().max(10).optional(),
  category: z.string().min(1).max(45),
  availability: z.boolean().default(true),
  averageRating: z.number().nullable(),
  totalRatings: z.number().nullable(),
  supplier: z.string().max(120).optional(),
  comments: z.array(commentsSchema),
  active: z.boolean(),
  userId: z.number(),
  tags: z.array(tagProductsSchema)
});

const tagProductsSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  products: z.array(productsSchema)
})

export {
    productsSchema,
}