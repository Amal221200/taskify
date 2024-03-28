"use client"

import { useQuery } from "@tanstack/react-query"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"

import Header from "./header"

import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"


const CardModal = () => {
    const { id, isOpen, onClose } = useCardModal()

    const { data: cardData, isLoading, isSuccess } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/card/${id}`)
    })

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {cardData ? (
                    <Header data={cardData} />
                ) : <Header.Skeleton />}
            </DialogContent>
        </Dialog>
    )
}

export default CardModal