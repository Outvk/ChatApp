"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(checked || false)

    const isChecked = checked !== undefined ? checked : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      setInternalChecked(newChecked)
      onCheckedChange?.(newChecked)
      onChange?.(e)
    }

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            isChecked ? "bg-primary" : "bg-input",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition-transform",
              isChecked ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
