import React from "react";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Check, ImageIcon, ChevronDown } from "lucide-react";

const ProductImagesSection = ({
    images,
    expanded,
    toggleSection,
    handleImageChange,
    handleAddImage,
    handleRemoveImage,
    handlePrimaryImage,
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl mb-6 overflow-hidden backdrop-blur-sm">
            <button
                onClick={toggleSection}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <span className="text-amber-400">3</span>
                    </span>
                    Product Images
                </h2>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
                <div className="p-6 border-t border-slate-700/50 space-y-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="bg-slate-700/20 rounded-lg p-4 border border-slate-700 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-300">Image {idx + 1}</span>
                                {img.isPrimary && (
                                    <span className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                                        <Check className="w-3 h-3" /> Primary
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div className="md:col-span-2 space-y-2">
                                    <Label className="text-slate-300 text-sm">Upload Image</Label>
                                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-slate-700 transition-colors">
                                        <ImageIcon className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-400">{img.url ? 'Change Image' : 'Choose Image'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => e.target.files?.[0] && handleImageChange(idx, e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePrimaryImage(idx)}
                                        className={`flex-1 py-2 px-3 rounded-lg border transition-colors text-sm font-medium ${img.isPrimary
                                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                            : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-emerald-500'
                                            }`}
                                    >
                                        Set Primary
                                    </button>
                                    {idx > 0 && (
                                        <button
                                            onClick={() => handleRemoveImage(idx)}
                                            className="py-2 px-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {img.url && (
                                <div className="mt-3 rounded-lg overflow-hidden border border-slate-700">
                                    <img src={img.url} alt={`Product ${idx + 1}`} className="w-full h-32 object-cover" />
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleAddImage}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductImagesSection;