import DefaultHeroSection from '@/components/Layout/DefaultHeroSection';
import { Loading } from '@/components/Layout/Loading';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCategories } from '@/contexts/CategoriesProvider';
import { useProduct } from '@/contexts/ProductContext';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';




const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '6', '7', '8', '9', '10', '11', '12', 'One Size'];
const TARGET_GROUPS = ['Men', 'Women', 'Unisex'];
const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $5,000', min: 0, max: 5000 },
    { label: '$5,000 - $10,000', min: 5000, max: 10000 },
    { label: '$10,000 - $20,000', min: 10000, max: 20000 },
    { label: 'Above $20,000', min: 20000, max: Infinity }
];
const RATINGS = [5, 4, 3, 2, 1];

export default function ShopPage() {
    const location = useLocation();
    const [filters, setFilters] = useState({
        categories: [],
        sizes: [],
        targetGroups: [],
        priceRange: { min: 0, max: Infinity },
        rating: null,
        inStock: false,
        onSale: false,
    });
    const { categories } = useCategories();
    const getCategoryName = (id) => {
        const cat = categories && categories.find(c => c._id === id)
        return cat ? cat.name : "Unknown"
    }

    // 
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get("search") || "";
        setSearchQuery(search);
    }, [location.search]);
    // 

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 9;
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);
    const { products } = useProduct();
    const [loading, setLoading] = useState(true);
    // 
    // 

    useEffect(() => {
        if (products) setLoading(false);
    }, [products]);


    // -------------------- Map backend products to frontend-friendly structure --------------------
    const mappedProducts = useMemo(() => {
        if (!products) return [];

        return products.map(p => ({
            id: p._id.toString(),
            name: p.name,
            price: p.basePrice,
            discountPrice: p.discountPrice,
            image: p.images?.find(img => img.isPrimary)?.url || p.images?.[0]?.url || "",
            rating: p.averageRating ? p.averageRating : 0, // placeholder rating
            reviewCount: p.reviewCount ? p.reviewCount : 0, // placeholder review count
            category: getCategoryName(p.categoryId.toString()), // assumes getCategoryName handles ObjectId string
            sizes: p.variants?.map(v => v.size.trim()) || [],
            colors: p.variants?.map(v => v.color.trim()) || [],
            inStock: p.variants?.some(v => v.stock > 0) || false,
            targetGroup: p.targetGroup,
            stitchType: p.stitchType,
            productType: p.productType,
            fitType: p.fitType,
            occasion: p.occasion,
            createdAt: p.createdAt,
        }));
    }, [products, categories]);



    // -------------------- Filtered & Sorted Products --------------------
    const filteredProducts = useMemo(() => {
        const filtered = mappedProducts && mappedProducts.filter(product => {
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
            const sizeMatch = filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size));
            const targetMatch = filters.targetGroups.length === 0 || filters.targetGroups.includes(product.targetGroup);
            const priceMatch = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
            const ratingMatch = filters.rating === null || product.rating >= filters.rating;
            const stockMatch = !filters.inStock || product.inStock;
            const saleMatch = !filters.onSale || !!product.discountPrice;
            const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

            return categoryMatch && sizeMatch && targetMatch && priceMatch && ratingMatch && stockMatch && saleMatch && searchMatch;
        });

        return filtered && filtered.sort((a, b) => {
            const priceA = a.discountPrice || a.price;
            const priceB = b.discountPrice || b.price;

            switch (sortBy) {
                case 'price-low': return priceA - priceB;
                case 'price-high': return priceB - priceA;
                case 'rating': return b.rating - a.rating;
                case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default: return 0;
            }
        });
    }, [mappedProducts, filters, searchQuery, sortBy]);

    // -------------------- Paginated Products --------------------
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        return filteredProducts && filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage]);

    // -------------------- Filter Handlers --------------------
    const handleCategoryToggle = (category) =>
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));

    const handleSizeToggle = (size) =>
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));

    const handleTargetToggle = (target) =>
        setFilters(prev => ({
            ...prev,
            targetGroups: prev.targetGroups.includes(target)
                ? prev.targetGroups.filter(t => t !== target)
                : [...prev.targetGroups, target]
        }));

    const handlePriceChange = (range) =>
        setFilters(prev => ({ ...prev, priceRange: range }));

    const handleRatingChange = (rating) =>
        setFilters(prev => ({ ...prev, rating }));

    const handleStockToggle = () =>
        setFilters(prev => ({ ...prev, inStock: !prev.inStock }));

    const handleSaleToggle = () =>
        setFilters(prev => ({ ...prev, onSale: !prev.onSale }));

    const clearAllFilters = () =>
        setFilters({
            categories: [],
            sizes: [],
            targetGroups: [],
            priceRange: { min: 0, max: Infinity },
            rating: null,
            inStock: false,
            onSale: false,
        });

    // -------------------- Check Active Filters --------------------
    const isFilterActive = filters.categories.length > 0 || filters.sizes.length > 0 ||
        filters.targetGroups.length > 0 || filters.rating !== null ||
        filters.inStock || filters.onSale ||
        (filters.priceRange.min !== 0 || filters.priceRange.max !== Infinity);

    if (loading || !products) {
        return <Loading text="Loading products..." size="lg" />;
    }


    return (
        <main className="min-h-screen bg-background">
            <DefaultHeroSection
                image="/banner_10.jpg"
                title="Discover Outfits Curated by AI"
                desc="Aurawear recommends clothing that fits your style and lifestyle. Browse smart collections and find your perfect look instantly."
                buttonText="Shop Now"
            />{/* Page Header */}
            <div className="border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-aos="fade-right" >
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" >
                        Shop
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Discover our exclusive collection of premium clothing
                    </p>
                </div>
            </div>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8" data-aos="fade-up" >
                    <div className='flex items-center gap-2 w-full md:w-auto'>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                        >
                            <SlidersHorizontal size={20} />
                            <span>Filters</span>
                        </button>

                        {/* Sort Dropdown */}
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-sm flex items-center gap-1">
                                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => setSortBy('relevance')}>Relevance</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('rating')}>Highest Rated</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 w-full md:max-w-[500px] items-center bg-gray-100 rounded-md px-3 py-1 flex mt-2 md:mt-0">
                        <Search className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm text-gray-700"
                        />
                    </div>

                    <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                        {filteredProducts && filteredProducts.length} products
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <aside
                        className={`${showFilters ? 'block' : 'hidden md:block'} md:col-span-1 space-y-6 min-h-screen  sticky top-20 z-10`}
                    >
                        <div className="bg-background p-6 rounded-lg border border-border space-y-6" data-aos="fade-up" >

                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-foreground">Filters</h2>
                                {isFilterActive && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-xs text-primary hover:text-primary/80 font-semibold"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <FilterSection title="Category">
                                <div className="flex flex-wrap gap-3">
                                    {categories && categories.map(category => (
                                        <label
                                            key={category._id}
                                            className={`
        flex items-center justify-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
        ${filters.categories.includes(category.name)
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-800 border-gray-300"}
        hover:bg-primary hover:text-white
      `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.categories.includes(category.name)}
                                                onChange={() => handleCategoryToggle(category.name)}
                                                className="w-4 h-4 accent-white hidden" // hide default checkbox for cleaner pill-style
                                            />
                                            <span className="text-sm font-medium">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Price Range Filter */}
                            <FilterSection title="Price Range">
                                <div className="flex flex-wrap gap-3">
                                    {PRICE_RANGES.map(range => (
                                        <label
                                            key={range.label}
                                            className={`
        flex items-center justify-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
        ${filters.priceRange.min === range.min && filters.priceRange.max === range.max
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-800 border-gray-300"}
        hover:bg-primary hover:text-white
      `}
                                        >
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={
                                                    filters.priceRange.min === range.min &&
                                                    filters.priceRange.max === range.max
                                                }
                                                onChange={() => handlePriceChange(range)}
                                                className="w-4 h-4 accent-white hidden" // hide default radio for cleaner look
                                            />
                                            <span className="text-sm font-medium">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Sizes Filter */}
                            <FilterSection title="Size">
                                <div className="flex flex-wrap gap-3">
                                    {SIZES.map(size => (
                                        <label
                                            key={size}
                                            className={`
        flex items-center justify-center gap-2 px-3 py-1 rounded-full border
        cursor-pointer transition-all duration-200
        ${filters.sizes.includes(size)
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-800 border-gray-300"}
        hover:bg-primary hover:text-white
      `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.sizes.includes(size)}
                                                onChange={() => handleSizeToggle(size)}
                                                className="w-4 h-4 accent-white hidden" // hide default checkbox for clean look
                                            />
                                            <span className="text-sm font-medium">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Target Group Filter */}
                            <FilterSection title="Target Group">
                                <div className="flex flex-wrap gap-3">
                                    {TARGET_GROUPS.map(target => (
                                        <label
                                            key={target}
                                            className={`
        flex items-center justify-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
        ${filters.targetGroups.includes(target)
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-800 border-gray-300"}
        hover:bg-primary hover:text-white
      `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.targetGroups.includes(target)}
                                                onChange={() => handleTargetToggle(target)}
                                                className="w-4 h-4 accent-white hidden" // hide default checkbox for clean pill-style
                                            />
                                            <span className="text-sm font-medium">{target}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Ratings Filter */}
                            <FilterSection title="Rating">
                                <div className="flex flex-wrap gap-3">
                                    {/* All Ratings Option */}
                                    <label
                                        className={`
      flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
      ${filters.rating === null
                                                ? "bg-primary text-white border-primary"
                                                : "bg-gray-100 text-gray-800 border-gray-300"}
      hover:bg-primary hover:text-white
    `}
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={filters.rating === null}
                                            onChange={() => handleRatingChange(null)}
                                            className="w-4 h-4 accent-white hidden"
                                        />
                                        <span className="text-sm font-medium">All Ratings</span>
                                    </label>

                                    {/* Individual Ratings */}
                                    {RATINGS.map(rating => (
                                        <label
                                            key={rating}
                                            className={`
        flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
        ${filters.rating === rating
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-800 border-gray-300"}
        hover:bg-primary hover:text-white
      `}
                                        >
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={filters.rating === rating}
                                                onChange={() => handleRatingChange(rating)}
                                                className="w-4 h-4 accent-white hidden"
                                            />
                                            <span className="text-sm font-medium flex items-center gap-1">
                                                {rating}
                                                <span className="text-yellow-500">★</span> & above (
                                                {mappedProducts.filter(p => p.rating >= rating).length})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Stock & Sale */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                {/* In Stock */}
                                <label
                                    className={`
      flex items-center justify-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
      ${filters.inStock
                                            ? "bg-primary text-white border-primary"
                                            : "bg-gray-100 text-gray-800 border-gray-300"}
      hover:bg-primary hover:text-white
    `}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.inStock}
                                        onChange={handleStockToggle}
                                        className="w-4 h-4 accent-white hidden"
                                    />
                                    <span className="text-sm font-medium">In Stock Only</span>
                                </label>

                                {/* On Sale */}
                                <label
                                    className={`
      flex items-center justify-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all duration-200
      ${filters.onSale
                                            ? "bg-primary text-white border-primary"
                                            : "bg-gray-100 text-gray-800 border-gray-300"}
      hover:bg-primary hover:text-white
    `}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.onSale}
                                        onChange={handleSaleToggle}
                                        className="w-4 h-4 accent-white hidden"
                                    />
                                    <span className="text-sm font-medium">On Sale</span>
                                </label>
                            </div>

                        </div>
                    </aside>
                    {/* Products Grid */}
                    <div className="md:col-span-3">
                        {paginatedProducts && paginatedProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-primary hover:text-primary/80 font-semibold"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedProducts && paginatedProducts.map((product, index) => (

                                    <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100}>

                                        <ProductCard
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            discountPrice={product.discountPrice}
                                            image={product.image}
                                            rating={product.rating}
                                            reviewCount={product.reviewCount}
                                            category={product.category}
                                            inStock={product.inStock}
                                            colors={product.colors}

                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* pagination */}
                        <div className="flex justify-center mt-8 gap-2" data-aos="fade-up" >
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-2 text-sm text-muted-foreground">
                                Page {currentPage} of {Math.ceil(filteredProducts?.length / PRODUCTS_PER_PAGE)}
                            </span>
                            <Button
                                variant="outline"
                                disabled={currentPage === Math.ceil(filteredProducts?.length / PRODUCTS_PER_PAGE)}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

// Filter Section Component
function FilterSection({ title, children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-border last:border-b-0 pb-4 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between mb-3"
            >
                <h3 className="font-semibold text-foreground">{title}</h3>
                <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform ${isOpen ? '' : '-rotate-90'}`}
                />
            </button>
            {isOpen && <div className="space-y-2">{children}</div>}
        </div>
    );
}
