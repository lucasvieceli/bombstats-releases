// Pergunta à Twitch quem da lista está ao vivo e escreve o resultado em
// live.json. Quem consome esse arquivo é o BombStats de cada usuário (ver
// src/main/live.ts no app): ninguém além deste robô fala com a Twitch, então o
// segredo da credencial fica só aqui, nos Secrets do repositório.
//
// Uso: node .github/scripts/twitch-live.mjs <arquivo-de-saida>
// Precisa de TWITCH_CLIENT_ID e TWITCH_CLIENT_SECRET no ambiente.
import { readFileSync, writeFileSync } from "node:fs";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const OUT = process.argv[2] || "live.json";

if (!CLIENT_ID || !CLIENT_SECRET) {
   console.error(
      "Faltou TWITCH_CLIENT_ID ou TWITCH_CLIENT_SECRET no ambiente. " +
         "Cadastre em Settings → Secrets and variables → Actions."
   );
   process.exit(1);
}

// Lista de canais (arquivo na raiz do repositório, editável sem mexer no robô).
const { channels } = JSON.parse(readFileSync("twitch-channels.json", "utf8"));
const logins = [...new Set((channels || []).map((c) => String(c).toLowerCase()))]
   // A Twitch aceita no máximo 100 canais por consulta; acima disso ela recusa
   // a chamada inteira, então cortamos aqui e avisamos no log.
   .slice(0, 100);
if (logins.length === 0) {
   console.error("twitch-channels.json não tem nenhum canal.");
   process.exit(1);
}
if ((channels || []).length > 100) {
   console.warn(`Aviso: a lista tem ${channels.length} canais; só os 100 primeiros são consultados.`);
}

// Token de aplicação ("client credentials"): não representa nenhum usuário, só
// dá acesso de leitura ao que já é público. Some quando o processo acaba.
async function getToken() {
   const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
   });
   const res = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body,
   });
   if (!res.ok) {
      // Não imprime o corpo da resposta: em erro de credencial ele pode ecoar
      // parte do que foi enviado, e o log do Actions é público.
      throw new Error(`Twitch recusou a credencial (HTTP ${res.status}).`);
   }
   const json = await res.json();
   return json.access_token;
}

async function helix(token, path, params) {
   const url = new URL(`https://api.twitch.tv/helix/${path}`);
   for (const [k, values] of Object.entries(params)) {
      for (const v of values) url.searchParams.append(k, v);
   }
   const res = await fetch(url, {
      headers: { "Client-Id": CLIENT_ID, Authorization: `Bearer ${token}` },
   });
   if (!res.ok) throw new Error(`GET ${path} falhou (HTTP ${res.status}).`);
   return (await res.json()).data || [];
}

const token = await getToken();

// Quem está transmitindo agora. A Twitch só devolve os que ESTÃO ao vivo —
// quem não aparece na resposta está offline.
const streams = await helix(token, "streams", { user_login: logins });

// Foto do canal (a resposta de streams não traz). Uma consulta só para todos.
const users = await helix(token, "users", {
   login: streams.map((s) => s.user_login),
});
const avatarOf = new Map(users.map((u) => [u.login, u.profile_image_url]));

const live = streams
   .map((s) => ({
      login: s.user_login,
      name: s.user_name || s.user_login,
      title: s.title || "",
      game: s.game_name || undefined,
      viewers: s.viewer_count ?? undefined,
      startedAt: s.started_at || undefined,
      avatar: avatarOf.get(s.user_login),
   }))
   // Mais gente assistindo primeiro — é a ordem em que aparecem no menu.
   .sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));

writeFileSync(OUT, JSON.stringify({ updatedAt: Date.now(), live }, null, 2) + "\n");
console.log(`${live.length} ao vivo: ${live.map((s) => s.login).join(", ") || "(ninguém)"}`);
