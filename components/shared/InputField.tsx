import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import { AnimatePresence, motion } from 'framer-motion';
interface InputFieldProps {
  control: any;
  name: string;
  placeholder: string;
}
const InputField = (
  { control, name, placeholder }: InputFieldProps
) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <AnimatePresence>
            <FormMessage />

          </AnimatePresence>
        </FormItem>
      )}
    />
  )
}

export default InputField