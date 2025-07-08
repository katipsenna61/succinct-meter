import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
