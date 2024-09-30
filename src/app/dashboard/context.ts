import { createContext, useContext } from 'react'

export type SidebarContextType = {
  expanded: boolean
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarContext.Provider")
  }
  return context
}
