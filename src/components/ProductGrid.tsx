import { ProductItem } from "./ProductItem";
import type { ProductItemList } from "@/schemas";

interface ProductGridProps {
  products: ProductItemList[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <>
      {products.length === 0 ? (
        <p className="text-center py-24 text-neutral-400 text-sm">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      )}
    </>
  );
}
