import { useState } from "react"

export const useToast = () => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  const showToast = (message, type) => setToast({ visible: true, message, type })

  const dismissToast = () => setToast((t) => ({ ...t, visible: false }))

  return { toast, showToast, dismissToast }
}
