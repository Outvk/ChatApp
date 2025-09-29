"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

const Select = React.forwardRef<
  HTMLDivElement,
  {
    value: string
    onValueChange: (value: string) => void
    children: React.ReactNode
    className?: string
  }
>(({ value, onValueChange, children, className }, ref) => {
  const [open, setOpen] = React.useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, onOpenChange: setOpen }}>
      <div ref={ref} className={cn("relative", className)}>
        <SelectTrigger>
          {children}
        </SelectTrigger>
      </div>
    </SelectContext.Provider>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
  }
>(({ children, className }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectTrigger must be used within Select")

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className
      )}
      onClick={() => context.onOpenChange(!context.open)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          context.onOpenChange(!context.open)
        }
      }}
    >
      {children}
      {context.open ? (
        <ChevronUp className="h-4 w-4 opacity-50" />
      ) : (
        <ChevronDown className="h-4 w-4 opacity-50" />
      )}
    </div>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  {
    placeholder?: string
    className?: string
  }
>(({ placeholder, className }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")

  return (
    <span ref={ref} className={cn(className)}>
      {context.value || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    className?: string
  }
>(({ children, className }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectContent must be used within Select")

  if (!context.open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  {
    value: string
    children: React.ReactNode
    className?: string
  }
>(({ value, children, className }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectItem must be used within Select")

  const isSelected = context.value === value

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => {
        context.onValueChange(value)
        context.onOpenChange(false)
      }}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
