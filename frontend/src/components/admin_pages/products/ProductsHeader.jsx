import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsHeader = ({
    productsCount,
    activeProductsCount,
    categoriesCount,
}) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Products</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your fashion collection</p>
                </div>
                <Button
                    onClick={() => navigate("/admin/manage-products/create")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                    <p className="text-slate-400 text-sm font-medium">Total Products</p>
                    <p className="text-2xl font-bold text-white mt-2">{productsCount}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                    <p className="text-slate-400 text-sm font-medium">Active Products</p>
                    <p className="text-2xl font-bold text-green-400 mt-2">{activeProductsCount}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
                    <p className="text-slate-400 text-sm font-medium">Categories</p>
                    <p className="text-2xl font-bold text-blue-400 mt-2">{categoriesCount}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductsHeader;