"use client"

import { useQuery } from "@tanstack/react-query"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"

import Header from "./header"

import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import Description from "./description"
import Actions from "@/components/modals/card-modal/actions"
import { AuditLog } from "@prisma/client"
import Activity from "./activity"


const CardModal = () => {
    const { id, isOpen, onClose } = useCardModal()

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/card/${id}`)
    })

    const { data: cardLogs } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/card/${id}/logs`)
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
                            {cardData && cardLogs ? <Activity data={cardLogs} /> : <Activity.Skeleton />}
                        </div>
                    </div>
                    {
                        cardData ? <Actions data={cardData} /> : <Actions.Skeleton />
                    }


                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CardModal