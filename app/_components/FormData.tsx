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
import { useState, useTransition } from "react"
import { createData, editData } from "@/actions/data"
import { errHandler } from "@/utils/errHandler"
import { defaultPositions } from "@/constants/defaultPosition"
import TemplateSelect from "./TemplateSelect"
import { useModalContext } from "@/hooks/useModalContext"
import { Position } from "@prisma/client"
import { useDataById } from "@/hooks/useDataById"
import { motion } from "framer-motion"

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
  position: z.nativeEnum(Position, {
    errorMap: () => ({
      message: "Please select a position.",
    })
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }).refine(validator.isMobilePhone, "Invalid phone number")
})

export type FormSchema = z.infer<typeof formSchema>

export default function FormData(
) {
  const [isPending, startTransition] = useTransition()

  const { initialData, actions, onClose } = useModalContext()
  const { add, edit } = actions


  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(initialData && edit ? {
        ...initialData,
      } : {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: (Position.CEO as Position),
      })
    },
  })

  async function onSubmit(values: FormSchema) {

    startTransition(async () => {
      let res = null
      try {
        if (add) {
          res = await createData(values)
        } else if (edit) {
          res = await editData(values, initialData!.id)
        }
        if (res?.error) {
          form.setError("email", {
            message: res.error,
          })
          toast.error(res.error)
          return
        }
        onClose()
        toast.success(res?.message)
      }
      catch (err) {
        errHandler(err, "Failed to add data")
        toast.error("Failed to add data")
      }
    })
  }

  return (
    <Form {...form}>
      <motion.form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"
        layout
      >
        {defaultFields.map(({ value, label }) =>
          <div key={value}>
            {value === "position" ? (
              <TemplateSelect
                control={form.control}
                placeholder="Select a position"
                name={value}
                optionsData={defaultPositions}
              />
            ) : (
              <InputField
                key={value}
                control={form.control}
                name={value}
                placeholder={`Enter ${label}`}
              />
            )}
          </div>
        )}
        <Button type="submit"
          disabled={isPending}
          className="disabled:cursor-not-allowed disabled:opacity-80"
        >Submit</Button>
      </motion.form>
    </Form>
  )
}
