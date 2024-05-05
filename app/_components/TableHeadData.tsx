import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { TableHead } from '@/components/ui/table'
import { data } from '@prisma/client'
interface TableHeadDataProps {
  field: {
    label: string;
    value: string;
  };
  currentSort: keyof data;
  sortDirection: "asc" | "desc";
  onSort: (value: keyof data) => void;
  q: string | null
}
const TableHeadData = (
  { field, currentSort, sortDirection, onSort, q }: TableHeadDataProps
) => {
  return (
    <TableHead
      key={field.value}
      onClick={() => onSort(field.value as keyof data)}
    >
      <motion.div layout className="flex gap-2 items-center">
        <span>
          {field.label}
        </span>
        <AnimatePresence>
          {(currentSort === field.value && !q) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                rotate: sortDirection === "asc" ? 0 : 180,
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring"
              }}
            >
              <ArrowUp
                size={16}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </TableHead>
  )
}

export default TableHeadData