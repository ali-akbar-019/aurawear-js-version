import { Users, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const UsersHeader = ({ users, handleAddUser }) => {
    return (
        <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-blue-500/20 rounded-lg">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-50">Manage Users</h1>
                        </div>
                        <p className="text-slate-400 text-sm ml-11">
                            Create, edit, and manage user accounts and preferences
                        </p>
                    </div>

                    <Button
                        onClick={handleAddUser}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add User
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Users</p>
                            <p className="text-2xl font-bold text-slate-50">{users?.length || 0}</p>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-amber-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Admins</p>
                            <p className="text-2xl font-bold text-slate-50">
                                {users?.filter(u => u.role === 'ADMIN').length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersHeader;