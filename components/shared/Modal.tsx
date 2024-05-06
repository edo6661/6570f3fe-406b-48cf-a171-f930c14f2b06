"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModalContext } from "@/hooks/useModalContext"
import FormData from "@/app/_components/FormData"
import DeleteAction from "@/app/_components/DeleteAction"
import { getForm } from "@/utils/form"
import { useMemo } from "react"

export function Modal(
) {
  const { isOpen, onClose, actions, selectedIds } = useModalContext()
  const allChecked = useMemo(() => Object.values(selectedIds).every((v) => v), [selectedIds])

  const { add, edit, delete: del } = actions
  const {
    getDescription, getTitle
  } = getForm(actions, allChecked)


  const form = (add || edit) ? <FormData
  /> : del && <DeleteAction />


  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {getTitle()}

          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  )
}
