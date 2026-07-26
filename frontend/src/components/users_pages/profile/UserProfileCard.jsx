import { Calendar, Mail, Shield, User } from "lucide-react";

export const UserProfileCard = ({ userData }) => {
    return (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full md:w-auto text-center md:text-left">
                    <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200">
                        <User className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-semibold text-foreground break-words">
                            {userData.name}
                        </h2>
                        <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground mt-2 break-words">
                            <Mail className="h-4 w-4 text-blue-600" />
                            {userData.email}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto text-sm text-muted-foreground mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>Member since {userData.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="font-medium capitalize">{userData.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
