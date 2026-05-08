import DefaultHeroSection from '@/components/Layout/DefaultHeroSection';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/contexts/CategoriesProvider';
import { useWishlist } from '@/contexts/WishlistContext';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy product data
const DUMMY_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Navy Silk Kurta',
        price: 12999,
        discountPrice: 9999,
        image: '/images/product-1.jpg',
        rating: 4.5,
        reviewCount: 128,
        category: 'Kurtas',
        size: ['S', 'M', 'L', 'XL'],
        colors: ['#001f3f', '#0074D9', '#7FDBCA'],
        inStock: true,
        targetGroup: 'Men'
    }
];

const CATEGORIES = ['Kurtas', 'Shirts', 'T-Shirts', 'Pants', 'Blazers', 'Jackets', 'Outerwear', 'Footwear', 'Occasion Wear', 'Accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '6', '7', '8', '9', '10', '11', '12', 'One Size'];
const TARGET_GROUPS = ['Men', 'Women', 'Unisex'];
const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: 'Above ₹20,000', min: 20000, max: Infinity }
];
const RATINGS = [5, 4, 3, 2, 1];

export default function Whishlist() {
    const { wishlist } = useWishlist();
    const { isLoggedIn } = useAuth();
    const { categories } = useCategories(); // Needed for mapping category names

    // Helper to get category name from ID
    const getCategoryName = (id) => {
        const cat = categories?.find(c => c._id === id);
        return cat ? cat.name : "Unknown";
    };

    // -------------------- Filters state --------------------
    const [filters, setFilters] = useState({
        categories: [],
        sizes: [],
        targetGroups: [],
        priceRange: { min: 0, max: Infinity },
        rating: null,
        inStock: false,
        onSale: false
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 9;
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);

    // -------------------- Map wishlist products --------------------
    const wishlistProducts = useMemo(() => {
        if (!wishlist?.items) return [];

        return wishlist.items
            .map(item => {
                const product = item.productId;
                if (!product) return null;

                return {
                    id: product._id.toString(),
                    name: product.name,
                    price: product.basePrice,
                    discountPrice: product.discountPrice,
                    image: product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url || '',
                    rating: product.averageRating ?? 0,
                    reviewCount: product.reviewCount ?? 0,
                    category: getCategoryName(product.categoryId),
                    inStock: product.variants?.some(v => v.stock > 0) ?? false,
                    colors: product.variants?.map(v => v.color.trim()) ?? [],
                    sizes: product.variants?.map(v => v.size.trim()) ?? [],
                    targetGroup: product.targetGroup,
                    createdAt: product.createdAt,
                };
            })
            .filter(Boolean);
    }, [wishlist, categories]);

    // -------------------- Filter & sort wishlist products --------------------
    const filteredProducts = useMemo(() => {
        let filtered = wishlistProducts.filter(product => {
            if (!product) return false;

            const categoryMatch = !filters.categories.length || filters.categories.includes(product.category || '');
            const sizeMatch = !filters.sizes.length || (product.sizes?.some(size => filters.sizes.includes(size)) ?? false);
            const targetMatch = !filters.targetGroups.length || filters.targetGroups.includes(product.targetGroup || '');
            const price = product.discountPrice ?? product.price ?? 0;
            const priceMatch = price >= filters.priceRange.min && price <= filters.priceRange.max;
            const ratingMatch = filters.rating === null || (product.rating ?? 0) >= filters.rating;
            const stockMatch = !filters.inStock || (product.inStock ?? false);
            const saleMatch = !filters.onSale || !!product.discountPrice;
            const searchMatch = product.name?.toLowerCase().includes(searchQuery.toLowerCase() ?? '');

            return categoryMatch && sizeMatch && targetMatch && priceMatch && ratingMatch && stockMatch && saleMatch && searchMatch;
        });

        // -------------------- Sorting --------------------
        filtered.sort((a, b) => {
            const priceA = a.discountPrice ?? a.price ?? 0;
            const priceB = b.discountPrice ?? b.price ?? 0;

            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'rating':
                    return (b.rating ?? 0) - (a.rating ?? 0);
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [wishlistProducts, filters, sortBy, searchQuery]);

    // -------------------- Paginate --------------------
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage]);

    // -------------------- Filter handlers --------------------
    const handleCategoryToggle = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleSizeToggle = (size) => {
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleTargetToggle = (target) => {
        setFilters(prev => ({
            ...prev,
            targetGroups: prev.targetGroups.includes(target)
                ? prev.targetGroups.filter(t => t !== target)
                : [...prev.targetGroups, target]
        }));
    };

    const handlePriceChange = (range) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
    };

    const handleRatingChange = (rating) => {
        setFilters(prev => ({ ...prev, rating }));
    };

    const handleStockToggle = () => {
        setFilters(prev => ({ ...prev, inStock: !prev.inStock }));
    };

    const handleSaleToggle = () => {
        setFilters(prev => ({ ...prev, onSale: !prev.onSale }));
    };

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            sizes: [],
            targetGroups: [],
            priceRange: { min: 0, max: Infinity },
            rating: null,
            inStock: false,
            onSale: false
        });
    };

    // -------------------- Check if any filter is active --------------------
    const isFilterActive = filters.categories.length > 0 || filters.sizes.length > 0 ||
        filters.targetGroups.length > 0 || filters.rating !== null ||
        filters.inStock || filters.onSale ||
        filters.priceRange.min !== 0 || filters.priceRange.max !== Infinity;
    // wishlist page
    if (!isLoggedIn) {
        return (
            <main className="min-h-[88vh] flex items-center justify-center px-4">
                <div className="text-center space-y-4 max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Please log in to view your wishlist
                    </h1>
                    <p className="text-muted-foreground">
                        You need to be logged in to save items and access your wishlist.
                    </p>
                    <Link to="/login">
                        <Button className="mt-4">
                            Login to your account
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-background">
            {/* Page Header */}
            <DefaultHeroSection
                image="/banner_04.jpg"
                title="Your Wishlist"
                desc="Keep track of your favorite styles and revisit the pieces you love anytime."
                buttonText="Shop Now"
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className='flex items-center gap-2 w-full md:w-auto'>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                        >
                            <SlidersHorizontal size={20} />
                            <span>Filters</span>
                        </button>

                        {/* Sort Dropdown */}
                        <DropdownMenu>
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
                        {filteredProducts.length} products
                    </div>
                </div>

                <div className="">


                    {/* Products Grid */}
                    <div className="md:col-span-3">
                        {paginatedProducts.length === 0 ? (
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
                                {paginatedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
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
                                ))}
                            </div>
                        )}
                        {/* pagination */}
                        <div className="flex justify-center mt-8 gap-2">
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-2 text-sm text-muted-foreground">
                                Page {currentPage} of {Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
                            </span>
                            <Button
                                variant="outline"
                                disabled={currentPage === Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
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
