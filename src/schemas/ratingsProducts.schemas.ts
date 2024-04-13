import { z } from "zod";

const ratingsProductsSchema = z.object({
    id: z.number(),
    rating: z.number(),
    user: z.number(),
    product: z.number(),
})

export {
    ratingsProductsSchema,
}