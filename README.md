Projeto TCC localhost

![Node](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=MySQL&logoColor=white)
![VS Code Insiders](https://img.shields.io/badge/Microsoft%VS%20Code-35b393.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![dbeaver](https://img.shields.io/badge/DBeaver-382923.svg?style=for-the-badge&logo=DBeaver&logoColor=white)
![wasp](https://img.shields.io/badge/Warp-01A4FF.svg?style=for-the-badge&logo=Warp&logoColor=white)

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
O Insomnia REST Client é uma ferramenta popular para testar e desenvolver APIs, oferecendo várias vantagens para desenvolvedores. Baixe o arquivo executavél de [Insomnia REST Client](https://insomnia.rest/) e importe o pacote de de extensão `consulta.yaml`.

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
