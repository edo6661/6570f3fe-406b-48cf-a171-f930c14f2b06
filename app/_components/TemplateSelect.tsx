import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface TemplateSelectProps {
  control: any;
  placeholder: string;
  optionsData: { label: string, value: string }[];
  name: string;
}

const TemplateSelect = (
  { control, placeholder, optionsData, name }: TemplateSelectProps
) => {
  return (
    <FormField
      control={control}
      name={name}
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
  )
}

export default TemplateSelect