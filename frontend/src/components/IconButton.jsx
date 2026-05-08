// components/IconButton.jsx
import { cn } from "@/lib/utils"

export function IconButton({
    children,
    onClick,
    className,
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative p-2 rounded-full text-muted-foreground transition-all",
                "hover:text-foreground hover:bg-muted/20 hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                className
            )}
        >
            {children}
        </button>
    )
}
