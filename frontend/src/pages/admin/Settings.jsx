
import {
    AlertTriangle,
    ChevronDown,
    Shield
} from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx"
import { Switch } from "@/components/ui/switch.jsx"
import { toast } from "sonner"

/* -------------------- */
/* Dummy Data */
/* -------------------- */
const dummyAdmin = {
    name: "Admin User",
    email: "admin@aurawear.com",
    role: "ADMIN",
    preferences: {
        darkMode: true,
        notifications: true,
        emailAlerts: false,
        language: "English"
    }
}

const languages = ["English", "Spanish", "French", "German"]

/* -------------------- */
/* Admin Settings Page */
/* -------------------- */
export default function AdminSettingsPage() {
    const [profile, setProfile] = useState({ ...dummyAdmin })
    const [passwords, setPasswords] = useState({
        current: "",
        newPassword: "",
        confirm: ""
    })

    const [expanded, setExpanded] = useState({
        profile: true,
        password: false,
        preferences: false,
        danger: false
    })

    const [resetDialogOpen, setResetDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const toggle = (key) =>
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

    /* -------------------- */
    /* Handlers */
    /* -------------------- */
    const saveProfile = () => toast.success("Profile updated")
    const savePreferences = () => toast.success("Preferences saved")

    const changePassword = () => {
        if (passwords.newPassword !== passwords.confirm) {
            toast.error("Passwords do not match")
            return
        }
        toast.success("Password updated")
        setPasswords({ current: "", newPassword: "", confirm: "" })
    }

    const resetSettings = () => {
        setProfile({ ...dummyAdmin })
        setResetDialogOpen(false)
        toast.success("Settings reset to default")
    }

    const deleteAccount = () => {
        setDeleteDialogOpen(false)
        toast.success("Account deletion triggered (dummy)")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <Shield className="w-7 h-7 text-emerald-400" />
                    <h1 className="text-2xl font-bold text-white">
                        Admin Settings
                    </h1>
                </div>

                {/* -------------------- Profile -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggle("profile")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-emerald-400">1</span>
                            </span>
                            Profile
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded.profile && "rotate-180"}`} />
                    </button>

                    {expanded.profile && (
                        <div className="p-6 border-t border-slate-700/50 space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20">
                                    <AvatarFallback className="text-xl">
                                        {profile.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Name</Label>
                                        <Input
                                            value={profile.name}
                                            onChange={e =>
                                                setProfile(p => ({ ...p, name: e.target.value }))
                                            }
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Email</Label>
                                        <Input
                                            value={profile.email}
                                            onChange={e =>
                                                setProfile(p => ({ ...p, email: e.target.value }))
                                            }
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Role</Label>
                                        <Input
                                            value={profile.role}
                                            disabled
                                            className="bg-slate-700/30 border-slate-600 text-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button onClick={saveProfile}>Save Profile</Button>
                        </div>
                    )}
                </div>

                {/* -------------------- Password -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggle("password")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                <span className="text-indigo-400">2</span>
                            </span>
                            Change Password
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded.password && "rotate-180"}`} />
                    </button>

                    {expanded.password && (
                        <div className="p-6 border-t border-slate-700/50 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    ["Current Password", "current"],
                                    ["New Password", "newPassword"],
                                    ["Confirm Password", "confirm"]
                                ].map(([label, key]) => (
                                    <div key={key} className="space-y-2">
                                        <Label className="text-slate-300">{label}</Label>
                                        <Input
                                            type="password"
                                            value={passwords[key]}
                                            onChange={e =>
                                                setPasswords(p => ({ ...p, [key]: e.target.value }))
                                            }
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>
                                ))}
                            </div>
                            <Button onClick={changePassword}>Update Password</Button>
                        </div>
                    )}
                </div>

                {/* -------------------- Preferences -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggle("preferences")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-blue-400">3</span>
                            </span>
                            Preferences
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded.preferences && "rotate-180"}`} />
                    </button>

                    {expanded.preferences && (
                        <div className="p-6 border-t border-slate-700/50 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Language</Label>
                                    <Select>
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                            <SelectValue placeholder={profile.preferences.language} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages.map(lang => (
                                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-slate-300">Dark Mode</Label>
                                        <p className="text-xs text-slate-500">Enable dark theme</p>
                                    </div>
                                    <Switch checked={profile.preferences.darkMode} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-slate-300">Notifications</Label>
                                        <p className="text-xs text-slate-500">Receive notifications</p>
                                    </div>
                                    <Switch checked={profile.preferences.notifications} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-slate-300">Email Alerts</Label>
                                        <p className="text-xs text-slate-500">Get email updates</p>
                                    </div>
                                    <Switch checked={profile.preferences.emailAlerts} />
                                </div>
                            </div>

                            <Button onClick={savePreferences}>Save Preferences</Button>
                        </div>
                    )}
                </div>

                {/* -------------------- Danger Zone -------------------- */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggle("danger")}
                        className="w-full flex items-center justify-between p-4 hover:bg-red-500/10"
                    >
                        <h2 className="text-lg font-semibold text-red-400 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4" />
                            </span>
                            Danger Zone
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-red-400 transition-transform ${expanded.danger && "rotate-180"}`} />
                    </button>

                    {expanded.danger && (
                        <div className="p-6 border-t border-red-500/20 space-y-4">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                                <p className="text-sm text-red-300">
                                    Actions in this section are irreversible. Proceed with caution.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setResetDialogOpen(true)}
                                    className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                                >
                                    Reset Settings
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeleteDialogOpen(true)}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dialogs */}
                <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                    <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader>
                            <DialogTitle className="text-white">Reset Settings?</DialogTitle>
                        </DialogHeader>
                        <p className="text-slate-300">This will reset all settings to default values.</p>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setResetDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={resetSettings}>Reset</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader>
                            <DialogTitle className="text-white">Delete Account?</DialogTitle>
                        </DialogHeader>
                        <p className="text-slate-300">This action cannot be undone. Your account and all data will be permanently deleted.</p>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={deleteAccount}>Delete Account</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
