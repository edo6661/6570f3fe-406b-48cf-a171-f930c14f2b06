import { modalContext } from "@/contexts/modalContext"
import { useContext } from "react"

export const useModalContext = () => {
  return useContext(modalContext)
}