import { createBoard } from "@/actions/create-board"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import Form from "./_components/Form";


const OrganizationIdPage = async ({ params }: { params: { organizationId: string } }) => {

    const boards = await db.board.findMany();

    return (
        <div>
            <Form />
            <div className="space-y-2">
                {
                    boards.map((board) => (
                        <div key={board.id}>
                            Board Name: {board.title}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OrganizationIdPage