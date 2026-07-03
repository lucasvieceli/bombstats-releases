<div align="center">

# BombStats

**Painel desktop para o farm do BombCrypto** — frota multi-conta, jogo ao vivo (mapa, baús, heróis e rewards), as mesmas configurações e ações do Telegram, agora com interface visual.

[![Baixar](https://img.shields.io/badge/Baixar%20a%20%C3%BAltima%20vers%C3%A3o-2ea44f?style=for-the-badge&logo=github)](https://github.com/lucasvieceli/bombstats-releases/releases/latest)
[![Versão](https://img.shields.io/github/v/release/lucasvieceli/bombstats-releases?style=for-the-badge&label=vers%C3%A3o)](https://github.com/lucasvieceli/bombstats-releases/releases/latest)

</div>

---

## ⬇️ Download

Clique no arquivo do seu sistema. Os links abaixo apontam sempre para a **versão mais recente** — são atualizados automaticamente a cada lançamento:

<!-- DOWNLOADS:START -->
<!-- Gerado por scripts/release.sh no momento do release. Não edite à mão. -->

| Sistema | Arquivo | Observação |
| --- | --- | --- |
| **Windows** | [`BombStats-Setup-0.6.5.exe`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/BombStats-Setup-0.6.5.exe) | Instalador (NSIS) |
| **macOS (Apple Silicon — M1/M2/M3)** | [`BombStats-0.6.5-arm64.dmg`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/BombStats-0.6.5-arm64.dmg) | Macs novos |
| **macOS (Intel)** | [`BombStats-0.6.5.dmg`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/BombStats-0.6.5.dmg) | Macs antigos |
| **Linux** | [`BombStats-0.6.5.AppImage`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/BombStats-0.6.5.AppImage) | Roda em qualquer distro |
| **Linux (Debian/Ubuntu)** | [`bombstats_0.6.5_amd64.deb`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/bombstats_0.6.5_amd64.deb) | `sudo dpkg -i …` |
| **Servidor/VPS (Linux x64)** | [`bombstats-server-linux-x64`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/bombstats-server-linux-x64) | Terminal, sem tela — painel no navegador |
| **Servidor/VPS (Linux ARM64)** | [`bombstats-server-linux-arm64`](https://github.com/lucasvieceli/bombstats-releases/releases/download/v0.6.5/bombstats-server-linux-arm64) | Terminal, sem tela — painel no navegador |

<!-- DOWNLOADS:END -->













> 🔄 **Atualização automática:** uma vez instalado, o BombStats verifica e baixa novas versões sozinho (no Windows e no Linux a atualização é silenciosa). No macOS, o app avisa quando há versão nova e abre o download.

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

Instale e inicie com um único comando. Escolha abaixo o comando do seu sistema:

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

> ℹ️ Se preferir passar a senha por variável de ambiente (automação, Docker), use `BOMBSTATS_PASSWORD=suasenha` antes do comando — nesse caso o `screen` é opcional.

**Atualização:** quando sai uma versão nova, aparece um aviso no topo do painel — clique em **"Reiniciar e atualizar"** e ele baixa e troca o binário sozinho (seus dados em `~/.bombstats` não são tocados). Rodando por `screen`, depois de atualizar o servidor continua no ar, mas **fora da sessão `screen`** (o `screen -r` deixa de mostrá-lo). Para um servidor 24/7 que se atualiza de forma 100% limpa, vale rodar com `systemd` — passo a passo em **[SERVIDOR.md](./SERVIDOR.md)**.

---

## ✨ O que o BombStats faz

- **Frota multi-conta** — cadastre várias contas com as mesmas configurações do Telegram e acompanhe todas em um só painel.
- **Jogo ao vivo** — veja o mapa em tempo real: baús diminuindo, heróis farmando, energia/escudo e rewards subindo.
- **Mesmas ações em cliques** — o que você faria por comando agora é botão.
- **Acesso remoto** — ligue o acesso remoto e abra o **mesmo painel pelo navegador** (até pelo celular), protegido por senha, sem precisar abrir portas. Pegue a URL atual por um comando no Telegram.
- **Idiomas** — interface em **Português** e **Inglês**.

---

## 🆘 Suporte e problemas

- Encontrou um bug ou tem uma sugestão? Abra uma **[issue](https://github.com/lucasvieceli/bombstats-releases/issues)**.
- Veja o histórico de mudanças em cada versão na **[página de releases](https://github.com/lucasvieceli/bombstats-releases/releases)**.

---

<div align="center">
<sub>BombStats — projeto independente. Não afiliado à equipe oficial do BombCrypto.</sub>
</div>
