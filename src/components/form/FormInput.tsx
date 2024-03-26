"use client"

import { ComponentProps, forwardRef, useId } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";

interface FormInputProps extends ComponentProps<'input'> {
    id: string,
    name: string,
    label?: string,
    errors?: Record<string, string[] | undefined>,
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ id, name, errors, className, defaultValue = "", label, disabled, ...props }, ref) => {
    const { pending } = useFormStatus()
    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">{label}</Label> : null}

                <Input {...props} ref={ref} name={name} id={id} defaultValue={defaultValue} disabled={pending || disabled}
                    className={cn("text-sm px-2 py-1 h-7", className)} aria-describedby={`${id}-error`} />
            </div>

            <FormErrors id={name} errors={errors} />
        </div>
    )
})

FormInput.displayName = "FormInput"
export default FormInput