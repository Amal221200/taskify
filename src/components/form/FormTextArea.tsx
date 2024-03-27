"use client"

import { ComponentProps, forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import FormErrors from "./FormErrors";

interface FormTextAreaProps extends ComponentProps<"textarea"> {
    id: string,
    name: string,
    label?: string,
    errors?: Record<string, string[] | undefined>,
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(({ id, name, errors, className, defaultValue = "", label, disabled, ...props }, ref) => {
    const { pending } = useFormStatus()
    
    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {label ? <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">{label}</Label> : null}

                <Textarea {...props} ref={ref} name={name} id={id} defaultValue={defaultValue} disabled={pending || disabled}
                    className={cn("resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm", className)} aria-describedby={`${id}-error`} />
            </div>
            <FormErrors id={name} errors={errors} />
        </div>
    )
})

FormTextArea.displayName = "FormTextArea"
export default FormTextArea