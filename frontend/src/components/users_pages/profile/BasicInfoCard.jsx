import { Edit2, Save, X } from 'lucide-react';

export const BasicInfoCard = ({
    userData,
    formData,
    editMode,
    setEditMode,
    setFormData,
    handleInputChange,
    handleSaveProfile,
    resetForm,
    loading,
}) => {
    return (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">Basic Information</h3>
                {editMode !== 'profile' && (
                    <button
                        onClick={() => {
                            setEditMode('profile');
                            setFormData({
                                ...formData,
                                name: userData.name,
                                email: userData.email,
                            });
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="h-5 w-5" />
                    </button>
                )}
            </div>

            {editMode === 'profile' ? (
                <div className="space-y-5">
                    <div className="flex flex-col">
                        <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData.email}
                            className="w-full rounded-lg border border-border bg-gray-50 px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none cursor-not-allowed opacity-75"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                        <button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                        >
                            <Save className="h-4 w-4" />
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={resetForm}
                            disabled={loading}
                            className="flex-1 rounded-lg border border-border px-4 py-3 text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</p>
                        <p className="text-foreground font-semibold text-lg mt-1 break-words">{userData.name}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</p>
                        <p className="text-foreground font-semibold text-lg mt-1 break-words">{userData.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
