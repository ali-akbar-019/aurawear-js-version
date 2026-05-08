
import { useCreateUserMutation, useUpdateUserMutation } from "@/api/admin.jsx"
import DeleteUserDialog from "@/components/admin_pages/users/DeleteUserDialog.jsx"
import UserModal from "@/components/admin_pages/users/UserModal.jsx"
import UsersHeader from "@/components/admin_pages/users/UsersHeader.jsx"
import UsersTable from "@/components/admin_pages/users/UsersTable.jsx"
import { useUsers } from "@/contexts/UserContext.jsx"
import { useState } from "react"
import { toast } from "sonner"

export default function ManageUsersPage() {
    const { users, deleteUser } = useUsers()
    const { mutateAsync: createUser } = useCreateUserMutation()
    const { mutateAsync: updateUser } = useUpdateUserMutation()

    // -------------------- Modal state --------------------
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [deletingUser, setDeletingUser] = useState(null)

    // -------------------- Form state --------------------
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        gender: '',
        preferredTargetGroup: '',
        skinTone: '',
        bodyType: '',
        heightCm: '',
        weightKg: '',
    })

    // -------------------- Add user --------------------
    const handleAddUser = () => {
        setEditingUser(null)
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'USER',
            gender: '',
            preferredTargetGroup: '',
            skinTone: '',
            bodyType: '',
            heightCm: '',
            weightKg: '',
        })
        setModalOpen(true)
    }

    // -------------------- Edit user --------------------
    const handleEditUser = (user) => {
        setEditingUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            gender: user.gender ?? '',
            preferredTargetGroup: user.preferredTargetGroup ?? '',
            skinTone: user.skinTone ?? '',
            bodyType: user.bodyType ?? '',
            heightCm: user.heightCm ? String(user.heightCm) : '',
            weightKg: user.weightKg ? String(user.weightKg) : '',
        })
        setModalOpen(true)
    }

    // -------------------- Save user --------------------
    const handleSaveUser = async () => {
        try {
            if (editingUser) {
                // UPDATE EXISTING USER (ADMIN)
                await updateUser({
                    id: editingUser._id,
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    gender: formData.gender || undefined,
                    preferredTargetGroup: formData.preferredTargetGroup || undefined,
                    skinTone: formData.skinTone || undefined,
                    bodyType: formData.bodyType || undefined,
                    heightCm: formData.heightCm ? Number(formData.heightCm) : undefined,
                    weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
                })

                toast.success('User updated successfully')
            } else {
                // CREATE NEW USER (ADMIN)
                await createUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                })

                toast.success('User created successfully')
            }

            setModalOpen(false)
        } catch (err) {
            toast.error(err.message || 'Something went wrong')
        }
    }

    // -------------------- Delete user --------------------
    const handleDeleteUser = async () => {
        if (!deletingUser) return

        try {
            await deleteUser(deletingUser._id)
            toast.success('User deleted successfully')
        } catch (err) {
            toast.error(err.message || 'Delete failed')
        } finally {
            setDeleteDialogOpen(false)
            setDeletingUser(null)
        }
    }

    const getRoleBadgeStyles = (role) => {
        if (role === 'ADMIN') {
            return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
        }
        return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-500/30'
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Header Section */}
            <UsersHeader users={users} handleAddUser={handleAddUser} />

            {/* Table Section */}
            <UsersTable
                users={users}
                handleEditUser={handleEditUser}
                setDeletingUser={setDeletingUser}
                setDeleteDialogOpen={setDeleteDialogOpen}
                getRoleBadgeStyles={getRoleBadgeStyles}
            />

            {/* Create / Edit Modal */}
            <UserModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                editingUser={editingUser}
                formData={formData}
                setFormData={setFormData}
                handleSaveUser={handleSaveUser}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteUserDialog
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                deletingUser={deletingUser}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    )
}
