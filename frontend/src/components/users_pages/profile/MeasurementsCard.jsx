import { Edit2, Save, X, Ruler } from 'lucide-react';

export const MeasurementsCard = ({
    userData,
    formData,
    editMode,
    setEditMode,
    setFormData,
    handleInputChange,
    handleSaveMeasurements,
    resetForm,
    loading,
}) => {
    return (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50">
                        <Ruler className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Measurements</h3>
                </div>
                {editMode !== 'measurements' && (
                    <button
                        onClick={() => {
                            setEditMode('measurements');
                            setFormData({
                                ...formData,
                                heightCm: userData.heightCm?.toString() || '',
                                weightKg: userData.weightKg?.toString() || '',
                            });
                        }}
                        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="h-5 w-5" />
                    </button>
                )}
            </div>

            {editMode === 'measurements' ? (
                <div className="space-y-5">
                    {[
                        { label: 'Height (cm)', name: 'heightCm', placeholder: 'e.g., 180', min: 100, max: 250 },
                        { label: 'Weight (kg)', name: 'weightKg', placeholder: 'e.g., 75', min: 30, max: 300 },
                    ].map(field => (
                        <div key={field.name} className="flex flex-col">
                            <label className="block text-sm font-semibold text-foreground mb-2">{field.label}</label>
                            <input
                                type="number"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                min={field.min}
                                max={field.max}
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>
                    ))}

                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                        <button
                            onClick={handleSaveMeasurements}
                            disabled={loading}
                            className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
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
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Height</p>
                        <p className="text-foreground font-semibold text-lg mt-1 break-words">
                            {userData.heightCm || 'Not set'} <span className="text-sm text-muted-foreground">cm</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-gray-50/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Weight</p>
                        <p className="text-foreground font-semibold text-lg mt-1 break-words">
                            {userData.weightKg || 'Not set'} <span className="text-sm text-muted-foreground">kg</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
