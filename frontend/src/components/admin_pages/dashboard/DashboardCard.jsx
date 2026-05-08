import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardCard = ({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
    trendText,
    trendColor,
    trendIcon: TrendIcon,
}) => {
    return (
        <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-200 text-sm font-medium">{title}</CardTitle>
                    <div className={`p-2 rounded-lg ${iconBg}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-3xl font-bold text-white">{value}</p>
                    {trendText && TrendIcon && trendColor && (
                        <div className="flex items-center gap-1 text-xs">
                            <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                            <span className={trendColor}>{trendText}</span>
                        </div>
                    )}
                    {trendText && !TrendIcon && trendColor && (
                        <div className="flex items-center gap-1 text-xs">
                            <span className={trendColor}>{trendText}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;