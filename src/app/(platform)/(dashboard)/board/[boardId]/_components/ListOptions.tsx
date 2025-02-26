"use client"

import { List } from "@prisma/client"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, X } from "lucide-react"
import FormSubmit from "@/components/form/FormSubmit"
import { Separator } from "@/components/ui/separator"
import { useAction } from "@/hooks/use-action"
import { deleteList } from "@/actions/delete-list"
import { toast } from "sonner"
import { ElementRef, useRef } from "react"
import { copyList } from "@/actions/copy-list"

interface ListOptionsProps {
    data: List,
    onAddCard: () => void
}

const ListOptions: React.FC<ListOptionsProps> = ({ data, onAddCard }) => {
    const { execute: executeDeleteList } = useAction(deleteList, {
        onSuccess(data) {
            toast.success(`List "${data.title}" deleted.`)
            closeRef.current?.click()
        },
        onError(error) {
            toast.error(error)
        },
    })
    const { execute: executeCopyList } = useAction(copyList, {
        onSuccess(data) {
            toast.success(`List "${data.title}" copied.`)
            closeRef.current?.click()
        },
        onError(error) {
            toast.error(error)
        },
    })

    const closeRef = useRef<ElementRef<"button">>(null)

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDeleteList({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeCopyList({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 mb-4">
                    List Actions
                </div>

                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <Button onClick={onAddCard} className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
                    Add Card...
                </Button>
                <form action={onCopy}>
                    <input type="hidden" name="id" id="id" value={data.id} />
                    <input type="hidden" name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
                        Copy List...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input type="hidden" name="id" id="id" value={data.id} />
                    <input type="hidden" name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
                        Delete this list...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default ListOptions