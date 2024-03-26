"use client"

import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'


interface FormSubmitProps extends ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
}

const FormSubmit: React.FC<FormSubmitProps> = ({ children, disabled, className, variant, ...props }) => {
  const { pending } = useFormStatus()
  return (
    <Button {...props} type='submit' variant={variant} className={cn(className)} disabled={pending || disabled}>
      {children}
    </Button>
  )
}

export default FormSubmit