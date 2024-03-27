import { ReactNode } from 'react'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Metadata } from 'next'
import BoardNavbar from './_components/BoardNavbar'

export async function generateMetadata({ params }: { params: { boardId: string } }): Promise<Metadata> {
    const { orgId } = auth()

    if (!orgId) {
        return {
            title: "Board"
        }
    }

    const board = await db.board.findUnique({ where: { id: params.boardId, orgId } })

    return {
        title: board?.title || "Board"
    }
}

const BoardIdLayout = async ({ children, params }: { children: ReactNode, params: { boardId: string } }) => {

    const { orgId } = auth()

    if (!orgId) {
        return redirect("/select-org")
    }

    const board = await db.board.findUnique({ where: { id: params.boardId, orgId } })

    if (!board) {
        notFound()
    }

    return (
        <div className='relative h-full bg-no-repeat bg-cover bg-center' style={{
            backgroundImage: `url(${board.imageFullUrl})`
        }}>
            <div className='absolute inset-0 bg-black/10' />
            <BoardNavbar  board={board} />
            <main className='relative pt-28 h-full'>
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout