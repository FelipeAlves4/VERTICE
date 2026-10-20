import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
const BASE = "https://vertice-eight-omega.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: BASE, changeFrequency: "monthly", priority: 1 }, ...products.map((product) => ({
    url: BASE + "/produto/" + product.slug, changeFrequency: "monthly" as const, priority: 0.7
  }))];
}
