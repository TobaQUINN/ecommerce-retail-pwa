import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      className="
        backdrop:bg-black/50 backdrop:backdrop-blur-sm
        bg-white rounded-lg shadow-lg p-0 m-auto
        w-[90vw] max-w-lg max-h-[85vh]
        open:animate-in open:fade-in open:zoom-in-95
      "
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="flex flex-col max-h-[85vh]">
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </dialog>
  )
}
