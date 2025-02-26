"use client"

import { useCardModal } from "@/hooks/use-card-modal"
import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"
import React from "react"

interface CardItemProps {
    data: Card,
    index: number
}

const CardItem: React.FC<CardItemProps> = ({ data, index }) => {
    const { onOpen } = useCardModal()
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li onClick={()=> onOpen(data.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} role="button" className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
                    {data.title}
                </li>
            )}
        </Draggable>
    )
}

export default CardItem