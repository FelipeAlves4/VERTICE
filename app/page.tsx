"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Heart, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, X,
} from "lucide-react";
import { CART_KEY, categories, formatPrice, products, type Category, type Product } from "@/lib/products";

type CartItem = { productId: number; size: string; quantity: number };
const FAV_KEY = "vertice-favorites-v1";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [category, setCategory] = useState<Category>("Todos");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const savedFavs = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      if (Array.isArray(savedCart)) {
        setCart(savedCart.filter((item): item is CartItem =>
          typeof item?.productId === "number" &&
          products.some((product) => product.id === item.productId && product.sizes.includes(item.size)) &&
          Number.isInteger(item.quantity) && item.quantity > 0
        ));
      }
      if (Array.isArray(savedFavs)) setFavorites(savedFavs.filter((id): id is number => typeof id === "number"));
    } catch { /* ignore corrupted local data */ }
    if (new URLSearchParams(window.location.search).get("sacola") === "1") {
      setBagOpen(true);
      window.history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2700);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const isOverlay = searchOpen || bagOpen || quickView !== null || menuOpen || checkoutDone;
    if (!isOverlay) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false); setBagOpen(false); setQuickView(null);
        setMenuOpen(false); setCheckoutDone(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onEscape); };
  }, [searchOpen, bagOpen, quickView, menuOpen, checkoutDone]);

  const featured = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    const filtered = products.filter((product) =>
      (category === "Todos" || product.category === category) &&
      (!q || [product.name, product.descriptor, product.category].join(" ").toLocaleLowerCase("pt-BR").includes(q))
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, query, sort]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (products.find((product) => product.id === item.productId)?.price || 0) * item.quantity, 0);
  const goToCollection = (nextCategory: Category = "Todos") => {
    setCategory(nextCategory); setQuery(""); setMenuOpen(false); setSearchOpen(false);
    window.setTimeout(() => scrollToSection("colecao"), 30);
  };
  const addToCart = (product: Product, selectedSize: string) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.size === selectedSize);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { productId: product.id, size: selectedSize, quantity: 1 }];
    });
    setQuickView(null); setSize(null); setToast(`${product.name} adicionado à sacola`);
  };
  const changeQuantity = (productId: number, selectedSize: string, delta: number) => {
    setCart((current) => current.map((item) =>
      item.productId === productId && item.size === selectedSize
        ? { ...item, quantity: item.quantity + delta } : item
    ).filter((item) => item.quantity > 0));
  };
  const toggleFavorite = (id: number) => setFavorites((current) =>
    current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
  );
  const openQuickView = (product: Product) => { setQuickView(product); setSize(null); };

  return (
    <main id="topo">
      <div className="announcement"><span>UMA NOVA PERSPECTIVA SOBRE O ESSENCIAL</span><span className="announcement-right">COLEÇÃO 001 / 2026 <span aria-hidden="true">↗</span></span></div>
      <header className="site-header">
        <button className="mobile-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={23} strokeWidth={1.6}/></button>
        <button className="brand" onClick={() => scrollToSection("topo")} aria-label="VÉRTICE - início">VÉRTICE<span className="brand-dot">.</span></button>
        <nav className="main-nav" aria-label="Navegação principal">
          <button onClick={() => goToCollection("Todos")}>COLEÇÃO</button>
          <button onClick={() => goToCollection("Camisetas")}>ESSENCIAIS</button>
          <button onClick={() => scrollToSection("lookbook")}>LOOKBOOK</button>
          <button onClick={() => scrollToSection("manifesto")}>NOSSA ESSÊNCIA</button>
        </nav>
        <div className="header-actions">
          <button aria-label="Buscar produtos" onClick={() => setSearchOpen(true)}><Search size={20} strokeWidth={1.6}/></button>
          <button className="bag-trigger" aria-label={`Abrir sacola com ${cartCount} itens`} onClick={() => setBagOpen(true)}><ShoppingBag size={20} strokeWidth={1.6}/><span>{cartCount}</span></button>
        </div>
      </header>

      <section className="hero" aria-label="Coleção VÉRTICE">
        <div className="hero-copy">
          <div className="hero-index"><span className="line"/> EST. 2026 — SÃO PAULO, BRASIL</div>
          <p className="hero-eyebrow">UMA NOVA FORMA DE SE VESTIR <span className="v3-edition">· DROP 001</span></p>
          <h1>MENOS<br/>RUÍDO.<br/><em>MAIS</em><br/>ESSÊNCIA<span className="period">.</span></h1>
          <p className="hero-description">Peças que não precisam dizer muito para expressar tudo. Design atemporal para quem constrói o próprio caminho.</p>
          <button className="pill-button hero-cta" onClick={() => goToCollection()}>EXPLORAR COLEÇÃO <ArrowUpRight size={17}/></button>
          <div className="hero-bottom">001 — 008 <span>DESIGNED TO BE DIFFERENT</span></div>
        </div>
        <div className="hero-photo">
          <Image src="/editorial/noir.webp" alt="Editorial VÉRTICE, modelo em roupa preta lisa em escadaria de concreto ao pôr do sol" quality={85} fill sizes="(max-width: 900px) 100vw, 55vw" priority className="cover-photo"/>
          <div className="hero-photo-shade"/><div className="v3-photo-note">THE SHAPE OF SIMPLICITY <span>↗</span></div>
          <span className="hero-vertical">VÉRTICE / EDITION Nº 001</span>
          <div className="photo-caption"><span>01 / THE NEW ESSENTIALS</span><ArrowDown size={19}/></div>
        </div>
      </section>

      <div className="editorial-strip" aria-hidden="true"><span>FEITO PARA DURAR</span><span>✳</span><span>DESIGN COM PROPÓSITO</span><span>✳</span><span>MENOS, PORÉM MELHOR</span><span>✳</span><span>FEITO PARA DURAR</span></div>

      <section className="collection section-wrap" id="colecao">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="tiny-line"/> EDIÇÃO Nº 001</p><h2>O essencial<br/><em>reinventado.</em></h2></div>
          <p className="section-aside">Uma curadoria de peças versáteis, pensadas para acompanhar cada versão de você.</p>
        </div>
        <div className="collection-toolbar">
          <div className="category-tabs" aria-label="Filtrar produtos por categoria">
            {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
          </div>
          <label className="sort-control"><SlidersHorizontal size={17} strokeWidth={1.6}/><span>ORDENAR</span><select aria-label="Ordenar produtos" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select><ChevronDown size={14}/></label>
        </div>
        {query && <p className="query-result">Resultados para “{query}” <button onClick={() => setQuery("")}>limpar busca <X size={14}/></button></p>}
        {featured.length ? <div className="product-grid">{featured.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-photo" style={{ backgroundColor: product.tone }}>
              <Link className="product-image-button" href={`/produto/${product.slug}`} aria-label={`Abrir página de ${product.name}`}><Image src={product.image} alt={`Imagem ilustrativa: ${product.name}`} fill sizes="(max-width: 600px) 48vw, (max-width: 1100px) 32vw, 24vw" className="cover-photo" /></Link>
              {product.tag && <span className="product-tag">{product.tag}</span>}
              <button className={`favorite-button ${favorites.includes(product.id) ? "selected" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={`${favorites.includes(product.id) ? "Remover" : "Adicionar"} ${product.name} ${favorites.includes(product.id) ? "dos" : "aos"} favoritos`} aria-pressed={favorites.includes(product.id)}><Heart size={18} strokeWidth={1.5} fill={favorites.includes(product.id) ? "currentColor" : "none"}/></button>
              <button className="quick-add" onClick={() => openQuickView(product)}>ESCOLHER TAMANHO <Plus size={16}/></button>
            </div>
            <Link className="product-copy" href={`/produto/${product.slug}`}><span><strong>{product.name}</strong><small>{product.descriptor}</small></span><b>{formatPrice(product.price)}</b></Link>
          </article>
        ))}</div> : <div className="empty-results"><h3>Nenhuma peça encontrada.</h3><p>Experimente outro termo ou categoria.</p><button className="text-link" onClick={() => { setCategory("Todos"); setQuery(""); }}>VER TODOS OS PRODUTOS <ArrowRight size={17}/></button></div>}
        <p className="collection-count">MOSTRANDO {featured.length} DE {products.length} PEÇAS</p>
      </section>


      <section className="v2-lookbook" id="lookbook" aria-label="Lookbook editorial">
        <div className="v2-lb-top"><span>VÉRTICE JOURNAL / EDIÇÃO 002</span><span>EST. 2026 — BRASIL</span></div>
        <div className="v2-lb-heading"><div><p className="eyebrow">UM ESTUDO SOBRE O ESSENCIAL</p><h2>Peças para<br/><em>viver histórias.</em></h2></div><p>Não é sobre ter mais. É sobre escolher o que fica. Uma nova maneira de enxergar formas, texturas e presença.</p></div>
        <div className="v2-lb-grid">
          <div className="v2-lb-large"><Image src="/editorial/sand.webp" alt="Editorial VÉRTICE, camisa clara e calça bege diante de concreto em luz de fim de tarde" quality={85} fill sizes="(max-width: 700px) 90vw, 60vw" className="cover-photo"/><span>01 / THE DAILY UNIFORM</span></div>
          <div className="v2-lb-small"><Image src="/editorial/noir.webp" alt="Campanha VÉRTICE: roupa preta sem logos em arquitetura brutalista" quality={85} fill sizes="(max-width: 700px) 90vw, 35vw" className="cover-photo"/><span>02 / THE OBJECT OF INTENTION</span></div>
          <div className="v2-lb-note"><span>CURADORIA / 001</span><strong>Vestir-se bem é um gesto silencioso.</strong><button onClick={() => goToCollection()}>CONHEÇA A COLEÇÃO <ArrowUpRight size={17}/></button><b aria-hidden="true">V↗</b></div>
        </div><p className="v2-lb-bottom">VÉRTICE / CAMPANHA CONCEITUAL GERADA POR IA / NÃO SÃO PRODUTOS REAIS</p>
      </section>
      <section className="campaign" aria-label="Editorial VÉRTICE">
        <div className="campaign-image"><Image src="/editorial/sand.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Campanha VÉRTICE: camisa off-white e alfaiataria areia sem marcas visíveis" quality={85} className="cover-photo"/></div>
        <div className="campaign-copy"><span className="eyebrow light">UM ESTILO. INFINITAS POSSIBILIDADES.</span><span className="campaign-number">V / 001</span><h2>O ESTILO<br/>NÃO GRITA.<br/><em>MARCA.</em></h2><p>Uma boa peça transforma a presença, não a personalidade. Descubra o poder de vestir o que realmente importa.</p><button className="light-link" onClick={() => goToCollection("Camisas")}>DESCUBRA A COLEÇÃO <ArrowUpRight size={19}/></button></div>
      </section>

      <section className="manifesto section-wrap" id="manifesto">
        <div className="manifesto-top"><span>01 / NOSSA FILOSOFIA</span><span>VÉRTICE — BEYOND THE ORDINARY</span></div>
        <h2>Não seguimos<br/><em>tendências.</em><br/>Seguimos em frente<span>.</span></h2>
        <div className="manifesto-bottom"><div className="manifesto-mark">V<span>↗</span></div><p>Acreditamos que o verdadeiro estilo está nas escolhas conscientes. Menos excessos, mais intenção. Menos distrações, mais personalidade.</p></div>
      </section>

      <section className="newsletter"><div><span className="eyebrow">FAÇA PARTE DO MOVIMENTO</span><h2>Além do <em>óbvio.</em></h2><p>Receba novidades da nossa coleção conceitual.</p></div><form onSubmit={(event) => { event.preventDefault(); setNewsletterDone(true); }}><label htmlFor="email">SEU MELHOR E-MAIL</label><div className="email-field"><input id="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" required disabled={newsletterDone}/><button type="submit" aria-label="Cadastrar interesse" disabled={newsletterDone}>{newsletterDone ? <Check size={23}/> : <ArrowRight size={25}/>}</button></div><small>{newsletterDone ? "Obrigado! Este formulário é apenas uma demonstração; nenhum dado foi enviado." : "Experiência demonstrativa. Nenhum e-mail será enviado ou armazenado."}</small></form></section>

      <footer className="site-footer"><div className="footer-top"><div><button className="footer-logo" onClick={() => scrollToSection("topo")}>VÉRTICE<span>.</span></button><p>O essencial é o que permanece.</p></div><div className="footer-links"><div><strong>EXPLORE</strong><button onClick={() => goToCollection()}>Coleção</button><button onClick={() => goToCollection("Camisetas")}>Essenciais</button><button onClick={() => scrollToSection("lookbook")}>Lookbook</button><button onClick={() => scrollToSection("manifesto")}>Nossa essência</button></div><div><strong>PROJETO</strong><Link href="/projeto">Estudo de caso <ArrowUpRight size={13}/></Link><a href="https://github.com/FelipeAlves4/VERTICE" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Foto do Hoodie: Unsplash <ArrowUpRight size={13}/></a></div></div></div><div className="footer-bottom"><span>© 2026 VÉRTICE — PROJETO CONCEITUAL</span><span>PORTFÓLIO / NÃO É UMA LOJA REAL</span><span>DESIGNED WITH INTENTION ↗</span></div></footer>

      {menuOpen && <div className="overlay" onMouseDown={() => setMenuOpen(false)}><aside className="side-panel mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" onMouseDown={(event) => event.stopPropagation()}><div className="panel-head"><span>MENU</span><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X/></button></div><div className="mobile-menu-links"><button onClick={() => goToCollection()}>Coleção <ArrowUpRight/></button><button onClick={() => goToCollection("Camisetas")}>Essenciais <ArrowUpRight/></button><button onClick={() => { setMenuOpen(false); scrollToSection("lookbook"); }}>Lookbook <ArrowUpRight/></button><button onClick={() => { setMenuOpen(false); scrollToSection("manifesto"); }}>Nossa essência <ArrowUpRight/></button></div><p>VÉRTICE — EST. 2026</p></aside></div>}

      {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}><section className="search-panel" role="dialog" aria-modal="true" aria-label="Buscar produtos" onMouseDown={(event) => event.stopPropagation()}><div className="search-head"><span>O QUE VOCÊ PROCURA?</span><button onClick={() => setSearchOpen(false)} aria-label="Fechar busca"><X size={25}/></button></div><form onSubmit={(event) => { event.preventDefault(); setCategory("Todos"); setSearchOpen(false); window.setTimeout(() => scrollToSection("colecao"), 30); }}><Search size={30} strokeWidth={1.3}/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Encontre seu essencial..." aria-label="Termo de busca"/><button type="submit" aria-label="Buscar"><ArrowRight size={25}/></button></form><p>EXPLORE: {categories.slice(1).map((item) => <button key={item} onClick={() => goToCollection(item)}>{item} ↗</button>)}</p></section></div>}

      {bagOpen && <div className="overlay" onMouseDown={() => setBagOpen(false)}><aside className="side-panel bag-panel" role="dialog" aria-modal="true" aria-label="Sua sacola" onMouseDown={(event) => event.stopPropagation()}><div className="panel-head"><span>SUA SACOLA ({cartCount})</span><button onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X/></button></div>{cart.length ? <><div className="bag-items">{cart.map((item) => { const product = products.find((value) => value.id === item.productId); if (!product) return null; return <div className="bag-item" key={`${item.productId}-${item.size}`}><div className="bag-image"><Image src={product.image} alt={product.name} fill sizes="100px" className="cover-photo"/></div><div className="bag-item-info"><strong>{product.name}</strong><small>TAMANHO {item.size}</small><span>{formatPrice(product.price)}</span><div className="quantity"><button onClick={() => changeQuantity(item.productId, item.size, -1)} aria-label={`Diminuir quantidade de ${product.name}`}><Minus size={15}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.productId, item.size, 1)} aria-label={`Aumentar quantidade de ${product.name}`}><Plus size={15}/></button></div></div><button className="bag-remove" onClick={() => changeQuantity(item.productId, item.size, -item.quantity)} aria-label={`Remover ${product.name}`}><X size={17}/></button></div>; })}</div><div className="bag-footer"><div className="subtotal"><span>SUBTOTAL</span><strong>{formatPrice(subtotal)}</strong></div><p>Este é um projeto demonstrativo. Nenhum valor será cobrado.</p><Link className="dark-button" href="/checkout" onClick={() => setBagOpen(false)}>IR PARA O CHECKOUT <ArrowRight size={18}/></Link><button className="continue-shopping" onClick={() => { setBagOpen(false); goToCollection(); }}>CONTINUAR EXPLORANDO</button></div></> : <div className="bag-empty"><ShoppingBag size={42} strokeWidth={1}/><h3>Sua sacola está vazia.</h3><p>Peças incríveis estão esperando por você.</p><button className="dark-button" onClick={() => { setBagOpen(false); goToCollection(); }}>EXPLORAR COLEÇÃO <ArrowRight size={17}/></button></div>}</aside></div>}

      {quickView && <div className="overlay" onMouseDown={() => { setQuickView(null); setSize(null); }}><section className="quick-view" role="dialog" aria-modal="true" aria-label={`Detalhes de ${quickView.name}`} onMouseDown={(event) => event.stopPropagation()}><button className="quick-close" onClick={() => { setQuickView(null); setSize(null); }} aria-label="Fechar detalhes"><X size={22}/></button><div className="quick-image"><Image src={quickView.image} alt={quickView.name} fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-photo"/></div><div className="quick-info"><span className="eyebrow">VÉRTICE / {quickView.category.toUpperCase()}</span><h2>{quickView.name}</h2><p className="quick-descriptor">{quickView.descriptor}</p><p className="quick-price">{formatPrice(quickView.price)}</p><div className="size-head"><strong>SELECIONE O TAMANHO</strong><span>Guia ilustrativo</span></div><div className="size-options">{quickView.sizes.map((item) => <button key={item} className={size === item ? "chosen" : ""} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</div><button className="dark-button" disabled={!size} onClick={() => size && addToCart(quickView, size)}>ADICIONAR À SACOLA <ArrowRight size={19}/></button><Link className="v2-more" href={`/produto/${quickView.slug}`}>PÁGINA COMPLETA DO PRODUTO <ArrowUpRight size={16}/></Link><p className="demo-note">Peça e imagens ilustrativas. Esta é uma loja conceito sem vendas reais.</p></div></section></div>}

      {checkoutDone && <div className="overlay center-overlay" onMouseDown={() => setCheckoutDone(false)}><section className="confirmation" role="dialog" aria-modal="true" aria-label="Pedido demonstrativo" onMouseDown={(event) => event.stopPropagation()}><div className="confirm-icon"><Check size={33}/></div><p className="eyebrow">EXPERIÊNCIA DE DEMONSTRAÇÃO</p><h2>Boa escolha<span>.</span></h2><p>Seu pedido foi simulado com sucesso. Nenhum pagamento foi processado e nenhuma compra real foi registrada.</p><button className="dark-button" onClick={() => { setCart([]); setCheckoutDone(false); scrollToSection("topo"); }}>VOLTAR À LOJA <ArrowRight size={18}/></button></section></div>}
      {toast && <div className="toast" role="status"><Check size={17}/>{toast}<button onClick={() => { setToast(""); setBagOpen(true); }}>VER SACOLA <ArrowRight size={14}/></button></div>}
    </main>
  );
}