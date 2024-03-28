"use client"

import { useEffect, useState } from "react"
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "@hello-pangea/dnd"
import { ListWithCards } from "@/types"
import ListForm from "./ListForm"
import ListItem from "./ListItem"
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"

interface ListContainerProps {
    boardId: string,
    data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const ListContainer: React.FC<ListContainerProps> = ({ data, boardId }) => {

    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess() {
            toast.success("List reordered")
        },
        onError(error) {
            toast.error(error)
        },
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess() {
            toast.success("Card reordered")
        },
        onError(error) {
            toast.error(error)
        },
    })

    const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const { destination, source, type } = result

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        if (type === "list") {
            const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({ ...item, order: index }));
            setOrderedData(items)
            executeUpdateListOrder({ boardId, items })
        }

        if (type === "card") {
            const newOrderedData = structuredClone(orderedData)
            const sourceList = newOrderedData.find((list) => list.id === source.droppableId)
            const destList = newOrderedData.find((list) => list.id === destination.droppableId)

            if (!sourceList || !destList) {
                return
            }

            if (!sourceList.cards) {
                sourceList.cards = []
            }

            if (!destList.cards) {
                destList.cards = []
            }

            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(sourceList.cards, source.index, destination.index)

                reorderedCards.forEach((card, index) => {
                    card.order = index
                })

                sourceList.cards = reorderedCards

                setOrderedData(newOrderedData)

                executeUpdateCardOrder({ boardId, items: reorderedCards })
            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1)

                movedCard.listId = destination.droppableId

                destList.cards.splice(destination.index, 0, movedCard)

                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })

                destList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedData(newOrderedData)

                executeUpdateCardOrder({ boardId, items: destList.cards })
            }

        }
    }

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
                        {
                            orderedData.map((list, index) => (
                                <ListItem key={list.id} index={index} data={list} />
                            ))
                        }
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ListContainer