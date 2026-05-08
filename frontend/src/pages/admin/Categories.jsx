
import { Button } from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { useCategories } from "@/contexts/CategoriesProvider.jsx";
import { FolderOpen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CategoriesPage = () => {
    const { categories, isLoading, addCategory, deleteCategory } = useCategories();

    const [categoryName, setCategoryName] = useState("");
    const [parentId, setParentId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = async () => {
        try {
            const finalParentId =
                parentId === "NO_PARENT" ? null : parentId;

            await addCategory({
                name: categoryName,
                parentId: finalParentId,
            });

            toast.success("Category added successfully");
            setCategoryName("");
            setParentId(null);
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error.message || "Failed to add category");
        }
    };

    const handleDeleteCategory = async () => {
        if (!deletingCategory) return;
        try {
            await deleteCategory(deletingCategory._id);
            toast.success("Category deleted successfully");
            setDeleteDialogOpen(false);
            setDeletingCategory(null);
        } catch (error) {
            toast.error(error.message || "Failed to delete category");
        }
    };

    const getCategoryName = (id) => {
        if (!id) return "Top Level";
        return categories?.find(c => c._id === id)?.name || "Unknown";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-500/20 rounded-lg">
                                <FolderOpen className="w-5 h-5 text-indigo-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-50">Categories</h1>
                        </div>
                        <p className="text-slate-400 text-sm ml-11">Organize and manage your product categories</p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center">
                                <Plus className="w-4 h-4" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-slate-900 border border-slate-700 text-slate-50">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-slate-50">
                                    Add New Category
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <Input
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                                />
                                <Select value={parentId || ""} onValueChange={(val) => setParentId(val || null)}>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-50">
                                        <SelectValue placeholder="Select Parent Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="NO_PARENT" className="text-slate-50">No Parent (Top Level)</SelectItem>
                                        {categories?.map((cat) => (
                                            <SelectItem key={cat._id} value={cat._id} className="text-slate-50">
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter className="gap-2 mt-6">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddCategory}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    Add Category
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <p className="text-slate-400 text-sm font-medium">Total Categories</p>
                        <p className="text-2xl font-bold text-white mt-2">{categories?.length || 0}</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <p className="text-slate-400 text-sm font-medium">Top Level</p>
                        <p className="text-2xl font-bold text-indigo-400 mt-2">
                            {categories?.filter(c => !c.parentId).length || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                        <p className="text-slate-400 text-sm font-medium">Subcategories</p>
                        <p className="text-2xl font-bold text-blue-400 mt-2">
                            {categories?.filter(c => c.parentId).length || 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-slate-400">Loading categories...</p>
                </div>
            ) : (
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-slate-700 bg-slate-900/50 hover:bg-slate-900/50">
                                    <TableCell className="text-slate-300 font-semibold py-4 px-4">Name</TableCell>
                                    <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden md:table-cell">Parent Category</TableCell>
                                    <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden lg:table-cell">Created At</TableCell>
                                    <TableCell className="text-slate-300 font-semibold py-4 px-4 text-right">Actions</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories && categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <TableRow
                                            key={cat._id}
                                            className="border-b border-slate-700 hover:bg-slate-800/50 transition duration-150"
                                        >
                                            <TableCell className="py-4 px-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-white font-medium text-sm">{cat.name}</span>
                                                    {cat.parentId && (
                                                        <span className="text-slate-400 text-xs">
                                                            Child of: {getCategoryName(cat.parentId)}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 px-4 hidden md:table-cell">
                                                <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-200 text-xs font-medium rounded-full">
                                                    {getCategoryName(cat.parentId)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 px-4 hidden lg:table-cell">
                                                <span className="text-slate-300 text-sm">
                                                    {new Date(cat.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 px-4">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                                                        onClick={() => {
                                                            setDeletingCategory(cat);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow className="border-b border-slate-700 hover:bg-slate-800/50">
                                        <TableCell colSpan={4} className="py-12 px-4 text-center">
                                            <p className="text-slate-400 text-sm">
                                                No categories yet. Create one to get started!
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-slate-800 border border-slate-700 max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Delete Category</DialogTitle>
                    </DialogHeader>
                    <p className="text-slate-300">
                        Are you sure you want to delete <strong className="text-white">{deletingCategory?.name}</strong>? This action cannot be undone.
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
                            onClick={handleDeleteCategory}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoriesPage;
