import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { cardId: string } }) {
    try {
        const { orgId, userId } = auth()

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const card = await db.card.findUnique({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        orgId
                    }
                }
            },
            include: {
                list: {
                    select: {
                        title: true
                    }
                }
            }
        });

        return NextResponse.json(card);
    } catch (error) {
        return new NextResponse("Internal server error", { status: 500 })
    }
}