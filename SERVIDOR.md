# BombStats — versão servidor (terminal/Linux)

Versão **headless** do BombStats: roda em servidor/VPS sem interface gráfica. O
motor (farm) e o servidor web sobem por um binário único de terminal; o painel é
o **mesmo** do app desktop, acessado pelo **navegador**.


## Como rodar

1. Baixe o binário da sua arquitetura na página de releases (o arquivo se chama
   `bombstats-server-linux-x64` ou `bombstats-server-linux-arm64`):
   - `bombstats-server-linux-x64` (servidores comuns / Intel/AMD)
   - `bombstats-server-linux-arm64` (ARM, alguns VPS, Raspberry Pi)

2. No servidor (renomeie para `bombstats-server` para os comandos abaixo baterem):

   ```bash
   mv bombstats-server-linux-x64 bombstats-server   # ou ...-arm64, conforme baixou
   chmod +x bombstats-server
   ./bombstats-server
   ```

3. Na primeira vez ele pede para **criar uma senha** (ou use `BOMBSTATS_PASSWORD`).
   Depois mostra o endereço do painel:

   ```
   Bombstats — servidor  v0.1.8
   ----------------------------------------
   Dados:  /home/voce/.bombstats
   Painel: http://localhost:8787
   Túnel:  https://abc-xyz.trycloudflare.com
   ```

4. Abra o endereço no **navegador** (do seu PC ou celular), entre com a senha, e
   use o painel normalmente — cadastrar contas, dashboard, analytics, tudo igual
   ao app desktop.

## Variáveis de ambiente

| Variável             | Para que serve                                     | Padrão                |
| -------------------- | -------------------------------------------------- | --------------------- |
| `BOMBSTATS_DATA`     | Pasta onde ficam contas/segredos/configs           | `~/.bombstats`        |
| `BOMBSTATS_PASSWORD` | Define a senha do painel sem perguntar no terminal | (pergunta na 1ª vez)  |
| `BOMBSTATS_PORT`     | Porta do painel                                    | `8787`                |
| `BOMBSTATS_RENDERER` | Caminho do painel (só se mover os arquivos)        | (embutido no binário) |
| `CLOUDFLARED_PATH`   | Caminho de um cloudflared já instalado             | (baixa sob demanda)   |

## Onde ficam os dados

Tudo numa pasta (padrão `~/.bombstats`): `accounts.json`, `secrets.json`
(cifrado), `tokens.json` (cifrado), `settings.json`, `secret.key`, `bot-db.json`.
Depois de uma atualização feita pelo painel (sem `systemd`), a saída do servidor
passa a ser gravada em `server.log` nessa mesma pasta.

- **Backup:** copie a pasta inteira (inclui `secret.key` — sem ela, os segredos
  cifrados ficam ilegíveis).
- **Permissão:** o servidor cria a pasta como `700` (só o dono lê).

## Rodar 24/7 (systemd)

```ini
# /etc/systemd/system/bombstats.service
[Unit]
Description=BombStats Server
After=network.target

[Service]
ExecStart=/home/voce/bombstats-server
Restart=always
User=voce
Environment=BOMBSTATS_PASSWORD=suaSenhaForte
Environment=BOMBSTATS_DATA=/home/voce/.bombstats

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now bombstats
journalctl -u bombstats -f      # ver os logs
```

## Acesso de fora

- **Túnel Cloudflare** (mais simples): o servidor já sobe um túnel e mostra uma URL
  `https://...trycloudflare.com` — já vem com HTTPS. A URL muda a cada reinício.
- **Porta direta:** libere a `8787` no firewall (`sudo ufw allow 8787`). Sem HTTPS
  nativo — use só em rede confiável ou atrás de um proxy.

> A senha é **obrigatória** — o servidor não sobe o painel exposto sem senha.

## Esqueci a senha / conta travada (modo de recuperação)

No servidor não existe o app desktop (que enxerga todas as contas sem senha), então
esquecer a senha do painel — ou perder a senha de acesso de uma conta — trancaria
você para fora. Para isso existe o **modo de recuperação**: um menu no terminal que
resolve tudo passo a passo, sem editar arquivo nenhum.

```bash
./bombstats-server recuperar
```

O menu oferece:

1. **Trocar a senha do painel** — a que você digita no navegador.
2. **Tirar a senha de acesso de uma conta** — a conta volta a abrir sem senha no
   painel (dá para editar/excluir; depois você define uma senha nova pelo próprio
   painel, se quiser).
3. **Excluir uma conta** — apaga a conta e os segredos guardados dela.

Detalhes:

- Se o BombStats estiver rodando, o próprio menu **oferece fechá-lo** antes (as
  mudanças precisam ser feitas com o servidor parado). Ao terminar, suba o
  servidor de novo do jeito de sempre.
- Só funciona para quem tem acesso ao **terminal do servidor** (SSH) — quem chega
  aí já é o dono da máquina.

## Atualização

- **Pelo painel:** quando sai uma versão nova, aparece o aviso no topo (igual ao
  desktop). Clicar em **"Reiniciar e atualizar"** baixa o binário novo, troca e
  reinicia. Os dados (`~/.bombstats`) não são tocados.

  Como ele reinicia depende de **como** você subiu o servidor:
  - **Com `systemd` (recomendado):** o servidor só sai e o `systemd` o sobe de
    novo, já na versão nova. Reinício limpo, **um único processo**. É por isso
    que o `Restart=always` acima é importante.
  - **Com `screen` (ou rodando à mão):** como não há nada para reiniciar, o
    próprio servidor sobe a versão nova. O processo novo passa a rodar **fora da
    sessão `screen`** (o `screen -r bombstats` deixa de mostrá-lo — ele continua
    rodando normalmente em segundo plano) e a saída dele vai para
    `~/.bombstats/server.log`. Se quiser voltar a acompanhá-lo por `screen`,
    encerre com `pkill -f bombstats-server` e suba de novo. Para um servidor 24/7
    prefira o `systemd`.

  Proteções para você **nunca** precisar de acesso ao servidor por causa de uma
  atualização:
  - O binário baixado é **testado antes** de substituir o que está rodando (o
    servidor executa `--version` nele). Download corrompido ou de outra
    arquitetura é descartado sem encostar na instalação — o painel continua no ar
    e mostra o erro.
  - A versão anterior é guardada ao lado, como `bombstats-server.old`.
  - Depois de trocar, o processo antigo **espera o novo responder** na porta do
    painel. Se em 1 minuto ele não subir, o antigo **volta sozinho para a versão
    anterior** e religa o painel, para você poder tentar de novo.
  - Quando o servidor volta, ele **manda o novo endereço no Telegram** de todas as
    contas configuradas (a URL do túnel muda a cada reinício). Não precisa
    lembrar de pedir `/url`.

  > Uma trava de instância impede dois servidores na mesma pasta de dados ao
  > mesmo tempo. Se tentar abrir um segundo, ele avisa e encerra — não há mais
  > como ficar com "dois processos" disputando a porta.

- **Manual:**
  ```bash
  sudo systemctl stop bombstats
  curl -L <url-do-binario> -o bombstats-server
  chmod +x bombstats-server
  sudo systemctl start bombstats
  ```

