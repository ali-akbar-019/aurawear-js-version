import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = (props) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme}
            position="top-right"
            richColors
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="h-4 w-4 text-emerald-500" />,
                info: <InfoIcon className="h-4 w-4 text-blue-500" />,
                warning: <TriangleAlertIcon className="h-4 w-4 text-amber-500" />,
                error: <OctagonXIcon className="h-4 w-4 text-red-500" />,
                loading: <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />,
            }}
            toastOptions={{
                classNames: {
                    toast:
                        "group relative flex items-start gap-3 rounded-xl border border-border bg-background/95 backdrop-blur px-4 py-3 shadow-lg",
                    title: "text-sm font-semibold text-foreground",
                    description: "text-sm text-muted-foreground",
                    actionButton:
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                    cancelButton:
                        "bg-muted text-muted-foreground hover:bg-muted/80",
                },
            }}
            style={
                {
                    "--border-radius": "12px",
                }
            }
            {...props}
        />
    )
}

export { Toaster }
