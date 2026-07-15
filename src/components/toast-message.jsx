import { useEffect } from "react"

const alertClasses = {
  success: "alert alert-success",
  error: "alert alert-error",
}

const ToastMessage = ({ visible, message, type, onDismiss }) => {
  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => onDismiss(), 3000)
    return () => clearTimeout(timer)
  }, [visible])

  if (!visible) return null

  return (
    <div className="toast toast-top toast-center z-50">
      <div className={alertClasses[type] ?? alertClasses.success}>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  )
}

export default ToastMessage
