"use client"

import { useState, useRef, ElementRef } from "react"
import { Button } from "@/components/ui/button"
import ListWrapper from "./ListWrapper"
import { Plus, X } from "lucide-react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import FormInput from "@/components/form/FormInput"
import { useParams, useRouter } from "next/navigation"
import FormSubmit from "@/components/form/FormSubmit"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/create-list"
import { toast } from "sonner"

const ListForm = () => {
    const router = useRouter()

    const { execute , fieldErrors} = useAction(createList, {
        onError(error) {
            toast.error(error)
        },
        onSuccess(data) {
            toast.success(`List "${data.title}" created`)
            disableEditing()
            router.refresh()
        },
    })

    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardId = formData.get("boardId") as string

        execute({ title, boardId })
    }

    useEventListener("keydown", handleKeyDown)
    useOnClickOutside(formRef, disableEditing)

    if (isEditing) {
        return (
            <ListWrapper>
                <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-sm bg-white space-y-4 shadow-md">
                    <FormInput errors={fieldErrors} ref={inputRef} id="title" name="title" type="text" className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition" placeholder="Enter list title" />
                    <input type="hidden" value={params.boardId} name="boardId" />

                    <div className="flex items-center gap-x-1">
                        <FormSubmit variant="primary">
                            Add List
                        </FormSubmit>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <Button onClick={enableEditing} className="w-full cursor-pointer rounded-md text-neutral-700 bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add a List
            </Button>
        </ListWrapper>
    )
}

export default ListForm