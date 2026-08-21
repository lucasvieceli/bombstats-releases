// Compara o retrato novo das lives com o que já está publicado e diz se vale a
// pena publicar de novo. Imprime "yes" ou "no".
//
// Por que não publicar sempre: o robô roda de 5 em 5 minutos, o dia inteiro. Se
// cada rodada virasse uma publicação, o repositório encheria de alteração de
// robô sem nada de novo — a contagem de espectadores muda a toda hora.
//
// Publica quando: mudou QUEM está ao vivo (ou o título/categoria de alguém), ou
// quando o dado publicado já passou de meia hora (aí atualiza a contagem de
// espectadores, que é o que envelhece no card).
//
// Uso: node .github/scripts/live-changed.mjs <novo.json> <atual.json|vazio>
import { readFileSync } from "node:fs";

const MAX_AGE_MS = 30 * 60 * 1000;

const read = (path) => {
   if (!path) return null;
   try {
      return JSON.parse(readFileSync(path, "utf8"));
   } catch {
      return null; // não existe ainda / conteúdo quebrado: publica.
   }
};

const next = read(process.argv[2]);
const prev = read(process.argv[3]);

if (!next) {
   console.error("Retrato novo ilegível — não publica.");
   process.exit(1);
}
if (!prev) {
   console.log("yes");
   process.exit(0);
}

// O que a tela do app realmente mostra e não muda sozinho. A foto entra inteira
// na comparação: ela é o próprio conteúdo (vem embutida no arquivo), então
// trocar de foto — ou passar de link para foto embutida — precisa publicar.
const shape = (data) =>
   (data.live || [])
      .map((s) => `${s.login}|${s.title || ""}|${s.game || ""}|${s.avatar || ""}`)
      .sort()
      .join("\n");

const stale = Date.now() - (prev.updatedAt || 0) > MAX_AGE_MS;
console.log(shape(next) !== shape(prev) || stale ? "yes" : "no");
