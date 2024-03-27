"use client"

import { ElementRef, useRef, useState } from "react"
import { List } from "@prisma/client"
import { useEventListener } from "usehooks-ts"
import FormInput from "@/components/form/FormInput"
import { useAction } from "@/hooks/use-action"
import { updateList } from "@/actions/update-list"
import { toast } from "sonner"
import ListOptions from "./ListOptions"

interface ListHeaderProps {
    data: List;
    onAddCard: ()=> void
}

const ListHeader: React.FC<ListHeaderProps> = ({ data, onAddCard }) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const { execute, fieldErrors } = useAction(updateList, {
        onSuccess(data) {
            setTitle(data.title)
            toast.success(`List "${data.title}" updated`)
        },
        onError(error) {
            toast.error(error)
        },
        onComplete() {
            disableEditing()
        },
    })

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit()
        }
    }

    const onSubmitting = (formData: FormData) => {
        const title = formData.get("title") as string
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        if (title === data.title) {
            return disableEditing()
        }

        execute({ title, id, boardId })
    }

    const handleBlur = () => {
        formRef.current?.requestSubmit()
    }

    useEventListener("keydown", onKeyDown)

    if (isEditing) {
        return (
            <form ref={formRef} action={onSubmitting}>
                <input type="hidden" id="id" name="id" value={data.id} />
                <input type="hidden" id="boardId" name="boardId" value={data.boardId} />
                <FormInput id="title" name="title" ref={inputRef} onBlur={handleBlur} placeholder="Enter list title" defaultValue={title} className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white" />
                <button type="submit" hidden />
            </form>
        )
    }

    return (
        <div className="pt-2 px-2 flex justify-between items-start- gap-x-2">
            <div onClick={enableEditing} className="pt-2 px-2 text-sm font-semibold flex justify-center items-start gap-x-2">
                <h5 className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">{title}</h5>
            </div>

            <ListOptions data={data} onAddCard={onAddCard} />
        </div>
    )
}

export default ListHeader