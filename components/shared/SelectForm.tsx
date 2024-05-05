"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useEffect } from "react"
const FormSchema = z.object({
  field: z
    .string({
      required_error: "Please select an field to display.",
    })
  ,
})

interface SelectFormProps {
  setData: React.Dispatch<React.SetStateAction<string>>
  data: string;
  placeholder: string;
  optionsData: {
    label: string;
    value: string;
  }[]
}
export default function SelectForm(
  { setData, data, placeholder, optionsData }: SelectFormProps
) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      field: data
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Field selected: " + data.field)
  }
  const field = form.watch("field")

  useEffect(() => {
    setData(field)
  }, [field, setData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {optionsData.map((field) =>
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
