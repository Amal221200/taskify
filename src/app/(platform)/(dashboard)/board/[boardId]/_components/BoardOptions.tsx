"use client"
import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverClose, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

interface BoardOptionsProps {
    id: string
}

const BoardOptions: React.FC<BoardOptionsProps> = ({ id }) => {
    const { execute , isLoading} = useAction(deleteBoard, {
        onError(error) {
            toast.error(error)
        },
    })

    const handleDelete = () => {
        execute({ id })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3" side="bottom" align="start">
                <h6 className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </h6>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button disabled={isLoading} variant="ghost" onClick={handleDelete} className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions