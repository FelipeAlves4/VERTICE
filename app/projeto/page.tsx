import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
export const metadata:Metadata={title:"Estudo de caso — VÉRTICE",description:"Direção editorial, interface responsiva e e-commerce demonstrativo com Next.js."};
export default function Project(){
 return <main className="v4-case">
  <header className="v4-case-header"><Link href="/"><ArrowLeft size={17}/> VOLTAR À LOJA</Link><span>CASE STUDY / 2026</span></header>
  <section className="v4-case-hero"><div><small>VÉRTICE / PROJETO CONCEITUAL</small><h1>Design que<br/><em>se faz sentir.</em></h1><p>Uma vitrine de moda masculina fictícia construída para mostrar como identidade visual, narrativa editorial e experiência de compra podem funcionar juntas.</p><Link href="/#colecao">EXPLORAR A LOJA <ArrowUpRight size={18}/></Link></div><div className="v4-case-visual"><Image src="/editorial/sand.webp" alt="Campanha conceitual VÉRTICE" fill priority sizes="(max-width:820px) 100vw, 50vw"/></div></section>
  <section className="v4-case-message"><small>01 / O DESAFIO</small><h2>Uma marca que pareça real.<br/><em>Uma experiência que funcione.</em></h2><p>O projeto foi criado como demonstração de portfólio: impressionar visualmente em poucos segundos, sem abrir mão de navegação, descoberta de produtos e uma sacola utilizável.</p></section>
  <section className="v4-case-gallery"><div><Image src="/products/camisa-oxford.webp" alt="Camisa Oxford em cenário editorial" fill sizes="(max-width:820px) 100vw, 48vw"/></div><div><Image src="/products/camiseta-essential.webp" alt="Camiseta Essential em cenário editorial" fill sizes="(max-width:820px) 100vw, 48vw"/></div></section>
  <section className="v4-case-approach"><small>02 / A SOLUÇÃO</small><h2>Coerência em<br/><em>cada detalhe.</em></h2><div className="v4-case-points">
    <article><b>01 / SISTEMA VISUAL</b><h3>Editorial e minimalista</h3><p>Tipografia expressiva, tons naturais e fotografia de produto com direção de arte consistente.</p></article>
    <article><b>02 / EXPERIÊNCIA</b><h3>Exploração real</h3><p>Catálogo filtrável, busca, favoritos, galeria de detalhes, seletores de tamanho e sacola persistente.</p></article>
    <article><b>03 / CÓDIGO</b><h3>Next.js + TypeScript</h3><p>Componentes React, rotas do App Router, otimização responsiva de imagens e CSS customizado.</p></article>
    <article><b>04 / DEMONSTRAÇÃO</b><h3>Checkout transparente</h3><p>Conclusão simulada sem pedir cartão, sem pagamento e sem gerar transação verdadeira.</p></article>
  </div></section>
  <section className="v4-case-result"><small>03 / RESULTADO</small><h2>Uma loja para explorar.<br/><em>Um projeto para avaliar.</em></h2><p>Produtos e características são fictícios. As imagens são conceituais ou ilustrativas, e não há números inventados de vendas, usuários ou conversão.</p><div><Link href="/">VER A LOJA <ArrowUpRight size={18}/></Link><a href="https://github.com/FelipeAlves4/VERTICE" target="_blank" rel="noreferrer">VER CÓDIGO <ArrowUpRight size={18}/></a></div></section>
  <footer className="v4-case-footer"><span>VÉRTICE / ESTUDO DE CASO</span><span>PORTFÓLIO 2026</span></footer>
 </main>;
}
