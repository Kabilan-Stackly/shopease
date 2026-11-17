import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import "./Products.css";

function Products() {
    // Fetch products from API
    const { data, loading, error } = useFetch(
        "https://fakestoreapi.com/products"
    );

    const [searchParams, setSearchParams] = useSearchParams();

    // URL parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "default";
    const page = Number(searchParams.get("page")) || 1;

    const products = data || [];

    // Get categories
    const categories = [
        "all",
        ...new Set(products.map((product) => product.category)),
    ];

    // Search, filter and sort products
    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });

        // Sorting
        switch (sort) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "rating":
                result.sort(
                    (a, b) =>
                        (b.rating?.rate || 0) -
                        (a.rating?.rate || 0)
                );
                break;

            case "newest":
                result.sort((a, b) => b.id - a.id);
                break;

            default:
                break;
        }

        return result;
    }, [products, search, category, sort]);

    // Update URL parameters
    const updateParams = (key, value, defaultValue) => {
        const params = new URLSearchParams(searchParams);

        if (value === defaultValue || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Reset pagination when filters change
        params.delete("page");

        setSearchParams(params);
    };

    // Search handler
    const handleSearch = (value) => {
        updateParams("search", value, "");
    };

    // Category handler
    const handleCategory = (value) => {
        updateParams("category", value, "all");
    };

    // Sorting handler
    const handleSort = (value) => {
        updateParams("sort", value, "default");
    };

    // ---------------- PAGINATION ----------------

    const productsPerPage = 8;

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const currentPage = totalPages
        ? Math.min(Math.max(page, 1), totalPages)
        : 1;

    const startIndex = (currentPage - 1) * productsPerPage;

    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    // Change page
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);

        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", newPage);
        }

        setSearchParams(params);
    };

    // ---------------- UI ----------------

    return (
        <div className="products-page">

            {/* Header */}
            <div className="products-header">
                <span>OUR COLLECTION</span>

                <h1>Explore Our Products</h1>

                <p>
                    Discover products you'll love at amazing prices.
                </p>
            </div>

            {/* Search, Category and Sorting */}
            <div className="products-controls">

                {/* Search */}
                <div className="search-box">
                    <Search size={20} />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) =>
                        handleCategory(e.target.value)
                    }
                >
                    {categories.map((item) => (
                        <option value={item} key={item}>
                            {item === "all"
                                ? "All Categories"
                                : item.charAt(0).toUpperCase() +
                                  item.slice(1)}
                        </option>
                    ))}
                </select>

                {/* Sorting */}
                <select
                    value={sort}
                    onChange={(e) =>
                        handleSort(e.target.value)
                    }
                >
                    <option value="default">
                        Sort: Default
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                    <option value="rating">
                        Highest Rated
                    </option>

                    <option value="newest">
                        Newest First
                    </option>
                </select>

            </div>

            {/* Loading */}
            {loading && <Loader />}

            {/* Error */}
            {error && (
                <p className="products-error">{error}</p>
            )}

            {/* Products */}
            {!loading && !error && (
                <>

                    <div className="results-count">
                        Showing {paginatedProducts.length} of{" "}
                        {filteredProducts.length} products
                    </div>

                    {filteredProducts.length > 0 ? (
                        <>
                            {/* Product Grid */}
                            <div className="products-grid">

                                {paginatedProducts.map((product) => (
                                    <ProductCard
                                        product={product}
                                        key={product.id}
                                    />
                                ))}

                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">

                                    <button
                                        className="page-btn"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage - 1
                                            )
                                        }
                                    >
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`page-btn ${
                                                    currentPage ===
                                                    index + 1
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handlePageChange(
                                                        index + 1
                                                    )
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        )
                                    )}

                                    <button
                                        className="page-btn"
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage + 1
                                            )
                                        }
                                    >
                                        Next
                                    </button>

                                </div>
                            )}

                        </>
                    ) : (
                        <div className="no-products">
                            <h2>No Products Found</h2>
                            <p>
                                Try another search or category.
                            </p>
                        </div>
                    )}

                </>
            )}

        </div>
    );
}

export default Products;