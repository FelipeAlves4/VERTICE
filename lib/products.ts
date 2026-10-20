export type Category = "Todos" | "Camisetas" | "Camisas" | "Casacos" | "Calças";
export type Product = {
  id: number;
  slug: string;
  name: string;
  descriptor: string;
  category: Exclude<Category, "Todos">;
  price: number;
  image: string;
  alternativeImage?: string;
  tag?: string;
  sizes: string[];
  tone: string;
};

export const products: Product[] = [
  { id: 1, slug: "camiseta-essential", name: "Camiseta Essential", descriptor: "Malha premium · Preto", category: "Camisetas", price: 149, image: "/products/camiseta-essential.webp", tag: "BEST SELLER", sizes: ["P", "M", "G", "GG"], tone: "#e9e7e3" },
  { id: 2, slug: "camisa-oxford", name: "Camisa Oxford", descriptor: "Algodão encorpado · Off white", category: "Camisas", price: 289, image: "/products/camisa-oxford.webp", tag: "NOVO", sizes: ["P", "M", "G", "GG"], tone: "#eee9e2" },
  { id: 3, slug: "tricot-everyday", name: "Tricot Everyday", descriptor: "Textura macia · Areia", category: "Casacos", price: 329, image: "/products/tricot-everyday.webp", sizes: ["P", "M", "G", "GG"], tone: "#e7dfd5" },
  { id: 4, slug: "denim-straight", name: "Denim Straight", descriptor: "Denim clássico · Índigo", category: "Calças", price: 319, image: "/products/denim-straight.webp", tag: "ESSENCIAL", sizes: ["38", "40", "42", "44"], tone: "#e9e9e7" },
  { id: 5, slug: "camiseta-atelier", name: "Camiseta Atelier", descriptor: "Algodão 100% · Branco", category: "Camisetas", price: 159, image: "/products/camiseta-atelier.webp", sizes: ["P", "M", "G", "GG"], tone: "#e8e8e5" },
  { id: 6, slug: "camisa-resort", name: "Camisa Resort", descriptor: "Corte contemporâneo · Azul", category: "Camisas", price: 279, image: "/products/camisa-resort.webp", sizes: ["P", "M", "G", "GG"], tone: "#e8ebeb" },
  { id: 7, slug: "camiseta-noir", name: "Camiseta Noir", descriptor: "Caimento regular · Preto", category: "Camisetas", price: 139, image: "/products/camiseta-noir.webp", sizes: ["P", "M", "G", "GG"], tone: "#e7e7e5" },
  { id: 8, slug: "hoodie-studio", name: "Hoodie Studio", descriptor: "Moletom encorpado · Natural", category: "Casacos", price: 349, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77", sizes: ["P", "M", "G", "GG"], tone: "#eae7e1" },
];

export const categories: Category[] = ["Todos", "Camisetas", "Camisas", "Casacos", "Calças"];
export const formatPrice = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
export const CART_KEY = "vertice-cart-v1";
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
