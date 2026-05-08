import { useCategories } from "@/contexts/CategoriesProvider"

const { categories } = useCategories();

export const getCategoryName = (id) => {
    const cat = categories && categories.find(c => c._id === id)
    return cat ? cat.name : "Unknown"
}
