import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

interface ToastContextValue {
  show: (t: Omit<ToastItem, 'id'>) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

function useToastContext() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider')
  return ctx
}

function ToastContainer({
  items,
  onClose,
}: {
  items: ToastItem[]
  onClose: (id: string) => void
}) {
  function bg(variant?: ToastVariant) {
    if (variant === 'success') return 'bg-green-600'
    if (variant === 'error') return 'bg-red-600'
    if (variant === 'warning') return 'bg-yellow-600'
    return 'bg-blue-600'
  }
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {items.map(t => (
        <div
          key={t.id}
          className="rounded-md shadow-md border overflow-hidden animate-in fade-in-0 slide-in-from-right-4"
        >
          <div className={`px-3 py-2 text-white ${bg(t.variant)}`}>
            <div className="font-semibold">{t.title}</div>
            {t.description && (
              <div className="text-sm opacity-90">{t.description}</div>
            )}
          </div>
          <button
            type="button"
            className="w-full text-sm px-3 py-1.5 bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => onClose(t.id)}
          >
            Fechar
          </button>
        </div>
      ))}
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const timers = useRef<Record<string, number>>({})

  function add(t: Omit<ToastItem, 'id'>) {
    const id = crypto.randomUUID()
    const item = { id, ...t }
    setItems(prev => [item, ...prev].slice(0, 5))
    timers.current[id] = window.setTimeout(() => remove(id), 3500)
  }

  function remove(id: string) {
    clearTimeout(timers.current[id])
    delete timers.current[id]
    setItems(prev => prev.filter(i => i.id !== id))
  }

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout)
    }
  }, [])

  const value = useMemo<ToastContextValue>(() => {
    return {
      show: add,
      success: (title, description) =>
        add({ title, description, variant: 'success' }),
      error: (title, description) =>
        add({ title, description, variant: 'error' }),
      info: (title, description) =>
        add({ title, description, variant: 'info' }),
      warning: (title, description) =>
        add({ title, description, variant: 'warning' }),
    }
  }, [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer items={items} onClose={remove} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useToastContext()
}
