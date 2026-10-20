"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Truck } from "lucide-react";
import { CART_KEY, formatPrice, products, type Product } from "@/lib/products";
type Item = {productId:number;size:string;quantity:number};
type Line = {product:Product;size:string;quantity:number};
function getCart():Item[]{
 try {const raw:unknown=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
  if(!Array.isArray(raw))return [];
  return raw.filter((i):i is Item=>typeof i?.productId==="number"&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=100&&products.some(p=>p.id===i.productId&&p.sizes.includes(i.size)));
 } catch{return [];}
}
export default function Checkout(){
 const [ready,setReady]=useState(false);
 const [items,setItems]=useState<Item[]>([]);
 const [delivery,setDelivery]=useState<"normal"|"expresso">("normal");
 const [completed,setCompleted]=useState(false);
 const [error,setError]=useState("");
 useEffect(()=>{setItems(getCart());setReady(true);},[]);
 const lines:Line[]=items.flatMap(i=>{const p=products.find(p=>p.id===i.productId);return p?[{product:p,size:i.size,quantity:i.quantity}]:[];});
 const count=lines.reduce((n,i)=>n+i.quantity,0);
 const subtotal=lines.reduce((n,i)=>n+i.product.price*i.quantity,0);
 const freight=delivery==="expresso"?18:0;
 function finish(){
  if(!lines.length)return;
  try {localStorage.removeItem(CART_KEY);setItems([]);setCompleted(true);setError("");}
  catch {setError("Não foi possível atualizar a sacola. Verifique as permissões do navegador.");}
 }
 return <main className="v4-checkout">
  <div className="v4-bar">VÉRTICE / CHECKOUT CONCEITUAL · NENHUM VALOR SERÁ COBRADO</div>
  <header className="v4-checkout-header"><Link href="/" className="v4-logo">VÉRTICE<span>.</span></Link><Link href="/?sacola=1"><ArrowLeft size={17}/> VOLTAR À SACOLA</Link></header>
  {completed ? <section className="v4-success" role="status">
   <div className="v4-success-icon"><Check size={30}/></div><span>SIMULAÇÃO CONCLUÍDA</span>
   <h1>Boa escolha<span>.</span></h1>
   <p>Sua jornada de compra foi simulada com sucesso. A sacola do navegador foi esvaziada. Não houve pagamento, criação de pedido, envio de endereço ou armazenamento de dados pessoais em servidor.</p>
   <Link href="/" className="v4-cta">EXPLORAR A LOJA <ArrowRight size={18}/></Link>
  </section> : <div className="v4-checkout-layout">
   <section className="v4-form"><div className="v4-eyebrow">01 / REVISE SUA ESCOLHA</div>
    <h1>O próximo passo<br/><em>é seu.</em></h1>
    <p className="v4-intro">Uma demonstração de checkout que funciona sem capturar informações pessoais ou fazer cobranças.</p>
    {!ready ? <p>Carregando sua sacola...</p> : !lines.length ?
     <div className="v4-no-items"><ShoppingBag size={35}/><h2>Sua sacola está vazia.</h2><p>Escolha uma peça e volte para experimentar a jornada.</p><Link href="/#colecao" className="v4-cta">EXPLORAR COLEÇÃO <ArrowRight size={18}/></Link></div>
    : <><div className="v4-rule"/>
      <div className="v4-delivery-caption"><span>02 / ENTREGA DEMONSTRATIVA</span><small>PRAZOS FICTÍCIOS</small></div>
      <fieldset className="v4-delivery"><legend>ESCOLHA UMA SIMULAÇÃO DE ENTREGA</legend>
       <label className={delivery==="normal"?"active":""}><input type="radio" checked={delivery==="normal"} onChange={()=>setDelivery("normal")}/><Truck size={21}/><span><b>Padrão fictícia</b><small>5–8 dias úteis · apenas ilustrativo</small></span><strong>GRÁTIS</strong></label>
       <label className={delivery==="expresso"?"active":""}><input type="radio" checked={delivery==="expresso"} onChange={()=>setDelivery("expresso")}/><Truck size={21}/><span><b>Expressa fictícia</b><small>2–3 dias úteis · apenas ilustrativo</small></span><strong>R$ 18</strong></label>
      </fieldset>
      <p className="v4-notice">Ambiente demonstrativo: nenhum frete, pedido ou pagamento real será processado.</p>
      {error&&<p className="v4-error" role="alert">{error}</p>}
      <button onClick={finish} className="v4-cta" disabled={!ready||!lines.length}>CONCLUIR SIMULAÇÃO <ArrowRight size={18}/></button>
     </>}
   </section>
   <aside className="v4-order-summary"><div className="v4-order-top"><b>RESUMO DA SACOLA</b><span>{count} {count===1?"PEÇA":"PEÇAS"}</span></div>
    <div className="v4-order-list">{lines.map(i=><div className="v4-line" key={i.product.id+"-"+i.size}>
     <div className="v4-line-image"><Image src={i.product.image} alt={i.product.name} fill sizes="100px"/></div>
     <div><strong>{i.product.name}</strong><small>TAMANHO {i.size} · {i.quantity} UN.</small><b>{formatPrice(i.product.price*i.quantity)}</b></div>
    </div>)}</div>
    <div className="v4-totals"><p><span>Subtotal</span><b>{formatPrice(subtotal)}</b></p><p><span>Entrega fictícia</span><b>{freight?formatPrice(freight):"Grátis"}</b></p><p><span>Total ilustrativo</span><strong>{formatPrice(subtotal+freight)}</strong></p></div>
    <small>Os preços e prazos existem apenas para demonstrar uma experiência de comércio.</small>
   </aside>
  </div>}
  <footer className="v4-checkout-footer"><span>© 2026 VÉRTICE — LOJA CONCEITUAL</span><Link href="/projeto">ESTUDO DE CASO ↗</Link></footer>
 </main>;
}
