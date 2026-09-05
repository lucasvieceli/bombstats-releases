<div align="center">

# BombStats na VPS — do zero ao painel no ar

**Um servidor ligado 24 horas por dia, por cerca de US$ 5 por mês.**
Você não precisa deixar o computador ligado: o farm roda no servidor e você acompanha tudo pelo navegador — do PC ou do celular.

</div>

---

## O que você vai precisar

- Um **cartão de crédito** (a Linode cobra por mês; o valor é proporcional aos dias usados).
- **15 minutos.** Não precisa saber Linux: é copiar e colar os comandos desta página.
- Um **e-mail** para criar a conta.

> 💡 **VPS** é só um computador que fica ligado na internet o tempo todo, na casa de outra pessoa. Você o comanda digitando comandos no terminal, em vez de clicar em janelas.

---

## O caminho todo, em 4 passos

Antes de começar, para você saber onde vai chegar:

1. **Criar a conta** na Linode e cadastrar o cartão.
2. **Criar o servidor** — Ubuntu, plano de US$ 5 — e **entrar nele** pelo Termius ou pelo terminal.
3. **Baixar o BombStats** lá dentro (um comando).
4. **Ligar o painel**, criar a senha e abrir o endereço que ele mostrar no navegador.

O resto desta página é cada um desses passos com todos os detalhes. **Não pule nenhum e vai dar certo.**

---

## Passo 1 — Criar a conta na Linode

