import { Edit2, Save, X, Palette } from 'lucide-react';

export const StylePreferencesCard = ({
    userData,
    formData,
    editMode,
    setEditMode,
    setFormData,
    handleInputChange,
    handleSaveStyle,
    resetForm,
    loading,
}) => {
    return (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50">
                        <Palette className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Style Preferences</h3>
                </div>
                {editMode !== 'style' && (
                    <button
                        onClick={() => {
                            setEditMode('style');
                            setFormData({
                                ...formData,
                                gender: userData.gender || '',
                                preferredTargetGroup: userData.preferredTargetGroup || '',
                                skinTone: userData.skinTone || '',
                                bodyType: userData.bodyType || '',
                            });
                        }}
                        className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="h-5 w-5" />
                    </button>
                )}
            </div>

            {editMode === 'style' ? (
                <div className="space-y-5">
                    {[
                        { label: 'Gender', name: 'gender', options: ['', 'MALE', 'FEMALE', 'OTHER'] },
                        { label: 'Preferred Target Group', name: 'preferredTargetGroup', options: ['', 'MEN', 'WOMEN', 'KIDS', 'UNISEX'] },
                        { label: 'Skin Tone', name: 'skinTone', options: ['', 'FAIR', 'LIGHT', 'MEDIUM', 'OLIVE', 'BROWN', 'DARK'] },
                        { label: 'Body Type', name: 'bodyType', options: ['', 'SLIM', 'ATHLETIC', 'AVERAGE', 'HEAVY', 'CURVY'] },
                    ].map(field => (
                        <div key={field.name} className="flex flex-col">
                            <label className="block text-sm font-semibold text-foreground mb-2">{field.label}</label>
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            >
                                {field.options.map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt === '' ? `Select ${field.label}` : opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                        <button
                            onClick={handleSaveStyle}
                            disabled={loading}
                            className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
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
                    {[
                        { label: 'Gender', value: userData.gender },
                        { label: 'Target Group', value: userData.preferredTargetGroup },
                        { label: 'Skin Tone', value: userData.skinTone },
                        { label: 'Body Type', value: userData.bodyType },
                    ].map(field => (
                        <div key={field.label} className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{field.label}</p>
                            <p className="text-foreground font-semibold text-lg mt-1 break-words">{field.value || 'Not set'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
