import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ProductImage } from "@/components/ProductImage";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductActions } from "@/components/ProductActions";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Separator } from "@/components/Separator";
import { Loading } from "@/components/Loading";
import { getProductById } from "@/services/api";
import { useCart } from "@/context/CartContext";
import type { ProductDetail } from "@/schemas";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (colorCode: number, storageCode: number) => {
    if (!product) return;

    try {
      setAddingToCart(true);
      await addToCart(product.id, colorCode, storageCode);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      {loading && <Loading message="Loading product..." />}

      {!loading && (error || !product) && (
        <div className="w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center py-24">
            <p className="text-red-500 font-light text-sm">
              {error || "Product not found"}
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-neutral-600 hover:text-neutral-800 text-sm"
            >
              Back to home
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && product && (
        <div className="w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumb
            items={[
              {
                label: "PRODUCTS",
                onClick: () => navigate(-1),
              },
              {
                label: `${product.brand} ${product.model}`,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ProductImage imgUrl={product.imgUrl} brand={product.brand} />

            <div className="space-y-8">
              <ProductDescription product={product} />

              <Separator />
              <ProductActions
                product={product}
                onAddToCart={handleAddToCart}
                isLoading={addingToCart}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
