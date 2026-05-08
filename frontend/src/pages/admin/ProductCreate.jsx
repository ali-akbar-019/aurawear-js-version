import ProductAIAttributesSection from "@/components/admin_pages/product_create/ProductAIAttributesSection"
import ProductBasicInfoSection from "@/components/admin_pages/product_create/ProductBasicInfoSection"
import ProductImagesSection from "@/components/admin_pages/product_create/ProductImagesSection"
import ProductVariantsSection from "@/components/admin_pages/product_create/ProductVariantsSection"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/contexts/CategoriesProvider"
import { useProduct } from "@/contexts/ProductContext"
import { uploadImageToCloudinary } from "@/lib/cloudinary"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const targetGroups = ["MEN", "WOMEN", "KIDS", "UNISEX", "OTHER"]
const stitchTypes = ["STITCHED", "UNSTITCHED", "SEMI_STITCHED"]
const fitTypes = ["SLIM_FIT", "REGULAR_FIT", "LOOSE_FIT"]
const occasions = ["CASUAL", "FORMAL", "PARTY", "ETHNIC"]
const bodyTypes = ["SLIM", "ATHLETIC", "AVERAGE", "HEAVY", "CURVY"]
const skinTones = ["FAIR", "LIGHT", "MEDIUM", "OLIVE", "BROWN", "DARK"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Purple',
    'Pink',
    'Black',
    'White',
    'Gray',
    'Brown',
    'Beige',
    'Navy',
    'Maroon',
    'Gold',
    'Teal',
    'Cyan',
    'Indigo',
    'Lime',
    'Olive',
    'Turquoise',
    'Magenta',
    'Violet',
];

const initialProduct = {
    name: "",
    description: "",
    productType: "",
    categoryId: "",
    targetGroup: "MEN",
    stitchType: "STITCHED",
    fitType: "REGULAR_FIT",
    occasion: "CASUAL",
    basePrice: 0,
    discountPrice: 0,
    isActive: true,
    variants: [{ size: "M", color: "Black", stock: 0 }],
    images: [{ url: "https://via.placeholder.com/150", isPrimary: true }],
    aiAttributes: { suitableBodyTypes: [], suitableSkinTones: [], recommendedHeightRange: { min: 0, max: 0 } }
}

const ProductCreate = () => {
    const navigate = useNavigate();
    const { categories } = useCategories()
    const { isLoading, createProduct, refreshProducts } = useProduct()
    const [product, setProduct] = useState({ ...initialProduct })
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        variants: true,
        images: true,
        ai: false
    })

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const handleImageChange = async (index, file) => {
        try {
            const url = await uploadImageToCloudinary(file)
            const updated = [...product.images]
            updated[index] = { ...updated[index], url, file }
            setProduct(prev => ({ ...prev, images: updated }))
        } catch (err) {
            toast.error("Image upload failed")
            console.error(err)
        }
    }

    const handleAddImage = () => {
        setProduct(prev => ({
            ...prev,
            images: [...prev.images, { url: "", isPrimary: false }]
        }))
    }

    const handleRemoveImage = (index) => {
        const updated = product.images.filter((_, i) => i !== index)
        setProduct(prev => ({ ...prev, images: updated }))
    }

    const handlePrimaryImage = (index) => {
        const updated = product.images.map((img, i) => ({ ...img, isPrimary: i === index }))
        setProduct(prev => ({ ...prev, images: updated }))
    }

    const handleVariantChange = (index, field, value) => {
        const updated = [...product.variants]
        updated[index][field] = value
        setProduct(prev => ({ ...prev, variants: updated }))
    }

    const handleAddVariant = () => {
        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, { size: "M", color: "Black", stock: 0 }]
        }))
    }

    const handleRemoveVariant = (index) => {
        const updated = product.variants.filter((_, i) => i !== index)
        setProduct(prev => ({ ...prev, variants: updated }))
    }

    const handleCancel = () => {
        setProduct({ ...initialProduct })
        toast("Creation cancelled")
    }

    const handleSave = async () => {
        try {
            if (product.images.some(img => !img.url)) {
                toast.error("Please upload all images")
                return
            }
            if (!product.name || !product.categoryId) {
                toast.error("Please fill in all required fields")
                return
            }
            await createProduct(product)
            toast.success("Product created successfully")
            setProduct({ ...initialProduct })
            refreshProducts()
        } catch (err) {
            toast.error("Failed to create product")
            console.error(err)
        }
    }

    const savings = product.basePrice - product.discountPrice

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(-1)}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <div>
                            <h1 className="text-3xl font-bold text-white leading-tight">
                                Create New Product
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">
                                Add a new product to your catalog with variants, images, and AI attributes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <ProductBasicInfoSection
                    product={product}
                    setProduct={setProduct}
                    expanded={expandedSections.basic}
                    toggleSection={() => toggleSection('basic')}
                    categories={categories}
                    targetGroups={targetGroups}
                    stitchTypes={stitchTypes}
                    fitTypes={fitTypes}
                    occasions={occasions}
                    savings={savings}
                />
                {/* Variants Section */}
                <ProductVariantsSection
                    variants={product.variants}
                    sizes={sizes}
                    colors={colors}
                    expanded={expandedSections.variants}
                    toggleSection={() => toggleSection('variants')}
                    handleVariantChange={handleVariantChange}
                    handleAddVariant={handleAddVariant}
                    handleRemoveVariant={handleRemoveVariant}
                />
                {/* Images Section */}
                <ProductImagesSection
                    images={product.images}
                    expanded={expandedSections.images}
                    toggleSection={() => toggleSection('images')}
                    handleImageChange={handleImageChange}
                    handleAddImage={handleAddImage}
                    handleRemoveImage={handleRemoveImage}
                    handlePrimaryImage={handlePrimaryImage}
                />

                {/* AI Attributes Section */}
                <ProductAIAttributesSection
                    expanded={expandedSections.ai}
                    toggleSection={() => toggleSection('ai')}
                    aiAttributes={product.aiAttributes}
                    bodyTypes={bodyTypes}
                    skinTones={skinTones}
                    setAIAttributes={(attrs) => setProduct(prev => ({ ...prev, aiAttributes: attrs }))}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="px-6 py-2 border-slate-600  hover:bg-slate-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    >
                        {isLoading ? "Creating..." : "Create Product"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate
