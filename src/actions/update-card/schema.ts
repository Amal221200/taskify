import { z } from "zod";

export const UpdateCard = z.object({
    title: z.string({ required_error: "Title is required", invalid_type_error: "Title is required" }),
    id: z.string(),
    boardId: z.string(),
    description: z.optional(z.string().min(3))
    
})