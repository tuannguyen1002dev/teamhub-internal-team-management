import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ChevronLeft, User } from 'lucide-react'

const PageTitleContext = createContext<(title: string) => void>(() => { })

export function usePageTitle(title: string) {
  const setTitle = useContext(PageTitleContext)
  useEffect(() => {
    setTitle(title)
  }, [title])
}

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('')

  return (
    <PageTitleContext.Provider value={setTitle}>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row justify-between items-center px-6 py-3 rounded-t-3xl border-b border-white/20">
          <span className="text-2xl font-bold text-white">
            {title}
          </span>
          <div className="border border-white/20 rounded-full p-2 text-white hover:bg-white/90 hover:text-black transition-all duration-500 ease-in-out cursor-pointer  ">
            <User />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3">
          {children}
        </div>
      </div>
    </PageTitleContext.Provider>
  )
}