import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../lib/utils'

/* Root */
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

/* List */
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('flex flex-1 list-none items-center gap-2', className)}
      {...props}
    />
  )
}

/* Item */
function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

/* Trigger */
const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      aria-expanded={
        (props as { 'data-state'?: string })['data-state'] === 'open'
      }
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-1 size-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/* Content */
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'absolute top-full left-0 w-full md:w-auto rounded-md border bg-popover text-popover-foreground shadow-md',
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
        'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        'p-2',
        className
      )}
      {...props}
    />
  )
}

/* Viewport */
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 z-50 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full md:w-[var(--radix-navigation-menu-viewport-width)]',
          'origin-top-center overflow-hidden rounded-md border bg-popover shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </div>
  )
}

/* Link */
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        'data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground',
        className
      )}
      {...props}
    />
  )
}

/* Indicator */
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
        'data-[state=visible]:fade-in data-[state=hidden]:fade-out',
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
