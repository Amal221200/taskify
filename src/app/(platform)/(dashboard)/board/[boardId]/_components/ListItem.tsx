import { ListWithCards } from "@/types"
import ListHeader from "./ListHeader"
import { ElementRef, useRef, useState } from "react";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";

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
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader data={data} onAddCard={enableEditing} />
                <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}>
                    {
                        data.cards.map((card, index) => (
                            <CardItem key={card.id} data={card} index={index} />
                        ))
                    }
                </ol>
                <CardForm listId={data.id} enableEditing={enableEditing} disableEditing={disableEditing}
                    isEditing={isEditing} ref={textAreaRef} />
            </div>
        </li>
    )
}

export default ListItem