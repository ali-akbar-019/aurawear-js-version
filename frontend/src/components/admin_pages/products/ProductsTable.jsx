import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "lucide-react";

const ProductsTable = ({
    filteredProducts,
    getCategoryName,
    setDeletingProduct,
    setDeleteDialogOpen,
    searchQuery,
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-slate-700 bg-slate-900/50 hover:bg-slate-900/50">
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Name</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden md:table-cell">Category</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4">Price</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden lg:table-cell">Type</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden lg:table-cell">Fit</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 hidden sm:table-cell">Status</TableCell>
                            <TableCell className="text-slate-300 font-semibold py-4 px-4 text-right">Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow
                                    key={product._id}
                                    className="border-b border-slate-700 hover:bg-slate-800/50 transition duration-150"
                                >
                                    <TableCell className="py-4 px-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-medium text-sm truncate">{product.name}</span>
                                            <span className="text-slate-400 text-xs hidden sm:inline truncate">
                                                {product.description?.substring(0, 40)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-4 hidden md:table-cell">
                                        <span className="text-slate-300 text-sm">{getCategoryName(product.categoryId)}</span>
                                    </TableCell>
                                    <TableCell className="py-4 px-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-semibold text-sm">Rs. {product.basePrice}</span>
                                            {product.discountPrice && (
                                                <span className="text-green-400 text-xs font-medium">
                                                    -Rs. {(product.basePrice - product.discountPrice).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-4 hidden lg:table-cell">
                                        <span className="text-slate-300 text-sm">{product.productType}</span>
                                    </TableCell>
                                    <TableCell className="py-4 px-4 hidden lg:table-cell">
                                        <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-200 text-xs font-medium rounded-full">
                                            {product.fitType}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 px-4 hidden sm:table-cell">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${product.isActive ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                                                }`}
                                        >
                                            {product.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 px-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => navigate(`/admin/manage-products/edit/${product._id}`)}
                                                className="text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setDeletingProduct(product);
                                                    setDeleteDialogOpen(true);
                                                }}
                                                className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="border-b border-slate-700 hover:bg-slate-800/50">
                                <TableCell colSpan={7} className="py-12 px-4 text-center">
                                    <p className="text-slate-400 text-sm">
                                        {searchQuery
                                            ? "No products found matching your search"
                                            : "No products yet. Create one to get started!"}
                                    </p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProductsTable;