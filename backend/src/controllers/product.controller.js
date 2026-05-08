import Product from "../models/Product.model.js";
import { ApiError } from "../utils/apiError.js";
import CategoryModel from "../models/Category.model.js";

// -------------------- CREATE PRODUCT (ADMIN) -------------------- //
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- UPDATE PRODUCT (ADMIN) -------------------- //
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) throw new ApiError("Product not found", 404);

        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- DELETE PRODUCT (ADMIN) -------------------- //
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw new ApiError("Product not found", 404);

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET SINGLE PRODUCT -------------------- //
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: "categoryId",
                select: "name parentId createdAt updatedAt",
            })
            .exec();

        if (!product) throw new ApiError("Product not found", 404);

        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};

// -------------------- GET ALL PRODUCTS -------------------- //
export const getAllProducts = async (req, res) => {
    try {
        const {
            targetGroup,
            bodyType,
            skinTone,
            stitchType,
            fitType,
            occasion,
            search,
            page = "1",
            limit = "12",
        } = req.query;

        const pageNum = Math.max(Number(page), 1);
        const limitNum = Math.min(Number(limit), 50); // hard cap
        const skip = (pageNum - 1) * limitNum;

        const filter = { isActive: true };

        if (targetGroup) filter.targetGroup = targetGroup;
        if (stitchType) filter.stitchType = stitchType;
        if (fitType) filter.fitType = fitType;
        if (occasion) filter.occasion = occasion;

        // AI attributes
        if (bodyType) {
            filter["aiAttributes.suitableBodyTypes"] = bodyType;
        }
        if (skinTone) {
            filter["aiAttributes.suitableSkinTones"] = skinTone;
        }

        // 🔍 Text search
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { occasion: { $regex: search, $options: "i" } },
                { fitType: { $regex: search, $options: "i" } },
            ];
        }

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            products,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ success: false, message: err.message });
    }
};

// -------------------- GET PRODUCTS BASED ON AI BODY INFO -------------------- //
export const getProductsByAIInfo = async (req, res) => {
    try {
        const { gender, bodyType, skinTone, heightCm } = req.body;
        console.log("AI input:", gender, bodyType, skinTone, heightCm);

        if (!gender && !bodyType && !skinTone && !heightCm) {
            throw new ApiError("At least one AI attribute is required", 400);
        }

        // -------------------- Map gender to targetGroup -------------------- //
        const genderMap = {
            MAN: "MEN",
            WOMAN: "WOMEN",
            KID: "KIDS",
            UNISEX: "UNISEX",
            OTHER: "OTHER",
        };
        const targetGroup = genderMap[gender?.toUpperCase()];

        // -------------------- Map AI bodyType to DB values -------------------- //
        const bodyTypeMap = {
            REGULAR: ["AVERAGE"],
            SLIM: ["SLIM"],
            ATHLETIC: ["ATHLETIC"],
            CURVY: ["CURVY"],
        };

        // -------------------- Map AI skinTone to DB values -------------------- //
        const skinToneMap = {
            WHITE: ["FAIR", "LIGHT"],
            LIGHT: ["FAIR", "LIGHT"],
            MEDIUM: ["MEDIUM", "OLIVE"],
            OLIVE: ["OLIVE", "MEDIUM"],
            BROWN: ["BROWN", "DARK"],
            DARK: ["DARK", "BROWN"],
            BLACK: ["DARK", "BROWN"],
        };

        // -------------------- Lookup category by gender -------------------- //
        let categoryId;
        if (targetGroup) {
            const category = await CategoryModel.findOne({ name: new RegExp(`^${targetGroup}$`, 'i') }).exec();
            if (category) categoryId = category._id.toString();
        }

        if (!categoryId) {
            return res.status(404).json({ success: false, message: `No category found for targetGroup ${targetGroup}` });
        }

        // -------------------- Build OR conditions for AI attributes -------------------- //
        const orConditions = [];

        if (bodyType) {
            const mappedBodyTypes = bodyTypeMap[bodyType.toUpperCase()] || [bodyType.toUpperCase()];
            orConditions.push({ "aiAttributes.suitableBodyTypes": { $in: mappedBodyTypes } });
        }

        if (skinTone) {
            const mappedSkinTones = skinToneMap[skinTone.toUpperCase()] || [skinTone.toUpperCase()];
            orConditions.push({ "aiAttributes.suitableSkinTones": { $in: mappedSkinTones } });
        }

        if (heightCm) {
            orConditions.push({
                $or: [
                    {
                        $and: [
                            { "aiAttributes.recommendedHeightRange.min": { $lte: Number(heightCm) } },
                            { "aiAttributes.recommendedHeightRange.max": { $gte: Number(heightCm) } },
                        ],
                    },
                    { "aiAttributes.recommendedHeightRange.min": 0, "aiAttributes.recommendedHeightRange.max": 0 },
                ],
            });
        }

        // -------------------- Final filter -------------------- //
        const filter = {
            isActive: true,
            categoryId, // strict category match
        };

        if (orConditions.length > 0) {
            filter.$or = orConditions; // optional matching for bodyType, skinTone, height
        }

        console.log("Mongo filter:", JSON.stringify(filter, null, 2));

        // -------------------- Fetch products -------------------- //
        const products = await Product.find(filter)
            .populate({
                path: "categoryId",
                select: "name parentId createdAt updatedAt",
            })
            .exec();

        res.status(200).json({ success: true, products });
    } catch (err) {
        console.error("‼ Error in getProductsByAIInfo:", err);
        res.status(err.status || 500).json({ success: false, message: err.message });
    }
};
