import { create } from "@/actions/create-board"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"


const OrganizationIdPage = async ({ params }: { params: { organizationId: string } }) => {

    const boards = await db.board.findMany();

    return (
        <div>
            <form action={create}>
                <input type="title" name="title" required placeholder="Enter a board title" className="border border-black" />
                <Button type="submit">
                    Submit
                </Button>
            </form>
            <div className="space-y-2">
                {
                    boards.map((board)=> (
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