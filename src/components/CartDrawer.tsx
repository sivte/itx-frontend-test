import { useEffect, useState } from "react";
import { getProductById } from "@/services/api";
import type { CartItem } from "@/context/CartContext";
import type { ProductDetail } from "@/schemas/index";
import CloseIcon from "./icons/CloseIcon";
import { Separator } from "./Separator";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem?: (
    productId: string,
    colorCode: number,
    storageCode: number,
  ) => void;
}

interface CartItemWithDetails extends CartItem {
  product?: ProductDetail;
  colorName?: string;
  storageName?: string;
  quantity: number;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <p>
    {label}: <span className="text-neutral-800">{value}</span>
  </p>
);

const CartItemCard = ({
  item,
  onRemove,
}: {
  item: CartItemWithDetails;
  onRemove?: () => void;
}) => {
  if (!item.product) return null;

  const { product, colorName, storageName, quantity } = item;

  return (
    <div className="pb-6">
      <div className="flex gap-4">
        <img
          src={product.imgUrl}
          alt={product.model}
          className="w-24 h-24 object-contain"
        />

        <div className="flex-1">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <p className="text-sm text-neutral-800 mb-3">{product.model}</p>

          <div className="text-xs text-neutral-600 space-y-1 mb-3">
            {colorName && <DetailRow label="Color" value={colorName} />}
            {storageName && <DetailRow label="Storage" value={storageName} />}
            <DetailRow label="Quantity" value={String(quantity)} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-800">{product.price} €</p>
            {onRemove && (
              <button
                onClick={onRemove}
                className="text-xs text-neutral-400 hover:text-red-500 uppercase"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
}: CartDrawerProps) {
  const [itemsWithDetails, setItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const groupedItems = items.reduce(
        (acc, item) => {
          const key = `${item.id}-${item.colorCode}-${item.storageCode}`;
          if (acc[key]) {
            acc[key].quantity += 1;
          } else {
            acc[key] = { ...item, quantity: 1 };
          }
          return acc;
        },
        {} as Record<string, CartItemWithDetails>,
      );

      const details = await Promise.all(
        Object.values(groupedItems).map(async (item) => {
          try {
            const product = await getProductById(item.id);
            const colorName =
              product.options.colors.find((c) => c.code === item.colorCode)
                ?.name || "";
            const storageName =
              product.options.storages.find((s) => s.code === item.storageCode)
                ?.name || "";
            return { ...item, product, colorName, storageName };
          } catch (error) {
            console.error("Error loading product:", error);
            return item;
          }
        }),
      );
      setItemsWithDetails(details);
    };

    if (isOpen && items.length > 0) {
      fetchDetails();
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  const total = itemsWithDetails.reduce((sum, item) => {
    const price = item.product?.price ? parseFloat(item.product.price) : 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg uppercase tracking-wider text-neutral-800">
              Cart
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-800"
            >
              <CloseIcon />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-center py-12 text-neutral-400 text-sm">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {itemsWithDetails.map((item, index) => (
                  <CartItemCard
                    key={index}
                    item={item}
                    onRemove={
                      onRemoveItem
                        ? () =>
                            onRemoveItem(
                              item.id,
                              item.colorCode,
                              item.storageCode,
                            )
                        : undefined
                    }
                  />
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <p className="flex justify-between text-sm">
                  <span className="text-neutral-600">Total items:</span>
                  <span className="text-neutral-800">{items.length}</span>
                </p>
                <p className="flex justify-between text-base">
                  <span className="text-neutral-800">Total:</span>
                  <span className="font-medium">{total.toFixed(2)} €</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
