"use client"

import { useQuery } from "@tanstack/react-query"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"

import Header from "./header"

import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import Description from "./description"
import Actions from "@/actions/update-card/actions"


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

                ) : (
                    <Header.Skeleton />
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {cardData ? <Description data={cardData} /> : <Description.Skeleton />}
                        </div>
                    </div>
                    {
                        cardData
                            ?
                            <Actions data={cardData} />
                            :
                            <Actions.Skeleton />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CardModal