"use client"

import { createBoard } from "@/actions/create-board"
import FormInput from "@/components/form/FormInput"
import FormSubmit from "@/components/form/FormSubmit"
import { useAction } from "@/hooks/use-action"


const Form = () => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess(data) {
            console.log(data, "SUCCESS!");

        },
        onError(error) {
            console.error(error);
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string

        execute({ title })
    }
    return (
        <form action={onSubmit}>
            <FormInput id="title" name="title" label="Board Title" errors={fieldErrors}  />
            <FormSubmit>
                Save
            </FormSubmit>
        </form>
    )
}

export default Form