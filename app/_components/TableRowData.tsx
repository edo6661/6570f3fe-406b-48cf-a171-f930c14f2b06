import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table'
import { data } from '@prisma/client'
import React from 'react'
interface TableRowDataProps extends data {
  selectedIds: Record<string, boolean>;
  onChecked: (id: string) => void;
}
const TableRowData = (
  { selectedIds, onChecked,
    id, firstName, lastName, email, position, phone

  }: TableRowDataProps
) => {
  return (
    <TableRow key={id}>
      <TableCell ><Checkbox
        checked={selectedIds[id]}
        onCheckedChange={() => onChecked(id)}
      /></TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {position}
      </TableCell>
      <TableCell>{phone}</TableCell>
    </TableRow>
  )
}

export default TableRowData