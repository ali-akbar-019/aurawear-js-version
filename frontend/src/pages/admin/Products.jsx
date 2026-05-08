
import ProductsHeader from "@/components/admin_pages/products/ProductsHeader.jsx"
import ProductsSearch from "@/components/admin_pages/products/ProductsSearch.jsx"
import ProductsTable from "@/components/admin_pages/products/ProductsTable.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.jsx"
import { useCategories } from "@/contexts/CategoriesProvider.jsx"
import { useProduct } from "@/contexts/ProductContext.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function ManageProductsPage() {
    const navigate = useNavigate()
    const { products, deleteProduct } = useProduct()
    const { categories } = useCategories()

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Get category name
    const getCategoryName = (id) => {
        const cat = categories && categories.find(c => c._id === id)
        return cat ? cat.name : "Unknown"
    }

    // Filter products based on search
    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productType?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    // Delete product
    const handleDeleteProduct = async () => {
        if (!deletingProduct) return

        try {
            await deleteProduct(deletingProduct._id)
            toast.success("Product deleted successfully")
            setDeleteDialogOpen(false)
            setDeletingProduct(null)
            navigate("/admin/manage-products")
        } catch (error) {
            toast.error(error?.message || "Failed to delete product")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <ProductsHeader
                productsCount={products?.length || 0}
                activeProductsCount={products?.filter(p => p.isActive).length || 0}
                categoriesCount={categories?.length || 0}
            />

            {/* Search Section */}
            <ProductsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Products Table */}
            <ProductsTable
                filteredProducts={filteredProducts}
                getCategoryName={getCategoryName}
                setDeletingProduct={setDeletingProduct}
                setDeleteDialogOpen={setDeleteDialogOpen}
                searchQuery={searchQuery}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-slate-800 border border-slate-700 max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Delete Product</DialogTitle>
                    </DialogHeader>
                    <p className="text-slate-300">
                        Are you sure you want to delete <strong className="text-white">{deletingProduct?.name}</strong>? This action cannot be undone.
                    </p>
                    <DialogFooter className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="bg-slate-700 hover:bg-slate-600 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteProduct}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete Product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
