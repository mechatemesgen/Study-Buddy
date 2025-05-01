import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" // Import VisuallyHidden

import { cn } from "@/lib/utils"

// Main Drawer component that handles the side opening logic
const Drawer = ({
  shouldScaleBackground = true, // Keep this prop if needed by vaul, otherwise remove
  children,
  open,
  onClose,
  side = "right", // Default to right, but Navbar passes "left"
  className, // Add className prop
  title, // Add title prop
  description, // Add description prop
  ...props
}) => {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      open={open}
      onOpenChange={onClose}
      direction={side} // Use direction prop for vaul
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed inset-y-0 z-50 h-full flex flex-col bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            side === "left"
              ? "left-0 border-r w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm"
              : "right-0 border-l w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
            className // Apply passed className
          )}
          {...props}
        >
          {/* Add VisuallyHidden Title and Description */}
          {title && (
            <VisuallyHidden>
              <DrawerPrimitive.Title>{title}</DrawerPrimitive.Title>
            </VisuallyHidden>
          )}
          {description && (
            <VisuallyHidden>
              <DrawerPrimitive.Description>{description}</DrawerPrimitive.Description>
            </VisuallyHidden>
          )}
          {/* Render children directly inside the content */}
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
Drawer.displayName = "Drawer"

// Re-export necessary primitives from vaul if needed elsewhere,
// otherwise, these can be removed if Navbar only needs Drawer.
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close
// Keep Portal and Overlay if they might be used for custom implementations
const DrawerPortal = DrawerPrimitive.Portal
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

export {
  Drawer,
  DrawerPortal, // Export if needed
  DrawerOverlay, // Export if needed
  DrawerTrigger, // Export if needed
  DrawerClose,  // Export if needed
}
