import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: { cardId: string } }) {
    try {
        const { userId, orgId } = auth()

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const audit = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        })

        return NextResponse.json(audit)
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}