"use client"

import { updateCard } from '@/actions/update-card'
import FormSubmit from '@/components/form/FormSubmit'
import FormTextArea from '@/components/form/FormTextArea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps {
    data: CardWithList
}

const Description = ({ data }: DescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState(data.description)
    const textareaRef = useRef<ElementRef<"textarea">>(null)
    const formRef = useRef<ElementRef<"form">>(null)

    const queryClient = useQueryClient()
    const params = useParams()

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey:["card", data.id]
            })
            setDescription(data.description)
            setIsEditing(false)
            toast.success(`Description for card "${data.title}" updated`)
        },
        onError(error) {
            toast.error(error)
        },
    })

    const enableEditing = () => {
        setIsEditing(true)

        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string
        const boardId = params.boardId as string
        const id = data.id

        execute({ id, boardId, description })
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    return (
        <div className='flex items-start gap-x-3 w-full'>
            <AlignLeft className='h5 w-5 mt-0.5 text-neutral-700' />
            <div className="w-full">
                <p className='font-semibold text-neutral-700 mb-2'>Description</p>
                {
                    isEditing ?
                        <form action={onSubmit} ref={formRef} className='space-y-2'>
                            <FormTextArea errors={fieldErrors} id='description' name='description' className='w-full mt-2' ref={textareaRef} placeholder="Add more detailed description..." defaultValue={description || undefined} />
                            <div className="flex items-center gap-x-2">
                                <FormSubmit>
                                    Save
                                </FormSubmit>
                                <Button variant="ghost" type='button' size="sm" onClick={disableEditing}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                        :
                        <div role='button' onClick={enableEditing} className='min-h-[78px] bg-neutral-200 text-sm font-medium py-2 px-3.5 rounded-md'>
                            {data.description || "Add more detailed description..."}
                        </div>
                }
            </div>
        </div>
    )
}

Description.Skeleton = function SkeletonDescription() {
    return (
        <div className='flex items-start gap-x-3 w-full'>
            <Skeleton className='h-6 w-6 bg-neutral-200' />
            <div className="w-full">
                <Skeleton className='h-6 w-24 mb-2 bg-neutral-100' />
                <Skeleton className='h-[78px] w-full bg-neutral-100' />
            </div>
        </div>
    )
}

export default Description