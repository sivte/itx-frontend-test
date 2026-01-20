import { useState } from "react";
import type { ProductDetail, ProductOption } from "@/schemas";

interface ProductActionsProps {
  product: ProductDetail;
  onAddToCart: (colorCode: number, storageCode: number) => void;
  isLoading?: boolean;
}

export function ProductActions({
  product,
  onAddToCart,
  isLoading = false,
}: ProductActionsProps) {
  const colors = product.options?.colors || [];
  const storages = product.options?.storages || [];

  const [selectedColor, setSelectedColor] = useState(colors[0]?.code || 0);
  const [selectedStorage, setSelectedStorage] = useState(
    storages[0]?.code || 0,
  );

  const handleAddToCart = () => {
    onAddToCart(selectedColor, selectedStorage);
  };

  return (
    <div className="space-y-8">
      {colors.length > 0 && (
        <div>
          <p className="text-xs text-neutral-600 mb-4 font-light uppercase tracking-wider">
            Color:{" "}
            {colors
              .find((c: ProductOption) => c.code === selectedColor)
              ?.name?.trim() || "Select a color"}
          </p>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color: ProductOption) => (
              <button
                key={color.code}
                onClick={() => setSelectedColor(color.code)}
                className={`px-4 py-2 text-xs font-light rounded-lg border transition-all ${
                  selectedColor === color.code
                    ? "border-rose-300 bg-rose-50 text-neutral-800"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                }`}
                aria-label={color.name}
              >
                {color.name?.trim() || "Not available"}
              </button>
            ))}
          </div>
        </div>
      )}

      {storages.length > 0 && (
        <div>
          <p className="text-xs text-neutral-600 mb-4 font-light uppercase tracking-wider">
            Storage
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {storages.map((option: ProductOption) => (
              <button
                key={option.code}
                onClick={() => setSelectedStorage(option.code)}
                className={`py-3 text-xs font-light rounded-lg border transition-all ${
                  selectedStorage === option.code
                    ? "border-rose-300 bg-rose-50 text-neutral-800"
                    : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                }`}
              >
                {option.name?.trim() || "Not available"}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full max-w-xs py-4 bg-neutral-900 text-white text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Adding..." : "Add to cart"}
      </button>
    </div>
  );
}
