import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShoppingBag } from "lucide-react";
import { getProductBySlug, products, formatPrice } from "@/lib/products";
import AddToBag from "./add-to-bag";
import ProductGallery from "./gallery";
import "./product.css";

type Props = { params: Promise<{slug:string}> };
export const dynamicParams = false;
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}: Props):Promise<Metadata>{
 const {slug}=await params;const p=getProductBySlug(slug);
 return p?{title:`${p.name} | VÉRTICE`,description:`${p.descriptor} · Projeto de e-commerce conceitual.`,openGraph:{title:`${p.name} — VÉRTICE`,images:[p.image]}}:{title:"Peça não encontrada"};
}
const stories:Record<number,string>={
1:"O primeiro passo para um guarda-roupa com intenção. Linhas limpas e uma presença discreta.",
2:"A tradição Oxford reinterpretada para um cotidiano sem excessos.",
3:"Textura e conforto para transitar entre estações com naturalidade.",
4:"Um denim essencial desenhado para acompanhar todos os seus movimentos.",
5:"O essencial em sua expressão mais leve. Atemporal, simples, versátil.",
6:"Uma camisa descontraída com espírito de viagem e novas possibilidades.",
7:"O clássico preto com uma linguagem ainda mais minimalista.",
8:"A camada certa entre conforto, forma e identidade."
};
export default async function ProductPage({params}:Props){
 const {slug}=await params;const product=getProductBySlug(slug);if(!product)notFound();
 const related=products.filter(p=>p.id!==product.id).slice(0,3);
 return <main className="detail-page">
  <div className="detail-strip"><span>VÉRTICE / EDIÇÃO 001</span><span>ESTUDO CONCEITUAL · SEM VENDAS REAIS</span></div>
  <header className="detail-nav"><Link className="detail-logo" href="/">VÉRTICE<span>.</span></Link><div><Link href="/#colecao"><ArrowLeft size={17}/> COLEÇÃO</Link><Link href="/?sacola=1"><ShoppingBag size={20}/> SACOLA</Link></div></header>
  <nav className="detail-crumb" aria-label="Caminho"><Link href="/">INÍCIO</Link> / <Link href="/#colecao">COLEÇÃO</Link> / <span>{product.name.toUpperCase()}</span></nav>
  <section className="detail-layout">
   <ProductGallery product={product}/>
   <div className="detail-copy"><span className="detail-eyebrow">VÉRTICE / {product.category.toUpperCase()} — 001</span><h1>{product.name}</h1><p className="detail-descriptor">{product.descriptor}</p><strong className="detail-price">{formatPrice(product.price)}</strong><div className="detail-rule"/><p className="detail-story">{stories[product.id]}</p>
    <AddToBag productId={product.id} sizes={product.sizes} price={product.price}/>
    <div className="detail-accordions"><details open><summary>DESCRIÇÃO & ACABAMENTO</summary><p>Peça conceitual de curadoria minimalista. As informações e fotografias ilustram a experiência de compra e não representam um item à venda.</p></details><details><summary>GUIA DE MEDIDAS</summary><p>Os tamanhos são demonstrativos. Numa loja real, uma tabela em centímetros ajudaria a escolher o caimento ideal.</p></details><details><summary>FRETE & DEVOLUÇÕES</summary><p>Este é um projeto de portfólio. Não existem transações, estoque, envio ou devoluções reais.</p></details></div>
   </div>
  </section>
  <section className="detail-related"><div className="detail-related-title"><div><span>CONTINUE EXPLORANDO</span><h2>Outros essenciais.</h2></div><Link href="/#colecao">VER COLEÇÃO <ArrowUpRight size={15}/></Link></div><div className="detail-related-grid">{related.map(p=><Link key={p.id} href={`/produto/${p.slug}`}><div><Image src={p.image} alt={`Referência ilustrativa de ${p.name}`} fill sizes="(max-width:650px) 45vw, 30vw"/></div><p><strong>{p.name}</strong><span>{formatPrice(p.price)}</span></p></Link>)}</div></section>
  <footer className="detail-footer"><span>© 2026 VÉRTICE / CONCEPT STORE</span><Link href="/">VOLTAR AO INÍCIO ↗</Link><span>PORTFÓLIO · NÃO É UMA LOJA REAL</span></footer>
 </main>;
}
