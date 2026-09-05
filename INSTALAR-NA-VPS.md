<div align="center">

# Botar o BombStats num servidor

**Para o farm rodar 24 horas por dia sem o seu computador ligado.**
Custa cerca de US$ 5 por mês e leva uns 20 minutos. Você acompanha tudo pelo navegador, no PC ou no celular.

</div>

---

## Leia isto antes de começar

Se você nunca mexeu com servidor, tudo bem: **este tutorial não pressupõe nada**. É clicar onde está escrito e colar os comandos que estão aqui. Não precisa entender o que cada comando faz.

**O que você vai precisar:**

- Um **cartão de crédito** (a Linode cobra em dólar, todo mês).
- Um **e-mail**.
- Uns **20 minutos** sem pressa.

**Três palavras que vão aparecer o tempo todo:**

| Palavra | O que é, em português claro |
| --- | --- |
| **Servidor** ou **VPS** | Um computador que fica ligado na internet o tempo todo, na casa de outra empresa. É ele que vai farmar para você. |
| **Terminal** | Uma tela preta onde você digita comandos em vez de clicar em botões. É assim que se manda coisas para o servidor. |
| **Linode** | A empresa que aluga esse computador. Hoje ela pertence à Akamai, então você vai ver os dois nomes pelo caminho. |

---

## O caminho todo, em 4 passos

Para você saber onde vai chegar:

1. **Criar a conta** na Linode.
2. **Criar o servidor** e **entrar nele**.
3. **Baixar o BombStats** lá dentro.
4. **Ligar** e abrir o painel no navegador.

Cada passo abaixo termina com um **✅ Deu certo se…** — só siga para o próximo quando aquilo aparecer na sua tela. Se não apareceu, a resposta está logo abaixo, no **❓ Se der errado**.

---

## Passo 1 — Criar a conta na Linode

⏱️ 5 minutos

