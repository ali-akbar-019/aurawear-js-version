import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Edit, Trash2 } from "lucide-react";

const UsersTable = ({
    users,
    handleEditUser,
    setDeletingUser,
    setDeleteDialogOpen,
    getRoleBadgeStyles,
}) => {
    return (
        <div className="p-6">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-xl">
                {users && users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-slate-700/50 hover:bg-transparent bg-slate-800/30">
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200">Name</TableCell>
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200">Email</TableCell>
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200">Role</TableCell>
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200 hidden md:table-cell">Gender</TableCell>
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200 hidden lg:table-cell">Target Group</TableCell>
                                    <TableCell className="px-6 py-4 font-semibold text-slate-200 text-right">Actions</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-slate-50">{user.name}</p>
                                                <p className="text-xs text-slate-500 mt-1">{user._id.slice(0, 8)}...</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-slate-300">{user.email}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyles(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-slate-300 hidden md:table-cell">
                                            {user.gender ? <span className="text-slate-400">{user.gender}</span> : <span className="text-slate-500 italic">—</span>}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-slate-300 hidden lg:table-cell">
                                            {user.preferredTargetGroup ? <span className="text-slate-400">{user.preferredTargetGroup}</span> : <span className="text-slate-500 italic">—</span>}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditUser(user)}
                                                    className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setDeletingUser(user);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                    className="hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-6">
                        <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                            <Users className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-slate-400 text-center">No users found. Create your first user to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersTable;