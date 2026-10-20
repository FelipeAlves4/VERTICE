"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  const photos = [product.image, product.alternativeImage].filter((url): url is string => Boolean(url));
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  function openZoom() { dialog.current?.showModal(); }
  function closeZoom() { dialog.current?.close(); }
  function move(delta: number) {
    setActive((current) => (current + delta + photos.length) % photos.length);
  }

  return <div className="detail-gallery v3-gallery">
    <div className="v3-photo-frame">
      <button type="button" className="v3-photo-open" onClick={openZoom} aria-label={`Ampliar fotografia ${active+1} de ${product.name}`}>
        <Image src={photos[active]} alt={`Imagem ilustrativa de ${product.name}, referência ${active + 1}`}
          fill sizes="(max-width:820px) 94vw, 48vw" priority={active === 0} className="v3-zoom-target"/>
        <span className="v3-photo-counter">0{active+1} / 0{photos.length}</span>
        <span className="v3-zoom-hint"><Maximize2 size={16}/> AMPLIAR</span>
      </button>
    </div>
    {photos.length > 1 && <div className="v3-gallery-controls">
      <div className="v3-gallery-thumbs">{photos.map((url, i) =>
        <button key={url} type="button" aria-label={`Selecionar foto ${i+1}`} aria-pressed={active===i} onClick={()=>setActive(i)}>
          <Image src={url} alt="" fill sizes="84px"/>
        </button>
      )}</div>
      <div className="v3-gallery-arrows"><button type="button" onClick={()=>move(-1)} aria-label="Imagem anterior"><ArrowLeft size={18}/></button><button type="button" onClick={()=>move(1)} aria-label="Próxima imagem"><ArrowRight size={18}/></button></div>
    </div>}
    <p>Fotografias ilustrativas. As peças, imagens e especificações são parte de um projeto conceitual.</p>
    <dialog ref={dialog} className="v3-photo-dialog" aria-label={`Visualização ampliada de ${product.name}`}
      onClick={(event) => { if (event.target === event.currentTarget) closeZoom(); }}
      onKeyDown={(event) => { if(event.key==="ArrowRight")move(1); if(event.key==="ArrowLeft")move(-1); }}>
      <div className="v3-modal-top"><span>VÉRTICE / GALERIA EDITORIAL — {active+1}/{photos.length}</span><button type="button" onClick={closeZoom} aria-label="Fechar imagem ampliada"><X size={24}/></button></div>
      <div className="v3-modal-image"><Image src={photos[active]} alt={`Imagem ampliada de ${product.name}`} fill sizes="90vw" quality={85}/></div>
      <div className="v3-modal-bottom"><span>{product.name.toUpperCase()}</span><div>
        {photos.length > 1 && <><button type="button" onClick={()=>move(-1)} aria-label="Foto anterior"><ArrowLeft/></button><button type="button" onClick={()=>move(1)} aria-label="Foto seguinte"><ArrowRight/></button></>}
      </div></div>
    </dialog>
  </div>;
}
