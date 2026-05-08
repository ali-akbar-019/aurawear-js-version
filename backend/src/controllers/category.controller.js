import CategoryModel from "../models/Category.model.js";

// Add a new category
export const addCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;

        const newCategory = new CategoryModel({
            name,
            parentId: parentId || null
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating category", error });
    }
};

// Get all categories
export const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find().populate("parentId", "name");
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching categories", error });
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting category", error });
    }
};
