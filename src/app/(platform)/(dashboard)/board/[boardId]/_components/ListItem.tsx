import { ElementRef, useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

import { ListWithCards } from "@/types"
import { cn } from "@/lib/utils"

import ListHeader from "./ListHeader"
import CardForm from "./CardForm"
import CardItem from "./CardItem"


interface ListItemProps {
    index: number,
    data: ListWithCards
}

const ListItem: React.FC<ListItemProps> = ({ index, data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<ElementRef<'textarea'>>(null)

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textAreaRef.current?.focus()
        })
    }

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li {...provided.draggableProps} ref={provided.innerRef} className="shrink-0 h-full w-[272px] select-none">
                    <div {...provided.dragHandleProps} className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                        <ListHeader data={data} onAddCard={enableEditing} />
                        <Droppable droppableId={data.id} type="card">
                            {(provided) => (
                                <ol {...provided.droppableProps} ref={provided.innerRef} className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}>
                                    {
                                        data.cards.map((card, index) => (
                                            <CardItem key={card.id} data={card} index={index} />
                                        ))
                                    }
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm listId={data.id} enableEditing={enableEditing} disableEditing={disableEditing}
                            isEditing={isEditing} ref={textAreaRef} />
                    </div>
                </li>
            )}
        </Draggable>
    )
}

export default ListItem