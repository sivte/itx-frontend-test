interface ProductImageProps {
  imgUrl: string;
  brand: string;
}

export function ProductImage({ imgUrl, brand }: ProductImageProps) {
  return (
    <div className="aspect-square max-w-md mx-auto bg-neutral-50 rounded-lg overflow-hidden">
      <img src={imgUrl} alt={brand} className="w-full h-full object-contain" />
    </div>
  );
}
