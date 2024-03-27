"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateList } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, boardId, id } = data;

    let list;

    try {
        
        list = await db.list.update({ data: { title }, where: { id, boardId, board: { orgId } } });

    } catch (error) {
        return {
            error: "Failed to update"
        }
    }

    revalidatePath(`/board/${boardId}`)

    return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler);