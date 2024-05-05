import { deleteAllData, deleteData } from '@/actions/data'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useModalContext } from '@/hooks/useModalContext'
import { errHandler } from '@/utils/errHandler'
import { useMemo, useTransition } from 'react'
import { toast } from 'sonner'

const DeleteAction = () => {
  const { onClose, actions, selectedIds, } = useModalContext()
  const [isPending, startTransition] = useTransition()
  const ids = useMemo(() => Object.keys(selectedIds).filter((id) => selectedIds[id]), [selectedIds])
  const id = useMemo(() => Object.entries(selectedIds).filter(([key, value]) => value === true).map(([key, value]) => key).toString(), [selectedIds])
  const onDelete = () => {
    startTransition(async () => {
      try {
        if (ids.length > 1) {
          await deleteAllData(ids)
        } else {
          await deleteData(id)
        }
        onClose()
      } catch (err) {
        errHandler(err, "Failed to delete data.")
        toast.error("Failed to delete data.")
      }
    })
  }
  return actions.delete && (
    <>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="destructive"
          onClick={onDelete}
          disabled={isPending}
        >Delete</Button>
      </DialogFooter>
    </>
  )

}

export default DeleteAction