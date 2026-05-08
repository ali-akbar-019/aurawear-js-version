import { Loader } from "lucide-react";

export const Loading = ({ text = "Loading...", size = "md" }) => {
    const sizeClass = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    }[size];

    return (
        <div className="flex flex-col items-center justify-center space-y-2 py-8">
            <Loader className={`animate-spin text-primary ${sizeClass}`} />
            <p className="text-sm text-muted-foreground">{text}</p>
        </div>
    );
};
