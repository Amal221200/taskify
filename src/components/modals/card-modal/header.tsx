"use client"

import { updateCard } from "@/actions/update-card"
import FormInput from "@/components/form/FormInput"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { Layout } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

interface HeaderProps {
    data: CardWithList
}

const Header = ({ data }: HeaderProps) => {
    const queryClient = useQueryClient()
    const params = useParams()
    const [title, setTitle] = useState(data.title)
    const inputRef = useRef<ElementRef<"input">>(null)
    const formRef = useRef<ElementRef<"form">>(null)

    const { execute } = useAction(updateCard, {
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            })
            setTitle(data.title)
            toast.success(`Card "${data.title}" updated`)
        },
        onError(error) {
            toast.error(error)
        },
    })

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onSumbit = (formData: FormData) => {
        const title = formData.get("title") as string
        const boardId = params.boardId as string

        if (title === data.title) {
            return
        }
        execute({ boardId, title, id: data.id })
    }

    return (
        <header className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700" />
            <div className="w-full">
                <form ref={formRef} action={onSumbit}>
                    <FormInput onBlur={onBlur} id="title" name="title" className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate" ref={inputRef} defaultValue={title} />
                </form>
                <p className="text-sm text-muted-foreground">
                    in list <strong className="underline">{data.list.title}</strong>
                </p>
            </div>
        </header>
    )
}

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-center gap-x-2 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
                <Skeleton className="w-12 h-6 bg-neutral-200" />
            </div>
        </div>
    )
}

export default Header