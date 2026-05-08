import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, ChevronDown, Image as ImageIcon, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { useCategories } from "@/contexts/CategoriesProvider"
import { useProduct } from "@/contexts/ProductContext"
import { uploadImageToCloudinary } from "@/lib/cloudinary"
import { Loading } from "@/components/Layout/Loading"

const targetGroups = ["MEN", "WOMEN", "KIDS", "UNISEX", "OTHER"]
const stitchTypes = ["STITCHED", "UNSTITCHED", "SEMI_STITCHED"]
const fitTypes = ["SLIM_FIT", "REGULAR_FIT", "LOOSE_FIT"]
const occasions = ["CASUAL", "FORMAL", "PARTY", "ETHNIC"]
const bodyTypes = ["SLIM", "ATHLETIC", "AVERAGE", "HEAVY", "CURVY"]
const skinTones = ["FAIR", "LIGHT", "MEDIUM", "OLIVE", "BROWN", "DARK"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const colors = ["Red", "Blue", "Green", "Black", "White", "Navy", "Gray", "Beige", "Brown", "Pink", "Purple", "Yellow"]

export default function EditProductPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { getProductById, updateProduct, deleteProduct } = useProduct()
    const { categories } = useCategories()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        variants: true,
        images: true,
        ai: false
    })

    // -------------------- Fetch product --------------------
    useEffect(() => {
        if (!id) return
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)
            } catch (err) {
                toast.error(err.message || "Failed to load product")
            } finally {
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    const savings = product.basePrice - product.discountPrice
    const getCategoryName = (id) => categories?.find(c => c._id === id)?.name || "Unknown"

    // -------------------- Handlers --------------------
    const handleCancel = () => {
        toast("Cancelled editing")
    }

    const handleSave = async () => {
        if (!product) return
        try {
            if (product.images.some(img => !img.url)) {
                toast.error("Please upload all images")
                return
            }
            if (!product.name || !product.categoryId) {
                toast.error("Please fill all required fields")
                return
            }
            await updateProduct(product._id, product)
            toast.success("Product saved successfully")
        } catch (err) {
            toast.error(err.message || "Save failed")
        }
    }

    const handleDelete = async () => {
        if (!product) return
        try {
            await deleteProduct(product._id)
            toast.success("Product deleted successfully")
            setDeleteDialogOpen(false)
            setProduct(null)
        } catch (err) {
            toast.error(err.message || "Delete failed")
        }
    }

    // -------------------- Variants --------------------
    const handleVariantChange = (index, field, value) => {
        setProduct(prev => {
            if (!prev) return prev
            const variants = [...prev.variants]
            variants[index][field] = value
            return { ...prev, variants }
        })
    }

    const handleAddVariant = () => {
        setProduct(prev => prev ? { ...prev, variants: [...prev.variants, { size: "M", color: "Black", stock: 0 }] } : prev)
    }

    const handleRemoveVariant = (index) => {
        setProduct(prev => prev ? { ...prev, variants: prev.variants.filter((_, i) => i !== index) } : prev)
    }

    // -------------------- Images --------------------
    const handleImageChange = async (index, file) => {
        if (!product) return
        try {
            const url = await uploadImageToCloudinary(file)
            setProduct(prev => {
                if (!prev) return prev
                const images = [...prev.images]
                images[index] = { ...images[index], url, file }
                return { ...prev, images }
            })
        } catch (err) {
            toast.error("Image upload failed")
            console.error(err)
        }
    }

    const handleAddImage = () => {
        setProduct(prev => prev ? { ...prev, images: [...prev.images, { url: "", isPrimary: false }] } : prev)
    }

    const handleRemoveImage = (index) => {
        setProduct(prev => prev ? { ...prev, images: prev.images.filter((_, i) => i !== index) } : prev)
    }

    const handlePrimaryImage = (index) => {
        setProduct(prev => prev ? { ...prev, images: prev.images.map((img, i) => ({ ...img, isPrimary: i === index })) } : prev)
    }
    if (isLoading) return <Loading text="Loading product..." size="lg" />

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="text-slate-300 hover:bg-slate-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-50">Product Details</h1>
                        <p className="text-slate-400 text-sm font-mono mt-1">ID: {product._id.substring(0, 16)}...</p>
                    </div>
                </div>


                <h1 className="text-3xl font-bold text-white">Edit Product</h1>

                {/* -------------------- Basic Info Section -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggleSection("basic")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-blue-400">1</span>
                            </span>
                            Basic Information
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.basic ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSections.basic && (
                        <div className="p-6 border-t border-slate-700/50 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Product Name *</Label>
                                    <Input
                                        value={product.name}
                                        onChange={e => setProduct(prev => prev ? { ...prev, name: e.target.value } : prev)}
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500"
                                        placeholder="Product Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Product Type</Label>
                                    <Input
                                        value={product.productType}
                                        onChange={e => setProduct(prev => prev ? { ...prev, productType: e.target.value } : prev)}
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500"
                                        placeholder="T-Shirt, Jeans..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Category *</Label>
                                    <Select
                                        value={product.categoryId}
                                        onValueChange={val => setProduct(prev => prev ? { ...prev, categoryId: val } : prev)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map(cat => (
                                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Target Group</Label>
                                    <Select
                                        value={product.targetGroup}
                                        onValueChange={val => setProduct(prev => prev ? { ...prev, targetGroup: val } : prev)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {targetGroups.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Stitch Type</Label>
                                    <Select
                                        value={product.stitchType}
                                        onValueChange={val => setProduct(prev => prev ? { ...prev, stitchType: val } : prev)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {stitchTypes.map(s => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Fit Type</Label>
                                    <Select
                                        value={product.fitType}
                                        onValueChange={val => setProduct(prev => prev ? { ...prev, fitType: val } : prev)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {fitTypes.map(f => <SelectItem key={f} value={f}>{f.replace(/_/g, " ")}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">Occasion</Label>
                                    <Select
                                        value={product.occasion}
                                        onValueChange={val => setProduct(prev => prev ? { ...prev, occasion: val } : prev)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {occasions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-700">
                                <h3 className="text-sm font-semibold text-slate-300 mb-4">Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Base Price ($)</Label>
                                        <Input
                                            type="number"
                                            value={product.basePrice}
                                            onChange={e => setProduct(prev => prev ? { ...prev, basePrice: Number(e.target.value) } : prev)}
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Discount Price ($)</Label>
                                        <Input
                                            type="number"
                                            value={product.discountPrice}
                                            onChange={e => setProduct(prev => prev ? { ...prev, discountPrice: Number(e.target.value) } : prev)}
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Savings</Label>
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-emerald-400 font-semibold">
                                            ${Math.max(0, savings).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description & Status */}
                            <div className="space-y-2">
                                <Label className="text-slate-300 font-medium">Description</Label>
                                <Textarea
                                    value={product.description}
                                    onChange={e => setProduct(prev => prev ? { ...prev, description: e.target.value } : prev)}
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 min-h-32"
                                    placeholder="Describe product details"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-700">
                                <div>
                                    <Label className="text-slate-300 font-medium">Product Status</Label>
                                    <p className="text-slate-400 text-sm mt-1">Make this product visible in your store</p>
                                </div>
                                <Switch
                                    checked={product.isActive}
                                    onCheckedChange={val => setProduct(prev => prev ? { ...prev, isActive: val } : prev)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* -------------------- Variants Section -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggleSection("variants")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <span className="text-purple-400">2</span>
                            </span>
                            Variants
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.variants ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSections.variants && (
                        <div className="p-6 border-t border-slate-700/50 space-y-4">
                            {product.variants.map((variant, idx) => (
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
                                            <Select value={variant.size} onValueChange={val => handleVariantChange(idx, "size", val)}>
                                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    {sizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-300 font-medium">Color</Label>
                                            <Select value={variant.color} onValueChange={val => handleVariantChange(idx, "color", val)}>
                                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    {colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-300 font-medium">Stock</Label>
                                            <Input
                                                type="number"
                                                value={variant.stock}
                                                onChange={e => handleVariantChange(idx, "stock", Number(e.target.value))}
                                                className="bg-slate-700/50 border-slate-600 text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 mt-2"
                                onClick={handleAddVariant}
                            >
                                <Plus className="w-4 h-4" /> Add Variant
                            </Button>
                        </div>
                    )}
                </div>

                {/* -------------------- Images Section -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        onClick={() => toggleSection("images")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-emerald-400">3</span>
                            </span>
                            Images
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.images ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSections.images && (
                        <div className="p-6 border-t border-slate-700/50 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="relative bg-slate-700/20 rounded-lg p-2 border border-slate-600 flex flex-col items-center">
                                        <div className="w-full h-40 bg-slate-800/50 flex items-center justify-center rounded-lg overflow-hidden">
                                            {img.url ? (
                                                <img src={img.url} alt={`Product image ${idx + 1}`} className="object-cover w-full h-full" />
                                            ) : (
                                                <span className="text-slate-400"><ImageIcon className="w-6 h-6" /></span>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            className="mt-2 text-sm text-white"
                                            onChange={e => e.target.files && handleImageChange(idx, e.target.files[0])}
                                        />
                                        <div className="flex items-center justify-between w-full mt-2">
                                            <Button
                                                size="sm"
                                                variant={img.isPrimary ? "default" : "outline"}
                                                onClick={() => handlePrimaryImage(idx)}
                                            >
                                                {img.isPrimary ? <Check className="w-4 h-4 mr-1" /> : null} Primary
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleRemoveImage(idx)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="flex items-center justify-center gap-2" onClick={handleAddImage}>
                                    <Plus className="w-5 h-5" /> Add Image
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* -------------------- AI Attributes Section -------------------- */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <button
                        type="button"
                        onClick={() => toggleSection("ai")}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                                <span className="text-pink-400">4</span>
                            </span>
                            AI Attributes
                        </h2>
                        <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.ai ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {expandedSections.ai && (
                        <div className="p-6 border-t border-slate-700/50 space-y-6">

                            {/* Body Types */}
                            <div className="space-y-2">
                                <Label className="text-slate-300 font-medium">
                                    Suitable Body Types
                                </Label>

                                <div className="flex flex-wrap gap-2">
                                    {bodyTypes.map((bt) => {
                                        const selected =
                                            product?.aiAttributes?.suitableBodyTypes?.includes(bt)

                                        return (
                                            <button
                                                key={bt}
                                                type="button"
                                                onClick={() =>
                                                    setProduct((prev) => {
                                                        if (!prev) return prev

                                                        const current =
                                                            prev.aiAttributes?.suitableBodyTypes || []

                                                        const updated = current.includes(bt)
                                                            ? current.filter((x) => x !== bt)
                                                            : [...current, bt]

                                                        return {
                                                            ...prev,
                                                            aiAttributes: {
                                                                ...prev.aiAttributes,
                                                                suitableBodyTypes: updated,
                                                            },
                                                        }
                                                    })
                                                }
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selected
                                                    ? "bg-blue-600 text-white border border-blue-400"
                                                    : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-blue-500"
                                                    }`}
                                            >
                                                {bt}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Skin Tones */}
                            <div className="space-y-2">
                                <Label className="text-slate-300 font-medium">
                                    Suitable Skin Tones
                                </Label>

                                <div className="flex flex-wrap gap-2">
                                    {skinTones.map((st) => {
                                        const selected =
                                            product?.aiAttributes?.suitableSkinTones?.includes(st)

                                        return (
                                            <button
                                                key={st}
                                                type="button"
                                                onClick={() =>
                                                    setProduct((prev) => {
                                                        if (!prev) return prev

                                                        const current =
                                                            prev.aiAttributes?.suitableSkinTones || []

                                                        const updated = current.includes(st)
                                                            ? current.filter((x) => x !== st)
                                                            : [...current, st]

                                                        return {
                                                            ...prev,
                                                            aiAttributes: {
                                                                ...prev.aiAttributes,
                                                                suitableSkinTones: updated,
                                                            },
                                                        }
                                                    })
                                                }
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selected
                                                    ? "bg-blue-600 text-white border border-blue-400"
                                                    : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-blue-500"
                                                    }`}
                                            >
                                                {st}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Height Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">
                                        Recommended Min Height (cm)
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            product?.aiAttributes?.recommendedHeightRange?.min || ""
                                        }
                                        onChange={(e) =>
                                            setProduct((prev) => {
                                                if (!prev) return prev

                                                return {
                                                    ...prev,
                                                    aiAttributes: {
                                                        ...prev.aiAttributes,
                                                        recommendedHeightRange: {
                                                            ...prev.aiAttributes?.recommendedHeightRange,
                                                            min: e.target.value
                                                                ? Number(e.target.value)
                                                                : "",
                                                        },
                                                    },
                                                }
                                            })
                                        }
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300 font-medium">
                                        Recommended Max Height (cm)
                                    </Label>

                                    <Input
                                        type="number"
                                        value={
                                            product?.aiAttributes?.recommendedHeightRange?.max || ""
                                        }
                                        onChange={(e) =>
                                            setProduct((prev) => {
                                                if (!prev) return prev

                                                return {
                                                    ...prev,
                                                    aiAttributes: {
                                                        ...prev.aiAttributes,
                                                        recommendedHeightRange: {
                                                            ...prev.aiAttributes?.recommendedHeightRange,
                                                            max: e.target.value
                                                                ? Number(e.target.value)
                                                                : "",
                                                        },
                                                    },
                                                }
                                            })
                                        }
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* -------------------- Action Buttons -------------------- */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <Button variant="default" onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>Delete Product</Button>
                </div>

                {/* -------------------- Delete Confirmation Dialog -------------------- */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Product</DialogTitle>
                        </DialogHeader>
                        <p className="text-slate-300">Are you sure you want to delete this product? This action cannot be undone.</p>
                        <DialogFooter className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
