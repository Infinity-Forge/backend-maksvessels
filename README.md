![Node](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black) ![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=MySQL&logoColor=white) ![dbeaver](https://img.shields.io/badge/DBeaver-382923.svg?style=for-the-badge&logo=DBeaver&logoColor=white) ![wasp](https://img.shields.io/badge/Warp-01A4FF.svg?style=for-the-badge&logo=Warp&logoColor=white) ![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-4000BF.svg?style=for-the-badge&logo=Insomnia&logoColor=white) ![gitkraken](https://img.shields.io/badge/GitKraken-179287.svg?style=for-the-badge&logo=GitKraken&logoColor=white) ![git](https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white)

## INSTALAÇÃO IDE DO VSCODE
Para instalação do VSCode acesse o site [Visual Studio Code](https://code.visualstudio.com/docs), para facilitar o andamento do projeto é possível instalar no VS Code algumas extenções como: 
- Auto Close Tag;
- Auto Complete Tag;
- Auto Rename Tag;
- Code Runner; 
- IntelliCode;
- Path Intellisense;
- npm Intellisense;
- ESLint;
- Git Grraph;
- Git Lens;
- Git History.
Para saber mais sobre a função de cada uma das extensões ou como instalar acesse [Extension Marketplace](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace).

## INSOMNIA REST CLIENT
O Insomnia REST Client é uma ferramenta popular para testar e desenvolver APIs, oferecendo várias vantagens para desenvolvedores. Baixe o arquivo executavél de [Insomnia REST Client](https://insomnia.rest/) e importe o pacote de de extensão `consulta-Insomnia.yaml` que está na pasta "Arquivos de Configuração".

## NODEJS
Para instalação do NodeJS acesse [Documentação NodeJS](https://nodejs.org/pt/download).

## CONEXÃO MYSQL
Passos de como estabelecer a conexão com o banco de dados MySQL. Para instalação do MySQL acesse [Documentação MySQL](https://dev.mysql.com/doc/). Caso esteja utilizando o Windows é nescessário defini a variável do ambiente:
1. Copie o caminho da pasta `.\MySQL Server 8.0\bin`, exemplo:
`C:\Program Files\MySQL\MySQL Server 8.0\bin`
2. Acesse no Windows as Variáveis do Ambiente.
3. Variáveis do Ambiente > aba Avançado > Variáveis do Ambiente
4. Selecione `Path` e adicione o caminho `C:\Program Files\MySQL\MySQL Shell 8.0\bin\`.

Para rodar o banco de dados e visualizar o que foi inserido a dica são dois programas o [Workbanch MySQL](https://www.mysql.com/products/workbench/) que é instalado junto com o MySQL ou o [DBeaver Community](https://dbeaver.io/) caso esteja usando Linux.

### COMANDOS BÁSICOS
1. Acessar o MySQL:
`mysql -u root -p;`
2. Ver lista dos bancos de dados:
`show databases;`
 3. Criar banco de dados:
`create database NOME_BD;`
4. Excluir banco de dados:
`drop  database NOME_BD;` 
5. Utilizar banco:
`use NOME_BD;` 
6. Mostrar todas tabelas
`show tables;`

Acessar banco de dados e visualizar tabelas
Mostrar banco de dados, acessá-lo e ver todas tabelas:
```sql
SHOW DATABASES;
use NOME_BD; 
SHOW TABLES;
```

## PROJETO TCC
1. Alterar os dados da conexão do MySQL acessando `.\api-node-js\.env`;
2. Após inserir dados da conexão abra o terminal dentro da pasta `.\api-node-js`;
2.1 Rode o projeto utilizando o comando `npm rum dev`;
2.2 Caso problema cheque se o NPM, MySQL e o ENV e demais dependências estão instaladas.
3. Acesse pelo navegador o projeto localmente `localhost:3333`

## PROJETO NO GITHUB
Projeto rodando em localhost no repositório [site-tcc-localhost](https://github.com/ViniciusDadalte/site-tcc-localhost) no GitHub do desenvolvedor [Vinícius Gabriel](https://github.com/ViniciusDadalte). Caso não tenha o Git instalado veja na [Documentação do Git]() como instalar na sua máquina, caso queira usar uma CLI dica é [GitKraken](), [Tortoise Git](https://tortoisegit.org/) ou utilizar as extensões do VS Code. 
Dúvidas sobre comandos Git acesse [Lista de comandos úteis do Git](https://gist.github.com/leocomelli/2545add34e4fec21ec16)

### Inserindo usuário e senha do Github:
1. Acessar o GitHub pelo terminal Git:
	1.1 Determinar usuário:
	`git config --global user.name "Nome do Usuário"`
	1.2 Determinar o email do usuário:
	`git config --global user.email email@email.com.br`
	
### Clonar o Repositório
1. Criar nova pasta:
`mkdir pasta-do-projeto`
2. Entrar na pasta:
`cd pasta-do-projeto`
3. Clonar um repositório para a máquina em uso:
`git clone https://github.com/nome-do-usuário/nome-do-repositório.git`

### Criar um Novo Repositório via Terminal 
1. Criar um arquivo Markdown que será o readme do repositório:
`echo "# Readme do Repositório" >> README.md`
2. Cria um novo repositório:
`git init`
3. Adicionar o arquivo, no caso o readme:
`git add README.md`
4. Efetuar um commit:
`git commit -m "first commit"`
5. Definir a branch master:
`git branch -M master`
6. Adiciona no repositório remoto:
`git remote add origin https://github.com/mayannaoliveira/Nome-Repositório.git`
7. O primeiro envio do repositório deve ser feito na branch main:
`git push -u origin main`
	
### Envio do Repositório pelo Terminal
1. Caso seja o primeiro envio deve inserir o nome do repositório:
`git remote add origin https://github.com/nome-do-usuário/nome-do-repositório.git`
2. Cajo não seja o primeiro commit e queira enviar todos os arquivos locais para o Github estão:
`git add .`
3. Seleção da branch que será utilizada:
`git branch -M nome-da-branch`
4. Subir os arquivos para GitHub:
`git push -u origin main`
	4.1 Caso queira usar outra branch, leia a parte de como criar branch.

### Criar nova branch
1. Atualize o repositório local que a branch principal é main:
`git pull origin main`  
2. Criar nova branch:
`git checkout -b nome-da-nova-branch`
3. Listar todas as branches locais:
`git branch`
4. Listar todas as branches remotas:
`git branch -r`
5. Listar branches locais e remotas:
`git branch -a`
6. Mudar para branch "exemplo":
`git checkout main  # ou git checkout exemplo

### Atualizar repositório local
**Opção 1:** 
Utilizar o comando `git pull` (fetch + merge automático):
`git pull origin main`  Substitua "main" pela sua branch. 
- Esse comando baixa as alterações (`fetch`) e **mescla (merge)** automaticamente com sua branch local.  

 **Opção 2:** 
 Utilizar o comando `git pull --rebase` (recomendado para evitar merges desnecessários):
`git pull --rebase origin main`
- Reaplica suas alterações locais **em cima** das alterações remotas, mantendo o histórico linear.

### Comandos Pull vs. Push
**`git pull`** ➔ **Baixar alterações** (do remoto para o local)  
- **O que faz?**  
  - Puxa as alterações mais recentes do repositório remoto (ex: GitHub/GitLab) e **mescla (merge)** com sua branch local.  
  - Equivalente a executar:  
    ```bash
    git fetch origin  # baixa as alterações
    git merge origin/nome-da-branch  # mescla com sua branch
    ```

- **Quando usar?**  
  - Quando você quer atualizar seu repositório local com as mudanças do time.  
  - Exemplo:  
    ```bash
    git pull origin main
    ```

### **`git push`** ➔ **Enviar alterações** (do local para o remoto)  
- **O que faz?**  
  - Envia seus commits locais para o repositório remoto.  
  - **Atenção:** Se a branch remota tiver alterações que você não possui localmente, o Git bloqueará o `push`. Nesse caso, faça um `git pull` primeiro.

- **Quando usar?**  
  - Quando você quer compartilhar suas alterações com o time.  
  - Exemplo:  
    ```bash
    git push origin minha-branch
    ```
### Fluxo típico de trabalho  

1. Você faz alterações locais:  
   ```bash
   git add .
   git commit -m "Minha alteração"
   ```  
2. **Antes de enviar**, sempre atualize seu local:  
   ```bash
   git pull origin main  # evita conflitos
   ```  
3. Envie suas alterações:  
   ```bash
   git push origin minha-branch
   ```  

### Verificar histórico de commit
**Opção 1:** Log colorido básico (uma linha por commit):
`git log --oneline --graph --decorate --all --color`
- **`--oneline`**: Mostra cada commit em uma linha.
- **`--graph`**: Exibe o histórico em formato de grafo (útil para branches).
- **`--decorate`**: Mostra referências (branches, tags) associadas aos commits.
- **`--all`**: Inclui todas as branches.
- **`--color`**: Ativa cores.

**Opção 2:**
Log detalhado com cores (autor, data e mensagem)
`git log --graph --pretty=format:'%C(yellow)%h %C(blue)%ad %C(auto)%d %Creset%s' --date=short`
- **`%h`**: Hash abreviado do commit.
- **`%ad`**: Data do commit (formatada por `--date=short`).
- **`%d`**: Referências (branches/tags).
- **`%s`**: Mensagem do commit.
- **Cores**: `%C(yellow)`, `%C(blue)`, etc.

**Opção 3:**
Log com diff colorido (alterações em cada commit):
`git log --patch --color`
- **`--patch`**: Mostra as alterações (diffs) em cada commit.

### Criar Gitignore
Dentro do repositório podemos criar um arquivo chamado `.gitignore` onde iremos inserir a extensão dos arquivos a serem ignorados.
1. Criar arquivo na raíz do projeto com nome `.gitignore`.
2. Inserir aa extensão do que deve ser ignorado ao enviar repositório para o GitHub:
```
# Arquivos de configuração local
# .env
# *.local

# Arquivos de IDE
.idea/
.vscode/
*.swp

# Logs e debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Sistema
.DS_Store
```

## COLABORADORES

Repositórios com o projeto em andamento:

| **Nome** | **Repositório** |
|:---:|:---:|
| Vinícius Gabriel | [![colega-nome](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/ViniciusDadalte/site-tcc-localhost) |
| Evandro Orso| [![colega-nome](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/EvandroOrso) |

A lista de todos os colaborados estão no arquivo [CONTRIBUTING.md](.\CONTRIBUTING.md`).
