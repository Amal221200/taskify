"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types"
import { Copy, Trash } from "lucide-react"
import { copyCard } from "../../../actions/copy-card"
import { deleteCard } from "../../../actions/delete-card"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useCardModal } from "@/hooks/use-card-modal"

interface ActionsProps {
    data: CardWithList
}

const Actions = ({ data }: ActionsProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const { onClose, onOpen } = useCardModal()

    const { execute: executeCopyCard, isLoading: isCopying } = useAction(copyCard, {
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            })
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id],
            })
            toast.success(`Card "${data.title}" copied`)
            onOpen(data.id)
        },
        onError(error) {
            toast.error(error)
        },
    })

    const { execute: executeDeleteCard, isLoading: isDeleting } = useAction(deleteCard, {
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            })

            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id],
            })
            
            toast.success(`Card "${data.title}" deleted`)
            onClose()
        },
        onError(error) {
            toast.error(error)
        },
    })

    const handleCopy = () => {
        executeCopyCard({ id: data.id, boardId: params.boardId as string })
    }

    const handleDelete = () => {
        executeDeleteCard({ id: data.id, boardId: params.boardId as string })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button disabled={isCopying || isDeleting} onClick={handleCopy} type="button" variant="gray" size="inline" className="w-full flex justify-start">
                <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button disabled={isCopying || isDeleting} onClick={handleDelete} type="button" variant="gray" size="inline" className="w-full flex justify-start">
                <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
        </div>
    )
}

Actions.Skeleton = function SkeletonActions() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}

export default Actions