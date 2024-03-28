import { z } from "zod";

export const UpdateCard = z.object({
    id: z.string(),
    boardId: z.string(),
    title: z.optional(z.string({ required_error: "Title is required", invalid_type_error: "Title is required" }).min(3)),
    description: z.optional(z.string().min(3))
    
})