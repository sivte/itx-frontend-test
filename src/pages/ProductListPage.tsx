import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductGrid } from "../components/ProductGrid";
import { Loading } from "@/components/Loading";
import { getProducts } from "@/services/api";
import type { ProductItemList } from "@/schemas";

function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductItemList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex justify-end mb-12">
        <div className="w-full sm:w-80">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {loading && <Loading message="Loading products..." />}

      {error && (
        <div className="text-center py-24">
          <p className="text-red-500 font-light text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && <ProductGrid products={filteredProducts} />}
    </div>
  );
}

export default ProductListPage;
