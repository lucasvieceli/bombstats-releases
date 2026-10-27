<div align="center">

# BombStats

**Painel desktop para o farm do BombCrypto** — frota multi-conta, jogo ao vivo (mapa, baús, heróis e rewards), as mesmas configurações e ações do Telegram com interface visual, e a **Vila**: um jogo à parte com cavernas, chefes, itens e trocas entre jogadores.

[![Baixar](https://img.shields.io/badge/Baixar%20a%20%C3%BAltima%20vers%C3%A3o-2ea44f?style=for-the-badge&logo=github)](https://github.com/lucasvieceli/bombstats-releases/releases/latest)
[![Versão](https://img.shields.io/github/v/release/lucasvieceli/bombstats-releases?style=for-the-badge&label=vers%C3%A3o)](https://github.com/lucasvieceli/bombstats-releases/releases/latest)
[![Site](https://img.shields.io/badge/site-bombstats.com-38bdf8?style=for-the-badge)](https://bombstats.com)
<img height="28" src="https://komarev.com/ghpvc/?username=bombstats&label=Visitas%20na%20P%C3%A1gina&color=38bdf8&style=for-the-badge" alt="Contador de visitas" />

</div>
<img width="1292" height="900" alt="Screenshot 2026-10-13 at 10 16 18" src="https://github.com/user-attachments/assets/0966d3f2-fd66-4ff5-b4f3-d20b1306abc0" />

<img width="1549" height="906" alt="Screenshot 2026-10-13 at 10 18 25" src="https://github.com/user-attachments/assets/53c431be-71a1-4d53-8355-7e2082a43421" />

---

## ⬇️ Download

Clique no arquivo do seu sistema. Os links abaixo apontam sempre para a **versão mais recente** — são atualizados automaticamente a cada lançamento:

<!-- DOWNLOADS:START -->
<!-- Gerado por scripts/release.sh no momento do release. Não edite à mão. -->

| Sistema | Arquivo | Observação |
| --- | --- | --- |
| **Windows** | [`BombStats-Setup-1.1.1.exe`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/BombStats-Setup-1.1.1.exe) | Instalador (NSIS) |
| **macOS (Apple Silicon — M1/M2/M3)** | [`BombStats-1.1.1-arm64.dmg`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/BombStats-1.1.1-arm64.dmg) | Macs novos |
| **macOS (Intel)** | [`BombStats-1.1.1.dmg`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/BombStats-1.1.1.dmg) | Macs antigos |
| **Linux** | [`BombStats-1.1.1.AppImage`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/BombStats-1.1.1.AppImage) | Roda em qualquer distro |
| **Linux (Debian/Ubuntu)** | [`bombstats_1.1.1_amd64.deb`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/bombstats_1.1.1_amd64.deb) | `sudo dpkg -i …` |
| **Servidor/VPS (Linux x64)** | [`bombstats-server-linux-x64`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/bombstats-server-linux-x64) | Terminal, sem tela — painel no navegador |
| **Servidor/VPS (Linux ARM64)** | [`bombstats-server-linux-arm64`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v1.1.1/bombstats-server-linux-arm64) | Terminal, sem tela — painel no navegador |

<!-- DOWNLOADS:END -->

> 🔄 **Atualização automática:** uma vez instalado, o BombStats verifica e baixa novas versões sozinho (no Windows e no Linux a atualização é silenciosa). No macOS, o app avisa quando há versão nova e abre o download. Além disso, **o farm se atualiza sozinho em segundo plano**, sem precisar baixar e reinstalar o app.

---

## 💾 Como instalar

### Windows

1. Baixe o `.exe` e execute.
2. Se o **SmartScreen** aparecer (“O Windows protegeu o computador”), clique em **Mais informações → Executar assim mesmo**.
3. Siga o instalador.

### macOS

Como o app **não é assinado por uma conta paga da Apple**, na primeira abertura o macOS mostra um aviso de “desenvolvedor não identificado”. É normal — basta autorizar uma vez:

1. Abra o `.dmg` e arraste o **BombStats** para a pasta **Aplicativos**.
2. Tente abrir. Se aparecer o aviso, vá em **Ajustes do Sistema → Privacidade e Segurança**.
3. Role até embaixo e clique em **“Abrir Mesmo Assim”**.
4. Confirme. A partir daí o app abre normalmente.

> ⚠️ Baixe sempre o `.dmg` certo para o seu Mac: **arm64** para Apple Silicon (M1/M2/M3) e o padrão para **Intel**.

### Linux

- **AppImage:** dê permissão de execução e rode.
  ```bash
  chmod +x BombStats-*.AppImage
  ./BombStats-*.AppImage
  ```
- **.deb (Debian/Ubuntu):**
  ```bash
  sudo dpkg -i BombStats-*.deb
  ```

### Servidor / VPS (Linux)

> 🚀 **Nunca usou um servidor?** O passo a passo completo — criar a conta na Linode, escolher o plano de US$ 5, conectar por SSH e deixar o painel no ar 24/7 — está em **[INSTALAR-NA-VPS.md](./INSTALAR-NA-VPS.md)**. Os comandos abaixo são o resumo para quem já tem o servidor.

**Passo 1 — Baixar** (escolha o comando do seu sistema):

x64 (maioria dos VPS):

```bash
curl -fsSL https://github.com/lucasvieceli/bombstats-releases/releases/latest/download/bombstats-server-linux-x64 -o bombstats-server && chmod +x bombstats-server
```

ARM64 (Oracle Free Tier, Raspberry Pi, etc.):

```bash
curl -fsSL https://github.com/lucasvieceli/bombstats-releases/releases/latest/download/bombstats-server-linux-arm64 -o bombstats-server && chmod +x bombstats-server
```

**Passo 2 — Iniciar dentro de uma sessão `screen`** (continua rodando mesmo após fechar o terminal):

```bash
pkill -f bombstats-server
screen -S bombstats ./bombstats-server
```

Na primeira vez, o servidor pede uma senha para proteger o painel — digite e pressione Enter. Depois de subir, **desanexe a sessão sem matar o processo** com:

<kbd>Ctrl+A</kbd> depois <kbd>D</kbd>

Pronto. Pode fechar o terminal à vontade.

**Voltar a ver os logs:**

```bash
screen -r bombstats
```

**Nas próximas vezes** (senha já criada), para iniciar basta:

```bash
screen -S bombstats ./bombstats-server
```

**Encerrar o servidor:**

```bash
pkill -f bombstats-server
```

**Esqueceu a senha do painel? Ou uma conta com senha de acesso travou?** Rode o modo de recuperação — um menu no terminal que troca a senha do painel, tira a senha de uma conta ou exclui uma conta, tudo passo a passo (se o servidor estiver rodando, ele mesmo oferece fechá-lo antes):

```bash
./bombstats-server recuperar
```

> ℹ️ Se preferir passar a senha por variável de ambiente (automação, Docker), use `BOMBSTATS_PASSWORD=suasenha` antes do comando — nesse caso o `screen` é opcional.

**Atualização:** quando sai uma versão nova, aparece um aviso no topo do painel — clique em **"Reiniciar e atualizar"** e ele baixa e troca o binário sozinho (seus dados em `~/.bombstats` não são tocados). Rodando por `screen`, depois de atualizar o servidor continua no ar, mas **fora da sessão `screen`** (o `screen -r` deixa de mostrá-lo). Para um servidor 24/7 que se atualiza de forma 100% limpa, vale rodar com `systemd` — passo a passo em **[SERVIDOR.md](./SERVIDOR.md)**.

---

## ✨ O que o BombStats faz

### 🤖 Farm

- **Frota multi-conta** — cadastre várias contas com as mesmas configurações do Telegram e acompanhe todas em um só painel.
- **Jogo ao vivo** — veja o mapa em tempo real: baús diminuindo, heróis farmando, energia/escudo e rewards subindo.
- **Mesmas ações em cliques** — o que você faria por comando agora é botão.
- **Controle pelo Discord** — comande o farm de todas as suas contas com o comando `/farm`.
- **Acesso remoto** — ligue o acesso remoto e abra o **mesmo painel pelo navegador** (até pelo celular), protegido por senha, sem precisar abrir portas. Pegue a URL atual por um comando no Telegram.
- **Mais segurança** — o farm não toca nas suas chaves: toda assinatura passa pelo app e só vale para uma lista de contratos permitidos.

### 🏘️ Vila

- **Conta BombStats** — entre com o Discord ou com e-mail e senha; seu personagem e sua vila ficam guardados na sua conta.
- **No app e no navegador** — a mesma Vila abre dentro do app e em **[vila.bombstats.com](https://vila.bombstats.com)**.
- **Vila Central** — Depósito, Marceneiro, Feirante, Ferreiro, Boticário, Padeiro, Vendedor e Templo, com chat entre os jogadores.
- **Cavernas** — escolha uma caverna e seu personagem caça sozinho, ganhando XP, ouro e itens, **mesmo com o app fechado**. Cada caverna tem um chefe que aparece de vez em quando, com prêmios melhores.
- **Equipamentos** — armas e armaduras para o personagem; conserte no Ferreiro e derreta o que não usa na Fundição.
- **Trocas entre jogadores** — itens, ouro e cristais, com tudo conferido pelos dois lados antes de aceitar.
- **Cristais** — por PIX ou cartão, para o Pergaminho Premium, skins premium, troca de nome e enfeites especiais.

### 🌐 Site

- **[bombstats.com](https://bombstats.com)** — guia de cavernas, monstros e itens, ranking e status do servidor.

### 🗣️ Idiomas

- Interface em **Português** e **Inglês**.

---

## 🆘 Suporte e problemas

- Encontrou um bug ou tem uma sugestão? Abra uma **[issue](https://github.com/lucasvieceli/bombstats-releases/issues)**.
- Veja o histórico de mudanças em cada versão na **[página de releases](https://github.com/lucasvieceli/bombstats-releases/releases)**.

---

<div align="center">
<sub>BombStats — projeto independente. Não afiliado à equipe oficial do BombCrypto.</sub>
</div>
