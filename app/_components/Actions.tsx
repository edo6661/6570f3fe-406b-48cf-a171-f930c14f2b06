"use client"

import { Hint } from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import { EnumActions } from "@/constants/defaultActions";
import { useModalContext } from "@/hooks/useModalContext";
import { Edit, Plus, Trash, } from "lucide-react"
import { useMemo } from "react";
import { toast } from "sonner";
const Actions = (
) => {
  const { setIsOpen, setIsActions, selectedIds, actions } = useModalContext()
  const onAction = (action: EnumActions) => {
    setIsOpen((prev) => !prev)
    setIsActions((prev) => ({ ...prev, [action]: !prev[action] }))
  }

  const oneTrueKey = useMemo(() => Object.values(selectedIds).filter((val) => val === true), [selectedIds])

  return (
    <div className="flex items-center gap-4">
      <Hint
        label="Add new Data"
        align="center"
        alignOffset={10}
        sideOffset={10}
        side="top"
      >
        <Button variant="ghost" size="icon"
          onClick={() => onAction('add')}
        >
          <Plus />
        </Button>
      </Hint>

      <Hint
        label="Edit Data"
        align="center"
        alignOffset={10}
        sideOffset={10}
        side="top"
      >
        <Button variant="ghost" size="icon"
          onClick={async () => {
            if (oneTrueKey.length > 1 || oneTrueKey.length === 0) {
              return toast.success('Please select only one item to edit')
            }
            onAction('edit')
          }}
        >
          <Edit />
        </Button>
      </Hint>

      <Hint
        label="Delete Data"
        align="center"
        alignOffset={10}
        sideOffset={10}
        side="top"
      >
        <Button variant="ghost" size="icon"
          onClick={() => {
            if (oneTrueKey.length === 0) {
              return toast.success('Please select at least one item to delete')
            }
            onAction('delete')
          }}
        >
          <Trash />
        </Button>
      </Hint>
    </div>
  )
}

export default Actions