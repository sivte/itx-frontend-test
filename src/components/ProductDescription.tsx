import type { ProductDetail } from "@/schemas";
import { Separator } from "./Separator";

interface ProductDescriptionProps {
  product: ProductDetail;
}

/**
 * Helper to normalize fields that can be string or array
 */
const normalizeToString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(", ") : value;
};

/**
 * Dictionary mapping product properties to display labels
 */
const FEATURE_LABELS: Record<string, string> = {
  // Display
  displaySize: "Screen size",
  displayType: "Screen type",
  displayResolution: "Resolution",

  // Performance
  cpu: "Processor",
  chipset: "Chipset",
  gpu: "GPU",
  ram: "RAM",
  os: "Operating system",
  // Storage
  internalMemory: "Storage",
  externalMemory: "External memory",

  // Camera
  primaryCamera: "CCamera",
  secondaryCmera: "Front camera",
  // Battery
  battery: "Battery",

  // Connectivity
  sim: "SIM",
  wlan: "WLAN",
  bluetooth: "Bluetooth",
  gps: "GPS",
  nfc: "NFC",
  radio: "Radio",
  usb: "USB",
  networkTechnology: "Network technology",
  networkSpeed: "Network speed",
  gprs: "GPRS",
  edge: "EDGE",

  // Physical
  dimentions: "Dimensions",
  weight: "Weight",

  // Audio
  speaker: "Speaker",
  audioJack: "Audio jack",

  // Sensors
  sensors: "Sensors",

  // Other
  announced: "Announced",
  status: "Status",
};

/**
 * Properties to exclude from features list
 */
const EXCLUDED_PROPERTIES = new Set([
  "id",
  "brand",
  "model",
  "price",
  "imgUrl",
  "colors",
  "options",
]);

export function ProductDescription({ product }: ProductDescriptionProps) {
  const { brand, model, price } = product;

  const features = Object.entries(product).filter(
    ([key, value]) => !EXCLUDED_PROPERTIES.has(key) && value,
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs text-neutral-500 font-light uppercase tracking-[0.15em] mb-3">
          {brand}
        </p>
        <h1 className="text-3xl sm:text-4xl text-neutral-800 font-light mb-3 tracking-wide">
          {model}
        </h1>
        <p className="text-2xl text-neutral-800 font-light">
          {price ? `${price} €` : "Precio no disponible"}
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-xs text-neutral-600 mb-6 font-light uppercase tracking-[0.15em]">
          Features
        </h3>
        <dl className="space-y-4">
          {features.map(([key, value]) => {
            const label = FEATURE_LABELS[key] || key;
            const displayValue =
              typeof value === "string" || Array.isArray(value)
                ? normalizeToString(value)
                : String(value);

            return (
              <div key={key} className="flex items-start gap-4">
                <dt className="text-xs text-neutral-500 font-light w-32 shrink-0">
                  {label}
                </dt>
                <dd className="text-sm text-neutral-700 font-light">
                  {displayValue}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
