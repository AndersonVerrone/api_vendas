import { z } from "zod";

const commentsSchema = z.object({
    id: z.number(),
    comments: z.string(),
    user: z.number(),
    product: z.number(),
})

export {
    commentsSchema
}