import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useModalContext } from '@/hooks/useModalContext'
import React from 'react'

const DeleteAction = () => {
  const { onClose, actions } = useModalContext()
  return actions.delete && (
    <>
      <p>Are you sure want to delete this item</p>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </>
  )

}

export default DeleteAction