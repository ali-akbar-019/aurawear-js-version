import React from "react";

import { ChevronDown } from "lucide-react";

const BasicInfoSection = ({
    expanded,
    toggleSection,
    product,
    setProduct,
    categories,
    targetGroups,
    stitchTypes,
    fitTypes,
    occasions,
    savings,
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
            <button
                onClick={toggleSection}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400">1</span>
                    </span>
                    Basic Information
                </h2>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""
                        }`}
                />
            </button>

            {expanded && (
                <div className="p-6 border-t border-slate-700/50 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Product Name *</Label>
                            <Input
                                value={product.name}
                                onChange={(e) =>
                                    setProduct((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                                }
                                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500"
                                placeholder="Product Name"
                            />
                        </div>

                        {/* Product Type */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Product Type</Label>
                            <Input
                                value={product.productType}
                                onChange={(e) =>
                                    setProduct((prev) =>
                                        prev ? { ...prev, productType: e.target.value } : prev
                                    )
                                }
                                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500"
                                placeholder="T-Shirt, Jeans..."
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Category *</Label>
                            <Select
                                value={product.categoryId}
                                onValueChange={(val) =>
                                    setProduct((prev) => (prev ? { ...prev, categoryId: val } : prev))
                                }
                            >
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Target Group */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Target Group</Label>
                            <Select
                                value={product.targetGroup}
                                onValueChange={(val) =>
                                    setProduct((prev) => (prev ? { ...prev, targetGroup: val } : prev))
                                }
                            >
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {targetGroups.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Stitch Type */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Stitch Type</Label>
                            <Select
                                value={product.stitchType}
                                onValueChange={(val) =>
                                    setProduct((prev) => (prev ? { ...prev, stitchType: val } : prev))
                                }
                            >
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {stitchTypes.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s.replace(/_/g, " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Fit Type */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Fit Type</Label>
                            <Select
                                value={product.fitType}
                                onValueChange={(val) =>
                                    setProduct((prev) => (prev ? { ...prev, fitType: val } : prev))
                                }
                            >
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {fitTypes.map((f) => (
                                        <SelectItem key={f} value={f}>
                                            {f.replace(/_/g, " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Occasion */}
                        <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Occasion</Label>
                            <Select
                                value={product.occasion}
                                onValueChange={(val) =>
                                    setProduct((prev) => (prev ? { ...prev, occasion: val } : prev))
                                }
                            >
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {occasions.map((o) => (
                                        <SelectItem key={o} value={o}>
                                            {o}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-700">
                        <h3 className="text-sm font-semibold text-slate-300 mb-4">Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Base Price (Rs)</Label>
                                <Input
                                    type="number"
                                    value={product.basePrice}
                                    onChange={(e) =>
                                        setProduct((prev) =>
                                            prev ? { ...prev, basePrice: Number(e.target.value) } : prev
                                        )
                                    }
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Discount Price (Rs)</Label>
                                <Input
                                    type="number"
                                    value={product.discountPrice}
                                    onChange={(e) =>
                                        setProduct((prev) =>
                                            prev ? { ...prev, discountPrice: Number(e.target.value) } : prev
                                        )
                                    }
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Savings</Label>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-emerald-400 font-semibold">
                                    Rs. {Math.max(0, savings).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 font-medium">Description</Label>
                        <Textarea
                            value={product.description}
                            onChange={(e) =>
                                setProduct((prev) => (prev ? { ...prev, description: e.target.value } : prev))
                            }
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 min-h-32"
                            placeholder="Describe product details"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-700">
                        <div>
                            <Label className="text-slate-300 font-medium">Product Status</Label>
                            <p className="text-slate-400 text-sm mt-1">
                                Make this product visible in your store
                            </p>
                        </div>
                        <Switch
                            checked={product.isActive}
                            onCheckedChange={(val) =>
                                setProduct((prev) => (prev ? { ...prev, isActive: val } : prev))
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasicInfoSection;