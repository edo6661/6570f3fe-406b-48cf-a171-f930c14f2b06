"use client"
import { data } from '@prisma/client'
import React, { useState } from 'react'
import SearchBox from './SearchBox'
import Actions from './Actions'
import TableData from './TableData'
import SelectForm from '@/components/shared/SelectForm'
import { defaultFields } from '@/constants/defaultFields'
import { motion } from 'framer-motion'
interface WrapperDataProps {
  data: data[]
}
const WrapperData = (
  { data }: WrapperDataProps
) => {
  const [field, setField] = useState<string>("")
  return (
    <motion.div className='py-12 space-y-8'
      layout>
      <motion.div layout className="flex items-center justify-between gap-8">
        <motion.div layout className='flex items-center gap-4'>
          <SearchBox />
          <SelectForm
            setData={setField}
            data={field}
            placeholder="Select a field to search"
            optionsData={defaultFields}
          />
        </motion.div>
        <Actions
        />
      </motion.div>
      <TableData
        data={data}
      />
    </motion.div>
  )
}

export default WrapperData