"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  // Duas vistas da MESMA imagem original: foto completa e detalhe ampliado.
  // Não apresentamos recortes como se fossem fotografias de outro ângulo.
  const frames = [
    { id: "full", name: "VISÃO COMPLETA", detail: false },
    { id: "detail", name: "AMPLIAÇÃO", detail: true },
  ] as const;
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = frames[active];
  function move(delta: number) { setActive((i) => (i + delta + frames.length) % frames.length); }

  return <div className="detail-gallery v3-gallery">
    <div className="v3-photo-frame">
      <button type="button" className="v3-photo-open" data-detail={current.detail} onClick={() => dialog.current?.showModal()}
        aria-label={`Ampliar ${current.name.toLowerCase()} de ${product.name}`}>
        <Image src={product.image} alt={`Fotografia conceitual de ${product.name}`} fill
          sizes="(max-width:820px) 94vw, 48vw" priority={active === 0} quality={85} className="v3-zoom-target"/>
        <span className="v3-photo-counter">0{active + 1} / 02 — {current.name}</span>
        <span className="v3-zoom-hint"><Maximize2 size={16}/> AMPLIAR</span>
      </button>
    </div>
    <div className="v3-gallery-controls">
      <div className="v3-gallery-thumbs" aria-label="Vistas da peça">
        {frames.map((frame, i) => <button key={frame.id} type="button" data-detail={frame.detail}
          aria-pressed={i===active} aria-label={frame.detail ? "Ver ampliação da mesma foto" : "Ver foto completa"} onClick={() => setActive(i)}>
          <Image src={product.image} alt="" fill sizes="84px" quality={85}/>
        </button>)}
      </div>
      <div className="v3-gallery-arrows"><button type="button" onClick={() => move(-1)} aria-label="Vista anterior"><ArrowLeft size={18}/></button><button type="button" onClick={() => move(1)} aria-label="Próxima vista"><ArrowRight size={18}/></button></div>
    </div>
    <p>Imagem conceitual de IA ou fotografia ilustrativa. A ampliação é um recorte da mesma foto, não um segundo ângulo da peça.</p>
    <dialog ref={dialog} className="v3-photo-dialog" aria-label={`Imagem ampliada de ${product.name}`}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => { if(event.key==="ArrowRight") move(1); if(event.key==="ArrowLeft") move(-1); }}>
      <div className="v3-modal-top"><span>VÉRTICE / {current.name} — {active+1}/2</span><button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar"><X size={24}/></button></div>
      <div className="v3-modal-image" data-detail={current.detail}><Image src={product.image} alt={`Imagem conceitual ampliada de ${product.name}`} fill sizes="90vw" quality={85}/></div>
      <div className="v3-modal-bottom"><span>{product.name.toUpperCase()}</span><div>
        <button type="button" onClick={() => move(-1)} aria-label="Vista anterior"><ArrowLeft/></button>
        <button type="button" onClick={() => move(1)} aria-label="Próxima vista"><ArrowRight/></button>
      </div></div>
    </dialog>
  </div>;
}
