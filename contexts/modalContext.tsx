'use client'

import { defaultActions } from '@/constants/defaultActions'
import { errHandler } from '@/utils/errHandler'
import { data } from '@prisma/client'
import axios from 'axios'
import { createContext, useContext, useState } from 'react'

interface ModalContext {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
  actions: typeof defaultActions
  setIsActions: React.Dispatch<React.SetStateAction<typeof defaultActions>>
  selectedIds: Record<string, boolean>
  setSelectedIds: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  initialData: data | undefined
  setInitialData: React.Dispatch<React.SetStateAction<data | undefined>>
  getDataById: () => void
}
export const modalContext = createContext({} as ModalContext)

export default function ModalContext({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsActions(defaultActions)
    setIsOpen(false)
  }
  const [actions, setIsActions] = useState<typeof defaultActions>(defaultActions)
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({})

  const [initialData, setInitialData] = useState<data | undefined>(undefined)

  const getIdThatTrue = Object.entries(selectedIds).filter(([_key, value]) => value === true).map(([key, _value]) => key).toString()

  const getDataById = async () => {
    try {
      const { data } = await axios.get<data>(`/api/data?id=${getIdThatTrue}`)
      setInitialData(data)
    } catch (err) {
      errHandler(err, "Error fetching data by id")
    }
  }




  return <modalContext.Provider
    value={{
      isOpen,
      setIsOpen,
      onClose,
      actions, setIsActions,
      selectedIds, setSelectedIds
      , initialData, getDataById, setInitialData

    }}
  >{children}</modalContext.Provider>
}


