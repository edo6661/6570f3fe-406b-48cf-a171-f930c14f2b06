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
import { AnimatePresence, motion } from 'framer-motion'
import { useDataById } from "@/hooks/useDataById"
import { defaultFields } from "@/constants/defaultFields"
import { ArrowUp } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { betterQuery } from "@/utils/betterQuery"
import TableHeadData from "./TableHeadData"
import TableRowData from "./TableRowData"
import PaginationData from "./PaginationData"
import { PER_PAGE } from "@/constants/pagination"
interface TableDataProps {
  data: data[]
}
const TableData = (
  { data }: TableDataProps
) => {

  const [currentSort, setCurrentSort] = useState<keyof data>("firstName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const searchParams = useSearchParams()
  const q = searchParams.get("q")

  const filteredAndSortedData = useMemo(() => {
    const sortedData = [...data];

    if (q) {
      return sortedData.filter((data) => betterQuery(data.firstName).includes(betterQuery(q)
      ) || betterQuery(data.lastName).includes(betterQuery(q)
      ) || betterQuery(data.email).includes(betterQuery(q)
      ) || betterQuery(data.position).includes(betterQuery(q)
      ) || betterQuery(data.phone).includes(betterQuery(q)
      )
      )
    }
    sortedData.sort((a, b) => {
      const aValue = (a[currentSort]) as string;
      const bValue = (b[currentSort]) as string;

      return aValue.localeCompare(bValue, undefined, { sensitivity: "case" });
    });

    if (sortDirection === "desc") {
      sortedData.reverse();
    }

    return sortedData;
  }, [data, currentSort, sortDirection, q]);

  const { setSelectedIds, selectedIds } = useModalContext()

  const { data: _dataById } = useDataById()

  const allChecked = useMemo(() => {
    if (data.length === 0) return false
    return Object.values(selectedIds).every((v) => v)
  }, [data.length, selectedIds])


  const onChecked = (id: string) => setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }))

  const onCheckedAll = () => setSelectedIds(Object.keys(selectedIds).reduce((acc, id) => ({ ...acc, [id]: !allChecked }), {}))

  const onSort = (field: keyof data) => {
    if (currentSort === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(field);
      setSortDirection("asc");
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      setSelectedIds(data.reduce((acc, dt) => ({ ...acc, [dt.id]: false }), {}))
    }
  }, [data, setSelectedIds])

  const totalPages = Math.ceil(filteredAndSortedData.length / PER_PAGE)
  const curentPage = +searchParams.get("page")! || 1
  const skip = (curentPage - 1) * PER_PAGE
  const currentData = filteredAndSortedData.slice(skip, skip + PER_PAGE)



  return (

    <motion.div layout className="space-y-8 relative min-h-[40vh]">
      <motion.div layout className="absolute top-0 w-full">
        <Table>
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
                <TableHeadData
                  q={q}
                  field={field}
                  currentSort={currentSort}
                  sortDirection={sortDirection}
                  onSort={onSort}
                  key={field.value}
                />
              )}
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              currentData
                ?.map((dt) => (
                  <TableRowData
                    key={dt.id}
                    {...dt}
                    selectedIds={selectedIds}
                    onChecked={onChecked}
                  />
                ))}
          </TableBody>

        </Table>
      </motion.div>
      <motion.div layout className="absolute bottom-0 w-full">
        <PaginationData
          totalPages={totalPages}
        />
      </motion.div>
    </motion.div>
  )
}

export default TableData