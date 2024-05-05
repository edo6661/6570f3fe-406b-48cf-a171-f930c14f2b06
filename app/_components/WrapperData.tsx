"use client"
import { data } from '@prisma/client'
import SearchBox from './SearchBox'
import Actions from './Actions'
import TableData from './TableData'
import { motion } from 'framer-motion'
interface WrapperDataProps {
  data: data[]
}
const WrapperData = (
  { data }: WrapperDataProps
) => {
  return (
    <motion.div className='py-12 space-y-8'
      layout>
      <motion.div layout className="flex items-center justify-between gap-8">
        <motion.div layout className='flex items-center gap-4'>
          <SearchBox />
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