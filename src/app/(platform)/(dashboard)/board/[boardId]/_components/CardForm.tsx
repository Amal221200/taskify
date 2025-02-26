"use client"

import { createCard } from '@/actions/create-card';
import FormSubmit from '@/components/form/FormSubmit';
import FormTextArea from '@/components/form/FormTextArea';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react'
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess(data) {
            toast.success(`Card "${data.title}" created.`)
            formRef.current?.reset()
        },
        onError(error) {
            toast.error(error)
        },
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const listId = formData.get("listId") as string
        const boardId = formData.get("boardId") as string

        execute({ title, listId, boardId })
    }

    if (isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className='m-1 py-0.5 px-1 space-y-4'>
                <FormTextArea id='title' errors={fieldErrors} name='title' onKeyDown={onTextAreaKeyDown} ref={ref} placeholder='Enter a title for this card...'
                />

                <input type="hidden" name="listId" id='listId' value={listId} />
                <input type="hidden" name="boardId" id='boardId' value={params.boardId} />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className='h-5 w-5' />
                    </Button>
                </div>
            </form>
        )
    }
    return (
        <div className='pt-2 px-2'>
            <Button onClick={enableEditing} className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm' variant="ghost">
                <Plus className='h-4 w-4 mr-2' />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"

export default CardForm