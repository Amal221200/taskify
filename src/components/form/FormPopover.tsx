"use client"

import { ElementRef, ReactNode, useCallback, useId } from "react"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import FormInput from "./FormInput"
import FormSubmit from "./FormSubmit"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"
import { toast } from "sonner"
import FormPicker from "./FormPicker"
import { useRef } from "react"
import { useRouter } from "next/navigation"

interface FormPopoverProps {
    children: ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

const FormPopover: React.FC<FormPopoverProps> = ({ children, side, align, sideOffset = 0 }) => {
    const router = useRouter()
    const titleId = useId()
    const closeRef = useRef<ElementRef<"button">>(null)
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess(data) {
            console.log(data);
            toast.success("Board Created!")
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError(error) {
            console.log(error);
            toast.error(error)
        },
    });

    const onSubmit = useCallback((formData: FormData) => {
        const title = formData.get("title") as string
        const image = formData.get("image") as string

        execute({ title, image })
    }, [execute])

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
                <div className="text-sm font-medium text-center text-stone-600">
                    Create Board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button type="button" className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
                        <FormInput id={titleId} label="Board Title" type="text" errors={fieldErrors} name="title" />
                    </div>
                    <FormSubmit className="w-full" variant="primary">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default FormPopover