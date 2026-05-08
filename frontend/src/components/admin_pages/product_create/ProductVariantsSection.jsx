import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ChevronDown, Trash2, Plus } from "lucide-react";

const ProductVariantsSection = ({
    variants,
    sizes,
    colors,
    expanded,
    toggleSection,
    handleVariantChange,
    handleAddVariant,
    handleRemoveVariant
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl mb-6 overflow-hidden backdrop-blur-sm">
            <button
                onClick={toggleSection}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">2</span>
                    </span>
                    Size & Color Variants
                </h2>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
                <div className="p-6 border-t border-slate-700/50">
                    <div className="space-y-4">
                        {variants.map((variant, idx) => (
                            <div key={idx} className="bg-slate-700/20 rounded-lg p-4 border border-slate-700 space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm font-medium text-slate-400">Variant {idx + 1}</span>
                                    {idx > 0 && (
                                        <button
                                            onClick={() => handleRemoveVariant(idx)}
                                            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300 font-medium">Size</Label>
                                        <Select
                                            value={variant.size}
                                            onValueChange={val => handleVariantChange(idx, "size", val)}
                                        >
                                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-300 font-medium">Color</Label>
                                        <Select
                                            value={variant.color}
                                            onValueChange={val => handleVariantChange(idx, "color", val)}
                                        >
                                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-300 font-medium">Stock Quantity</Label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={variant.stock}
                                            onChange={e => handleVariantChange(idx, "stock", Number(e.target.value))}
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleAddVariant}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Variant
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductVariantsSection;