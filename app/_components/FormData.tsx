"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import InputField from "@/components/shared/InputField"
import validator from 'validator'
import { defaultFields } from "@/constants/defaultFields"
import { toast } from "sonner"
import { data } from "@prisma/client"
import { useModalContext } from "@/hooks/useModalContext"
import axios from "axios"
import { errHandler } from "@/utils/errHandler"
import { useEffect, useState } from "react"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }).refine(validator.isMobilePhone, "Invalid phone number")
})


export default function FormData(
) {

  const { initialData } = useModalContext()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(initialData ? {
        ...initialData,
      } : {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success(JSON.stringify(values))
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {defaultFields.map(({ value, label }) =>
          <InputField
            key={value}
            control={form.control}
            name={value}
            placeholder={`Enter ${label}`}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
