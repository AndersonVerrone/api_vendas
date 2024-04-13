import { z } from "zod";

const favoritesSchema = z.object({
    id: z.number(),
    user: z.number(),
    product: z.number(),
})

export {
    favoritesSchema,
}