1. Acesse **[linode.com](https://linode.gvw92c.net/do1vYM)** e clique em **Sign up**.
2. Preencha e-mail, nome de usuário e senha (ou entre com Google/GitHub).
3. Confirme o e-mail — chega uma mensagem com um link de verificação.
4. A Linode pede **forma de pagamento** antes de liberar a criação do servidor: cadastre o cartão em **Billing → Add Payment Method**. Pode aparecer também uma verificação por telefone/SMS — é uma checagem antifraude, normal.

<!-- captura: tela de cadastro da Linode -->

> ℹ️ A Linode hoje faz parte da Akamai, então você verá os dois nomes pela interface. O painel fica em **cloud.linode.com**.

---

## Passo 2 — Criar o servidor

No painel, clique em **Create → Linode**. São cinco escolhas:

| Campo                    | O que escolher                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Choose a Distribution** | **Ubuntu 24.04 LTS** (é o sistema; LTS = versão de longa duração)                                            |
| **Region**                | Onde a máquina fica fisicamente. Regiões dos EUA (Dallas, Atlanta, Newark) costumam ser as mais baratas; São Paulo dá menos atraso no SSH, mas custa mais. O preço aparece na hora em que você seleciona. |
| **Linode Plan**           | Aba **Shared CPU → Nanode 1 GB** (1 CPU, 1 GB de RAM, 25 GB de disco) — o de **US$ 5/mês**                    |
| **Linode Label**          | Um apelido para você se achar depois, ex.: `bombstats`                                                        |
| **Root Password**         | **Anote esta senha.** É a senha de administrador do servidor — você vai usá-la para entrar.                    |

Deixe o resto como está e clique em **Create Linode**. Em cerca de um minuto o status muda de *Provisioning* para **Running**.

Na página do servidor, copie o **IP address** (algo como `172.105.10.20`). É o endereço da sua máquina.

<!-- captura: tela de criação com o plano Nanode 1 GB selecionado -->

> 💰 **Cobrança:** enquanto o servidor existir, ele é cobrado — mesmo desligado. Para parar de pagar, é preciso **excluir** (Delete) o Linode, não só desligar.

---

## Passo 3 — Entrar no servidor

Você tem três caminhos. Escolha **um**.

### a) Termius (mais fácil, tem para Windows, Mac, Android e iPhone)

1. Baixe em **[termius.com](https://termius.com/)** e crie uma conta gratuita.
2. **New Host** → em **Address** cole o IP do servidor → **Username:** `root` → **Password:** a senha que você anotou no Passo 2.
3. Salve e dê dois cliques no host para conectar.

### b) Terminal do seu computador

No **Windows**, abra o *PowerShell*; no **Mac/Linux**, o *Terminal*. Digite (trocando pelo seu IP):

```bash
ssh root@SEU_IP
```

Na primeira vez ele pergunta se confia na máquina — responda `yes` — e depois pede a senha. **A senha não aparece na tela enquanto você digita**, nem em asteriscos. Digite e dê Enter.

### c) Pelo próprio site da Linode

Na página do servidor, clique em **Launch LISH Console**. Abre um terminal dentro do navegador, sem instalar nada. Útil se algo der errado com o SSH.

Deu certo quando aparece algo assim:

```
root@localhost:~#
```

Daqui para frente, **tudo é copiar e colar nessa tela**.

---

## Passo 4 — Preparar a máquina

Um comando só, para atualizar o sistema e instalar o `screen` (que mantém programas rodando depois que você fecha o terminal):

```bash
apt update && apt upgrade -y && apt install -y screen
```

Pode demorar um ou dois minutos. Se ele perguntar algo sobre pacotes ou serviços, aceite o padrão pressionando Enter.

---

## Passo 5 — Instalar o BombStats

```bash
cd ~
curl -fsSL https://github.com/lucasvieceli/bombstats-releases/releases/latest/download/bombstats-server-linux-x64 -o bombstats-server && chmod +x bombstats-server
```

> 🖥️ Esse é o comando para servidores **x64**, que é o caso do Nanode da Linode. Se um dia usar um servidor **ARM** (Oracle Free Tier, Raspberry Pi), troque `x64` por `arm64` no fim do link.

---

## Passo 6 — Ligar o painel

```bash
screen -S bombstats ./bombstats-server
```

Na primeira vez ele pede uma **senha para o painel** — essa é a senha que você vai digitar no navegador (pode ser diferente da senha do servidor). Digite e dê Enter.

Em seguida ele mostra:

```
Bombstats — servidor  v0.1.8
----------------------------------------
Dados:  /root/.bombstats
Painel: http://localhost:8787
Túnel:  https://abc-xyz.trycloudflare.com
```

**Copie o endereço do "Túnel"** e abra no navegador do seu PC ou celular. Entre com a senha do painel e pronto — cadastre suas contas e acompanhe o farm, igual ao app de computador.

Agora **desanexe a sessão** para poder fechar o terminal sem matar o programa:

<kbd>Ctrl</kbd>+<kbd>A</kbd> e depois <kbd>D</kbd>

Pode fechar o Termius/terminal à vontade. O farm continua rodando.

> 🔗 O endereço do túnel **muda toda vez que o servidor reinicia**. Configure o Telegram nas contas: o BombStats manda o novo endereço sozinho quando volta, e você também pode pedir com o comando `/url`.

---

## Passo 7 — Deixar 24/7 de verdade (recomendado)

O `screen` já resolve o dia a dia, mas com o **systemd** o servidor volta sozinho se cair, se a máquina reiniciar ou depois de uma atualização. Vale os dois minutos.

Primeiro, encerre o que está rodando:

```bash
pkill -f bombstats-server
```

Crie o serviço (cole o bloco inteiro de uma vez, trocando `suaSenhaForte` pela senha do painel):

```bash
cat > /etc/systemd/system/bombstats.service <<'EOF'
[Unit]
Description=BombStats Server
After=network.target

[Service]
ExecStart=/root/bombstats-server
Restart=always
User=root
Environment=BOMBSTATS_PASSWORD=suaSenhaForte
Environment=BOMBSTATS_DATA=/root/.bombstats

[Install]
WantedBy=multi-user.target
EOF
```

Ligue:

```bash
systemctl daemon-reload
systemctl enable --now bombstats
```

Para ver os logs (e pegar o endereço do túnel):

```bash
journalctl -u bombstats -f
```

Saia dos logs com <kbd>Ctrl</kbd>+<kbd>C</kbd> — isso fecha só a exibição, não o servidor.

---

## Dia a dia

| O que você quer                | Comando                                                                    |
| ------------------------------ | -------------------------------------------------------------------------- |
| Ver os logs / pegar a URL      | `journalctl -u bombstats -f` (ou `screen -r bombstats`)                     |
| Parar o servidor               | `systemctl stop bombstats` (ou `pkill -f bombstats-server`)                 |
| Ligar de novo                  | `systemctl start bombstats` (ou `screen -S bombstats ./bombstats-server`)   |
| Esqueci a senha do painel      | `systemctl stop bombstats` e depois `~/bombstats-server recuperar`          |
| Ver memória e disco livres     | `free -h` e `df -h`                                                         |

**Atualizar:** não precisa de comando. Quando sai versão nova, aparece um aviso no topo do painel — clique em **"Reiniciar e atualizar"** e ele troca o binário sozinho, sem tocar nos seus dados.

---

## Perguntas comuns

**Quantas contas cabem no plano de US$ 5?**
Comece pelo Nanode 1 GB e acompanhe com `free -h`. Se a memória livre ficar baixa, dá para aumentar o plano em **Resize** no painel da Linode — a máquina reinicia e continua tudo como estava, sem reinstalar nada.

**Preciso abrir portas no firewall?**
Não. O painel sai por um túnel da Cloudflare, já com HTTPS. Deixe só o SSH aberto.

**Meus dados ficam onde?**
Tudo na pasta `~/.bombstats` (contas, segredos cifrados e configurações). Para fazer backup, copie a pasta inteira — inclusive o `secret.key`, sem ele os segredos não abrem.

**Como paro de pagar?**
Exclua o Linode no painel da Linode (**Delete**). Desligar não interrompe a cobrança. Faça o backup da pasta `~/.bombstats` antes.

**Fechei o terminal e o farm parou.**
Você rodou o servidor sem o `screen` e sem o `systemd`. Refaça o Passo 6 ou, melhor, o Passo 7.

---

Detalhes técnicos da versão servidor (variáveis de ambiente, modo de recuperação, como funciona a atualização) estão em **[SERVIDOR.md](./SERVIDOR.md)**.

<div align="center">
<sub>BombStats — projeto independente. Não afiliado à equipe oficial do BombCrypto.</sub>
</div>
