import React from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const ProductAIAttributesSection = ({
    expanded,
    toggleSection,
    aiAttributes,
    bodyTypes,
    skinTones,
    setAIAttributes
}) => {

    const handleToggleBodyType = (bt) => {
        const newBodyTypes = aiAttributes.suitableBodyTypes.includes(bt)
            ? aiAttributes.suitableBodyTypes.filter(b => b !== bt)
            : [...aiAttributes.suitableBodyTypes, bt];
        setAIAttributes({ ...aiAttributes, suitableBodyTypes: newBodyTypes });
    };

    const handleToggleSkinTone = (st) => {
        const newSkinTones = aiAttributes.suitableSkinTones.includes(st)
            ? aiAttributes.suitableSkinTones.filter(s => s !== st)
            : [...aiAttributes.suitableSkinTones, st];
        setAIAttributes({ ...aiAttributes, suitableSkinTones: newSkinTones });
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl mb-8 overflow-hidden backdrop-blur-sm">
            <button
                onClick={toggleSection}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className="text-cyan-400">4</span>
                    </span>
                    AI Attributes (Optional)
                </h2>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
                <div className="p-6 border-t border-slate-700/50 space-y-6">
                    {/* Suitable Body Types */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 font-medium">Suitable Body Types</Label>
                        <div className="flex flex-wrap gap-2">
                            {bodyTypes.map(bt => (
                                <button
                                    key={bt}
                                    onClick={() => handleToggleBodyType(bt)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${aiAttributes.suitableBodyTypes.includes(bt)
                                        ? 'bg-blue-600 text-white border border-blue-400'
                                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-blue-500'
                                        }`}
                                >
                                    {bt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Suitable Skin Tones */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 font-medium">Suitable Skin Tones</Label>
                        <div className="flex flex-wrap gap-2">
                            {skinTones.map(st => (
                                <button
                                    key={st}
                                    onClick={() => handleToggleSkinTone(st)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${aiAttributes.suitableSkinTones.includes(st)
                                        ? 'bg-blue-600 text-white border border-blue-400'
                                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-blue-500'
                                        }`}
                                >
                                    {st}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Height Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Min Recommended Height (cm)</Label>
                            <input
                                type="number"
                                placeholder="e.g., 160"
                                value={aiAttributes.recommendedHeightRange.min}
                                onChange={e => setAIAttributes({
                                    ...aiAttributes,
                                    recommendedHeightRange: { ...aiAttributes.recommendedHeightRange, min: Number(e.target.value) }
                                })}
                                className="bg-slate-700/50 border-slate-600 text-white px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Max Recommended Height (cm)</Label>
                            <input
                                type="number"
                                placeholder="e.g., 190"
                                value={aiAttributes.recommendedHeightRange.max}
                                onChange={e => setAIAttributes({
                                    ...aiAttributes,
                                    recommendedHeightRange: { ...aiAttributes.recommendedHeightRange, max: Number(e.target.value) }
                                })}
                                className="bg-slate-700/50 border-slate-600 text-white px-3 py-2 rounded-md w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductAIAttributesSection;