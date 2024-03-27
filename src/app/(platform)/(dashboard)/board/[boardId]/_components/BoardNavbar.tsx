import { Board } from "@prisma/client"
import BoardTitleForm from "./BoardTitleForm"
import BoardOptions from "./BoardOptions"

interface BoardNavbarProps {
    board: Board
}

const BoardNavbar: React.FC<BoardNavbarProps> = async ({ board }) => {

    return (
        <nav className="w-full h-14 z-40 bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <BoardTitleForm data={board} />
            <div className="ml-auto">
                <BoardOptions id={board.id} />
            </div>
        </nav>
    )
}

export default BoardNavbar