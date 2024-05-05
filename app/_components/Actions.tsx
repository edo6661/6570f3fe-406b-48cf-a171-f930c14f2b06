"use client"

import { Button } from "@/components/ui/button";
import { EnumActions } from "@/constants/defaultActions";
import { useModalContext } from "@/hooks/useModalContext";
import { Edit, Plus, Trash, } from "lucide-react"
import { toast } from "sonner";
const Actions = (
) => {
  const { setIsOpen, setIsActions, selectedIds } = useModalContext()
  const onAction = (action: EnumActions) => {
    setIsOpen((prev) => !prev)
    setIsActions((prev) => ({ ...prev, [action]: !prev[action] }))
  }

  const oneTrueKey = Object.values(selectedIds).filter((val) => val === true)

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon"
        onClick={() => onAction('add')}
      >
        <Plus />
      </Button>

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
      {/* <Button variant="ghost" size="icon"
        onClick={() => onAction('save')}
      >
        <Save />
      </Button>
      <Button variant="ghost" size="icon"
        onClick={() => onAction('undo')}
      >
        <Undo />
      </Button> */}
      <Button variant="ghost" size="icon"
        onClick={() => onAction('delete')}
      >
        <Trash />
      </Button>
    </div>
  )
}

export default Actions