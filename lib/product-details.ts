import type { Product } from "@/lib/products";

// Descrições totalmente conceituais — nenhum produto físico ou estoque real.
export type ConceptDetails = {
  statement: string;
  character: string;
  material: string;
  color: string;
  shape: string;
  styling: string;
  care: string;
};
const details: Record<number, ConceptDetails> = {
  1:{ statement:"A primeira escolha do dia deve ser simples. A Essential valoriza um caimento limpo, acabamento preciso e tudo o que não precisa ser dito.",character:"Minimalismo em sua forma mais direta",material:"Malha de algodão premium — conceito",color:"Preto",shape:"Caimento regular, linhas retas",styling:"Combine com o denim e um tênis de linhas limpas.",care:"Peças semelhantes costumam pedir lavagem suave e secagem à sombra; consulte a etiqueta real."},
  2:{ statement:"Entre a formalidade e a liberdade, a Oxford encontra o equilíbrio. Uma camisa atemporal para atravessar ocasiões sem mudar quem você é.",character:"Sofisticação cotidiana",material:"Algodão Oxford — conceito",color:"Off-white",shape:"Manga longa e estrutura clássica",styling:"Abotoada para composições formais ou aberta sobre uma camiseta.",care:"Peças semelhantes podem ser passadas do avesso; confira a etiqueta de uma peça real."},
  3:{ statement:"Textura e presença em uma só peça. O Everyday traduz conforto em uma silhueta pensada para desacelerar.",character:"Essencial com textura",material:"Tricot de toque macio — conceito",color:"Areia",shape:"Manga longa e gola redonda",styling:"Use com denim escuro para criar contraste discreto.",care:"Tricots semelhantes podem exigir secagem horizontal; consulte a etiqueta."},
  4:{ statement:"O denim é uma constante. O Straight traz equilíbrio entre estrutura e liberdade de movimento, sem seguir uma estação específica.",character:"O clássico reinventado",material:"Denim de algodão — conceito",color:"Índigo profundo",shape:"Reto, cintura regular",styling:"Use com a Essential ou com a Oxford aberta.",care:"Denim semelhante geralmente é lavado do avesso; consulte a etiqueta real."},
  5:{ statement:"Uma base clara para qualquer combinação. A Atelier é a expressão mais leve do guarda-roupa: versátil, precisa e descomplicada.",character:"Leveza essencial",material:"Algodão 100% — conceito",color:"Branco",shape:"Camiseta lisa com caimento regular",styling:"Ideal sob a camisa Resort ou com denim.",care:"Separe peças claras e respeite as instruções da etiqueta original."},
  6:{ statement:"Dias longos, lugares novos e um ritmo diferente. A Resort explora a ideia de vestir conforto sem abrir mão da intenção.",character:"Descontração refinada",material:"Tecido leve de toque natural — conceito",color:"Azul suave",shape:"Colarinho aberto e manga curta",styling:"Combine com calças claras e acessórios discretos.",care:"Prefira lavagem delicada em tecidos leves semelhantes; consulte a etiqueta."},
  7:{ statement:"Nem todo preto é igual. A Noir destaca a construção de uma peça simples e transforma discrição em assinatura.",character:"Presença sem excesso",material:"Malha encorpada — conceito",color:"Preto profundo",shape:"Caimento reto e acabamento limpo",styling:"Aposte em peças escuras para um visual monocromático.",care:"Para manter cores escuras, peças semelhantes costumam pedir lavagem do avesso."},
  8:{ statement:"Um refúgio para os dias mais frios. A Studio foi pensada como uma camada confortável de proporções contemporâneas.",character:"Conforto com identidade",material:"Moletom estruturado — conceito",color:"Natural",shape:"Hoodie com caimento amplo",styling:"Use sobre a Atelier para um visual em camadas.",care:"Peças semelhantes pedem lavagem suave; veja a etiqueta real."}
};
export function getConceptDetails(product: Product):ConceptDetails { return details[product.id]; }
