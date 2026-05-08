import { Shield } from "lucide-react";

export const AccountSettingsCard = ({
    userData,
    onDeleteAccount,
}) => {
    return (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-50">
                        <Shield className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Account Settings</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member Since</p>
                    <p className="text-foreground font-semibold text-lg mt-1 break-words">{userData.createdAt}</p>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Updated</p>
                    <p className="text-foreground font-semibold text-lg mt-1 break-words">{userData.updatedAt}</p>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50 md:col-span-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Account Status</p>
                    <p className="text-foreground font-semibold text-lg mt-1 inline-block px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {userData.status || "Active"}
                    </p>
                </div>

                <div className="md:col-span-2">
                    <button
                        onClick={onDeleteAccount}
                        className="mt-2 w-full rounded-lg border border-red-300 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};
