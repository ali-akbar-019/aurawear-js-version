import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const UserModal = ({
    modalOpen,
    setModalOpen,
    editingUser,
    formData,
    setFormData,
    handleSaveUser
}) => {
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-2xl bg-slate-900 border border-slate-700 text-slate-50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-50">
                        {editingUser ? "Edit User" : "Create New User"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 mt-4">
                    {/* Basic Info */}
                    <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-300 px-1">Basic Information</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                            />
                            <Input
                                placeholder="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                            />
                        </div>
                        {!editingUser && (
                            <Input
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                            />
                        )}
                    </div>

                    {/* Role */}
                    <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-300 px-1">Role & Permissions</div>
                        <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-50">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="USER" className="text-slate-50">User</SelectItem>
                                <SelectItem value="ADMIN" className="text-slate-50">Administrator</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-300 px-1">Personal Details</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-50">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                    <SelectItem value="MALE" className="text-slate-50">Male</SelectItem>
                                    <SelectItem value="FEMALE" className="text-slate-50">Female</SelectItem>
                                    <SelectItem value="OTHER" className="text-slate-50">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={formData.skinTone} onValueChange={(val) => setFormData({ ...formData, skinTone: val })}>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-50">
                                    <SelectValue placeholder="Skin Tone" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                    <SelectItem value="FAIR" className="text-slate-50">Fair</SelectItem>
                                    <SelectItem value="LIGHT" className="text-slate-50">Light</SelectItem>
                                    <SelectItem value="MEDIUM" className="text-slate-50">Medium</SelectItem>
                                    <SelectItem value="OLIVE" className="text-slate-50">Olive</SelectItem>
                                    <SelectItem value="BROWN" className="text-slate-50">Brown</SelectItem>
                                    <SelectItem value="DARK" className="text-slate-50">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Style Preferences & Measurements */}
                    {/* ...you can keep all other sections similarly */}
                </div>

                <DialogFooter className="mt-6 gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setModalOpen(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveUser}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {editingUser ? "Update User" : "Create User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;