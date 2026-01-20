import { z } from "zod";

export const productItemSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  price: z.string(),
  imgUrl: z.string().url(),
});

export const productListSchema = z.array(productItemSchema);

const optionSchema = z.object({
  code: z.number(),
  name: z.string(),
});

const productOptionsSchema = z.object({
  colors: z.array(optionSchema),
  storages: z.array(optionSchema),
});

export const productDetailSchema = productItemSchema.extend({
  networkTechnology: z.string(),
  networkSpeed: z.string(),
  gprs: z.string(),
  edge: z.string(),
  announced: z.string(),
  status: z.string(),
  dimentions: z.string(),
  weight: z.string(),
  sim: z.union([z.string(), z.array(z.string())]),
  displayType: z.string(),
  displayResolution: z.string(),
  displaySize: z.string(),
  os: z.union([z.string(), z.array(z.string())]),
  cpu: z.union([z.string(), z.array(z.string())]),
  chipset: z.string(),
  gpu: z.string(),
  externalMemory: z.string(),
  internalMemory: z.union([z.string(), z.array(z.string())]),
  ram: z.string(),
  primaryCamera: z.union([z.string(), z.array(z.string())]),
  secondaryCmera: z.union([z.string(), z.array(z.string())]),
  speaker: z.string(),
  audioJack: z.string(),
  wlan: z.union([z.string(), z.array(z.string())]),
  bluetooth: z.union([z.string(), z.array(z.string())]),
  gps: z.string(),
  nfc: z.string(),
  radio: z.union([z.string(), z.array(z.string())]),
  usb: z.union([z.string(), z.array(z.string())]),
  sensors: z.union([z.string(), z.array(z.string())]),
  battery: z.string(),
  colors: z.array(z.string()),
  options: productOptionsSchema,
});

export const addToCartRequestSchema = z.object({
  id: z.string(),
  colorCode: z.number(),
  storageCode: z.number(),
});

export const addToCartResponseSchema = z.object({
  count: z.number(),
});

export type ProductItem = z.infer<typeof productItemSchema>;
export type ProductItemList = z.infer<typeof productListSchema>[number];
export type ProductDetail = z.infer<typeof productDetailSchema>;
export type ProductOption = z.infer<typeof optionSchema>;
export type ProductOptions = z.infer<typeof productOptionsSchema>;
export type AddToCartRequest = z.infer<typeof addToCartRequestSchema>;
export type AddToCartResponse = z.infer<typeof addToCartResponseSchema>;
