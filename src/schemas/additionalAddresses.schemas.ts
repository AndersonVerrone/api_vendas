import { z } from "zod";

const additionalAddresses = z.object({
    id: z.number(),
    address: z.string().max(60),
    address_number: z.string().max(10),
    address_complement: z.string().max(120),
    cep: z.string().max(10),
    city: z.string().max(10),
    state: z.string().max(10),
    user: z.number(),
})

export {
    additionalAddresses,
}