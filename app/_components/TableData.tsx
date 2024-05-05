"use client"
import SelectForm from "@/components/shared/SelectForm"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { data } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import { useModalContext } from "@/hooks/useModalContext"
import { motion } from 'framer-motion'
import { useDataById } from "@/hooks/useDataById"
import { defaultFields } from "@/constants/defaultFields"
interface TableDataProps {
  data: data[]
}
const TableData = (
  { data }: TableDataProps
) => {
  const { setSelectedIds, selectedIds } = useModalContext()
  const { data: _dataById } = useDataById()
  const allChecked = useMemo(() => {
    if (data.length === 0) return false
    return Object.values(selectedIds).every((v) => v)
  }, [data.length, selectedIds])

  useEffect(() => {
    if (data.length > 0) {
      setSelectedIds(data.reduce((acc, dt) => ({ ...acc, [dt.id]: false }), {}))
    }
  }, [data, setSelectedIds])

  const onChecked = (id: string) => setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }))

  const onCheckedAll = () => setSelectedIds(Object.keys(selectedIds).reduce((acc, id) => ({ ...acc, [id]: !allChecked }), {}))


  return (

    <motion.div layout>
      <Table>
        <TableCaption>
          {data.length > 0 ? "A list of your recent Data." : "No data available."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={
                  Object.values(selectedIds).length > 0 ? allChecked : false
                }
                onCheckedChange={() => {
                  onCheckedAll()
                }}
              />
            </TableHead>
            {defaultFields.map((field) =>
              <TableHead key={field.value}>{field.label}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>

          {data?.map((dt) => (
            <TableRow key={dt.id}>
              <TableCell ><Checkbox
                checked={selectedIds[dt.id]}
                onCheckedChange={() => onChecked(dt.id)}
              /></TableCell>
              <TableCell>{dt.firstName}</TableCell>
              <TableCell>{dt.lastName}</TableCell>
              <TableCell>
                {dt.position}
              </TableCell>
              <TableCell>{dt.phone}</TableCell>
              <TableCell>{dt.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </motion.div>
  )
}

export default TableData