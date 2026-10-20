"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CART_KEY, products } from "@/lib/products";
type CartItem = {productId:number;size:string;quantity:number};
function readCart():CartItem[]{
 try{const raw:unknown=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
  if(!Array.isArray(raw))return [];
  return raw.filter((item):item is CartItem=>typeof item?.productId==="number"&&products.some(p=>p.id===item.productId&&p.sizes.includes(item.size))&&Number.isInteger(item.quantity)&&item.quantity>0);
 }catch{return [];}
}
export default function AddToBag({productId,sizes}:{productId:number;sizes:string[]}){
 const [size,setSize]=useState<string|null>(null);const [added,setAdded]=useState(false);const [error,setError]=useState(false);
 function submit(){if(!size)return;
  const old=readCart();const i=old.findIndex(x=>x.productId===productId&&x.size===size);
  const next=i>=0?old.map((x,n)=>n===i?{...x,quantity:x.quantity+1}:x):[...old,{productId,size,quantity:1}];
  try{localStorage.setItem(CART_KEY,JSON.stringify(next));setAdded(true);setError(false);}catch{setError(true);setAdded(false);}
 }
 return <div className="detail-buy"><div className="detail-size-label"><strong>TAMANHO</strong><span>{size?`Selecionado: ${size}`:"Selecione uma opção"}</span></div><div className="detail-sizes" role="group" aria-label="Selecionar tamanho">{sizes.map(s=><button type="button" key={s} aria-pressed={size===s} onClick={()=>{setSize(s);setAdded(false);}}>{s}</button>)}</div><button className="detail-add" type="button" disabled={!size} onClick={submit}>{added?"ADICIONAR OUTRA UNIDADE":"ADICIONAR À SACOLA"}<ArrowRight size={19}/></button>{added&&<p className="detail-added" role="status"><Check size={17}/> Peça adicionada. <Link href="/?sacola=1">VER SACOLA ↗</Link></p>}{error&&<p className="detail-error" role="alert">Não foi possível salvar a sacola neste navegador.</p>}<p className="detail-disclaimer">Demonstração de portfólio — nenhum valor será cobrado.</p></div>;
}
