import React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: "sm" | "md" | "lg" | "xl"
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
}

const cardPadding = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
}

const cardShadow = {
  none: "",
  sm: "shadow-[var(--shadow-sm)]",
  md: "shadow-[var(--shadow-md)]",
  lg: "shadow-[var(--shadow-lg)]",
  xl: "shadow-[var(--shadow-xl)]",
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", shadow = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-gray-800 border border-gray-700",
          cardPadding[padding],
          cardShadow[shadow],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-heading text-[var(--color-foreground)]", className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = "CardTitle"

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-body text-[var(--color-foreground-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pt-0", className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = "CardFooter"
