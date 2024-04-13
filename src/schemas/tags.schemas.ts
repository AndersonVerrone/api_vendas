import { z } from "zod";
import { productsSchema } from "./products.schemas";

const tagsProductsSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    products: z.array(productsSchema)
})

export {
    tagsProductsSchema
}