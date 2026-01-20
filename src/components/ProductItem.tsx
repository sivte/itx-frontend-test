import { Link } from "react-router";
import type { ProductItem } from "@/schemas";

export function ProductItem(product: ProductItem) {
  const { id, brand, model, price, imgUrl } = product;
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative aspect-4/3 mb-4 overflow-hidden bg-neutral-50 rounded-lg">
        <img
          src={imgUrl}
          alt={`${brand} ${model}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="space-y-1">
        <p className="text-[10px] sm:text-xs text-neutral-500 font-light uppercase tracking-[0.15em]">
          {brand}
        </p>
        <h3 className="text-sm sm:text-base text-neutral-800 font-light group-hover:text-neutral-600 transition-colors">
          {model}
        </h3>
        <p className="text-sm sm:text-base text-neutral-800 font-light pt-1">
          {price ? `${price} €` : "Precio no disponible"}
        </p>
      </div>
    </Link>
  );
}