1. Abra **[linode.com](https://www.linode.com/)** e clique no botão **Sign up** (fica no canto de cima, à direita).
2. Preencha **e-mail**, um **nome de usuário** e uma **senha**. (Ou clique em entrar com Google/GitHub, se preferir.)
3. Vá no seu e-mail e clique no link de confirmação que a Linode mandou. Se não achar, olhe a caixa de spam.
4. Agora ela vai pedir o **cartão**. É obrigatório — sem cartão a Linode não deixa criar servidor. O menu fica em **Billing** → **Add Payment Method**.
5. Pode aparecer uma verificação por **SMS ou telefone**. É normal, é só antifraude.

<!-- captura: tela de cadastro da Linode -->

**✅ Deu certo se:** você está dentro do painel, num site chamado **cloud.linode.com**, e vê um botão azul escrito **Create**.

**❓ Se der errado:**
- *"Não recebi o e-mail"* → cheque o spam e confira se digitou o e-mail certo; dá para pedir o reenvio na própria tela.
- *"Recusou meu cartão"* → alguns cartões pré-pagos e virtuais não passam. Tente outro cartão, de preferência um internacional comum.

> 💰 **Sobre a cobrança:** a Linode cobra por hora e fecha a conta uma vez por mês. Se você criar o servidor hoje e apagar daqui a três dias, paga só os três dias.

---

## Passo 2 — Criar o servidor

⏱️ 3 minutos

No painel, clique em **Create** e depois em **Linode**. Vai abrir uma página comprida com várias escolhas. **Você só precisa mexer em cinco delas** — o resto pode deixar exatamente como está.

**1. Choose a Distribution** (o sistema que vai rodar na máquina)
Escolha **Ubuntu 24.04 LTS**.

**2. Region** (em que lugar do mundo o computador vai ficar)
Escolha uma região dos **Estados Unidos** — `Dallas, TX`, `Atlanta, GA` ou `Newark, NJ`. São as mais baratas. São Paulo funciona também, mas costuma custar mais; o preço aparece na tela na hora em que você escolhe.

**3. Linode Plan** (o tamanho da máquina)
Clique na aba **Shared CPU** e escolha o **Nanode 1 GB** — é o de **US$ 5/mês**. É o primeiro da lista.

**4. Linode Label** (só um apelido, para você achar depois)
Escreva `bombstats`.

**5. Root Password** (a senha de administrador da máquina)
Invente uma senha forte e **anote num lugar seguro**. Você vai precisar dela daqui a dois minutos, e não tem "esqueci minha senha" aqui.

Agora role até o fim e clique em **Create Linode**.

<!-- captura: tela de criação com o plano Nanode 1 GB selecionado -->

A máquina leva cerca de um minuto para ficar pronta. Você vai ver escrito **Provisioning** e depois **Running**.

Quando ficar **Running**, procure na mesma página o **IP address** — são quatro números separados por pontos, tipo `172.105.10.20`. **Copie e anote também.** É o endereço da sua máquina na internet.

**✅ Deu certo se:** o status está **Running** e você anotou duas coisas: **a senha** e **o IP**.

**❓ Se der errado:**
- *"Não achei o Nanode 1 GB"* → confira se você está na aba **Shared CPU**. Nas outras abas (Dedicated, High Memory) não existe plano de US$ 5.
- *"Ficou em Provisioning e não sai"* → atualize a página do navegador.

> ⚠️ **Importante para não tomar susto na fatura:** enquanto o servidor **existir**, ele é cobrado — mesmo desligado. Para parar de pagar de verdade, é preciso **apagar** (Delete) o servidor, e não só desligar.

---

## Passo 3 — Entrar no servidor

⏱️ 5 minutos

Agora você vai abrir uma janela que "conversa" com o servidor. Escolha **um** dos caminhos abaixo — o (a) é o mais fácil se você nunca fez isso.

### (a) Termius — recomendado para quem está começando

O Termius é um programa que guarda o endereço e a senha do servidor para você, e funciona também no celular.

1. Baixe em **[termius.com](https://termius.com/)** e crie uma conta gratuita.
2. Clique em **New Host**.
3. Preencha só três campos:
   - **Address:** o IP que você anotou
   - **Username:** `root` (escreva exatamente assim, tudo minúsculo)
   - **Password:** a senha que você anotou
4. Salve e dê **dois cliques** no host que apareceu na lista.

### (b) Pelo terminal do seu próprio computador

- **Windows:** aperte a tecla Windows, digite `powershell` e abra o **Windows PowerShell**.
- **Mac:** aperte `Cmd + Espaço`, digite `terminal` e abra o **Terminal**.

Digite a linha abaixo, trocando `SEU_IP` pelo número que você anotou, e aperte **Enter**:

```
ssh root@SEU_IP
```

Na primeira vez ele pergunta se você confia nessa máquina e espera você escrever `yes` e apertar Enter. Depois ele pede a senha.

> ⚠️ **A senha não aparece enquanto você digita** — nem letras, nem bolinhas, nada. Parece que o teclado travou, mas não travou. Digite e aperte Enter normalmente.

### (c) Pelo próprio site da Linode (se os outros dois falharem)

Na página do seu servidor, clique em **Launch LISH Console**. Abre um terminal dentro do navegador, sem instalar nada.

**✅ Deu certo se:** apareceu uma linha parecida com esta, esperando você digitar:

```
root@localhost:~#
```

**❓ Se der errado:**
- *"Permission denied"* → a senha está errada. Volte na página do servidor na Linode, use **Reset Root Password** para definir uma nova, e tente de novo.
- *"Connection refused" ou fica tentando para sempre* → a máquina ainda não terminou de ligar. Espere um minuto e tente outra vez.
- *"Digito a senha e não aparece nada"* → é assim mesmo. Continue digitando e aperte Enter.

---

## Como usar essa tela preta

Só quatro coisas, e você já sabe tudo o que precisa:

1. **Um comando por vez.** Cole, aperte **Enter**, e espere terminar antes de colar o próximo.
2. **Como colar:** no Termius e no Mac, `Ctrl+V` / `Cmd+V`. No PowerShell do Windows, **clique com o botão direito** — ele cola sozinho.
3. **Cole o comando inteiro**, do começo ao fim, mesmo que ele seja gigante e apareça quebrado em várias linhas aqui na página. É uma linha só.
4. **Se aparecer um monte de texto passando**, está funcionando. Espere parar.

> 💡 Nesta página, cada comando tem um **botão de copiar** no canto direito quando você passa o mouse por cima. Use ele — assim não corre o risco de faltar um pedaço.

---

## Passo 4 — Instalar e ligar o BombStats

⏱️ 5 minutos

Você já está dentro do servidor. Agora são três comandos.

### 4.1 — Preparar a máquina

```bash
apt update && apt upgrade -y && apt install -y screen
```

Isso atualiza o sistema e instala o `screen`, um programinha que faz o BombStats continuar rodando depois que você fechar essa janela. Vai passar bastante texto na tela; é normal, pode demorar **1 ou 2 minutos**.

> Se em algum momento aparecer uma tela azul ou roxa perguntando sobre serviços/pacotes, é só apertar **Enter** para aceitar o que já está marcado.

### 4.2 — Baixar o BombStats

```bash
cd ~
```

```bash
curl -fsSL https://github.com/lucasvieceli/bombstats-releases/releases/latest/download/bombstats-server-linux-x64 -o bombstats-server && chmod +x bombstats-server
```

Esse segundo comando não mostra nada enquanto baixa — quando o `root@...#` voltar a aparecer, terminou.

### 4.3 — Ligar

```bash
screen -S bombstats ./bombstats-server
```

Na primeira vez, ele vai pedir uma **senha para o painel**. Essa é a senha que você vai digitar no navegador para entrar no BombStats — pode ser diferente da senha do servidor. Digite e aperte Enter.

Aí ele mostra algo assim:

```
Bombstats — servidor  v0.22.6
----------------------------------------
Dados:  /root/.bombstats
Painel: http://localhost:8787
Túnel:  https://abc-xyz.trycloudflare.com
```

**Copie o endereço que está na linha "Túnel"** (aquele que começa com `https://` e termina com `.trycloudflare.com`) e abra no navegador do seu computador ou do celular. Entre com a senha do painel — e pronto, é o BombStats, igualzinho ao do computador. Cadastre suas contas normalmente.

### 4.4 — Sair sem desligar

Falta uma coisinha, e é a mais importante: **se você simplesmente fechar a janela agora, o BombStats para junto.**

Para sair deixando ele ligado, aperte:

<kbd>Ctrl</kbd> + <kbd>A</kbd> e depois, soltando, a tecla <kbd>D</kbd>

A tela volta para o `root@...#`. Agora sim pode fechar tudo — o farm continua.

**✅ Deu certo se:** o painel abriu no navegador, você entrou com a senha, e depois de fechar a janela do terminal o painel continua funcionando.

**❓ Se der errado:**
- *"Não abriu no navegador"* → confira se copiou o endereço inteiro, incluindo o `https://`.
- *"command not found"* → você provavelmente não está na pasta certa. Rode `cd ~` e tente o comando de novo.
- *"Fechei a janela e parou"* → você esqueceu o `Ctrl+A` e depois `D`. Entre de novo no servidor e refaça o 4.3 e o 4.4.

> 🔗 **O endereço muda!** Toda vez que o servidor reinicia, sai um endereço `trycloudflare.com` novo. Para não ficar perdido: configure o **Telegram** nas suas contas dentro do painel — o BombStats manda o endereço novo sozinho toda vez que volta. Você também pode pedir a qualquer momento com o comando `/url` no Telegram.

---

## Pronto!

O BombStats está farmando 24 horas por dia, no servidor, sem depender do seu computador. Pode desligar o PC e ir dormir.

Daqui para a frente você só precisa da colinha abaixo — e, na maior parte dos dias, nem dela.

---

## Colinha do dia a dia

Guarde esta tabela. É tudo o que você vai precisar daqui para a frente.

| O que você quer fazer | O que digitar no servidor |
| --- | --- |
| Ver o que está acontecendo / achar o endereço do painel | `screen -r bombstats` |
| Sair de novo, deixando ligado | <kbd>Ctrl</kbd>+<kbd>A</kbd> e depois <kbd>D</kbd> |
| Desligar o BombStats | `pkill -f bombstats-server` |
| Ligar de novo | `cd ~` e depois `screen -S bombstats ./bombstats-server` |
| Ver quanta memória sobrou | `free -h` |
| Ver quanto espaço sobrou | `df -h` |

> ⚠️ Depois de entrar com o `screen -r bombstats`, **não feche a janela direto** — saia sempre com <kbd>Ctrl</kbd>+<kbd>A</kbd> e depois <kbd>D</kbd>, senão o BombStats para junto.

**Atualizar o BombStats:** não precisa de comando nenhum. Quando sai uma versão nova, aparece um aviso no topo do painel — clique em **"Reiniciar e atualizar"** e ele se atualiza sozinho, sem mexer nas suas contas.

---

## Perguntas que todo mundo faz

**Quantas contas cabem no plano de US$ 5?**
Depende de quantos heróis cada conta tem. Comece nele e, de vez em quando, rode `free -h` no servidor: se a memória livre estiver acabando, dá para aumentar o plano em **Resize**, no painel da Linode. A máquina reinicia e continua tudo como estava — não precisa reinstalar nada nem cadastrar as contas de novo.

**Esqueci a senha do painel. E agora?**
Entre no servidor e rode `pkill -f bombstats-server` e depois `~/bombstats-server recuperar`. Abre um menuzinho no terminal que troca a senha para você, passo a passo.

**Preciso liberar alguma porta, mexer em firewall?**
Não. O painel sai por um túnel seguro (é o tal do `trycloudflare.com`), já com cadeado. Não precisa configurar nada.

**Onde ficam meus dados? Como faço backup?**
Tudo numa pasta chamada `.bombstats`, dentro do servidor. Para guardar uma cópia, salve essa pasta inteira — inclusive o arquivo `secret.key`, porque sem ele os dados protegidos não abrem.

**É seguro deixar minhas contas num servidor?**
As senhas e chaves ficam guardadas cifradas, e o painel só abre com a sua senha. Use uma senha forte no painel e não passe o endereço do túnel para ninguém.

**Como eu cancelo e paro de pagar?**
No painel da Linode, abra o seu servidor e escolha **Delete**. Só desligar **não** interrompe a cobrança. Faça o backup da pasta `.bombstats` antes, porque apagar é definitivo.

**Fechei o terminal e o farm parou.**
Você saiu sem fazer o <kbd>Ctrl</kbd>+<kbd>A</kbd> e depois <kbd>D</kbd>. Entre no servidor de novo e refaça os passos 4.3 e 4.4.

---

## Ainda travou?

Chame no **[Discord da comunidade](https://discord.gg/FcrKrY3sTy)** dizendo em qual passo você parou e o que apareceu na tela. Se puder, mande um print — resolve muito mais rápido.

---

Quem quiser os detalhes técnicos da versão servidor (variáveis de ambiente, modo de recuperação, como funciona a atualização) encontra tudo em **[SERVIDOR.md](./SERVIDOR.md)**.

<div align="center">
<sub>BombStats — projeto independente. Não afiliado à equipe oficial do BombCrypto.</sub>
</div>
