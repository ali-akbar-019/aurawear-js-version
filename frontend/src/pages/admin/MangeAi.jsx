import { Bot, Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";

const ManageAi = () => {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 sm:px-6">
            <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <CardContent className="flex flex-col items-center text-center py-8 sm:py-10 space-y-4 sm:space-y-5">

                    {/* Icon */}
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-400" />
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                        AI Management
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs sm:max-w-sm">
                        This feature is not implemented yet.
                        <br />
                        We're working on something smart 🤖
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                        <Construction className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Coming soon
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default ManageAi;
