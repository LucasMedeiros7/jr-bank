<img width="330" height="220" src="https://uploaddeimagens.com.br/images/004/075/323/full/WhatsApp_Image_2022-10-24_at_23.21.15.png?1666664874" alt="Jr Bank" align="right" />

# JR Bank 🏦

### O JR Bank é uma API de transferências entre contas internas de um banco digital. 🪙💸🪙

![Badge](https://img.shields.io/badge/STATUS-EM%20ANDAMENTO-red)

## Motivação e objetivos 🏋️‍♂️🎯

- Aprender typescript.
- Entender mais sobre arquitetura e padrões de projetos.
- Praticar conhecimentos de Programação orientada a objetos.
- Colocar em prática os princípios SOLID.
- Colocar em prática o TDD.
- Implementação de testes automatizados.
- Trabalhar com o ORM prisma.
- Autenticação utilizando jsonWebToken

<br/>

## Tecnologias utilizadas 🛠️🧑‍💻

<a href="https://nodejs.org/en/" target="_blank">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="https://www.typescriptlang.org/" target="_blank">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="https://jestjs.io/pt-BR/" target="_blank">![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)</a>
<a href="https://www.prisma.io/" target="_blank">
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)</a>
<a href="https://www.sqlite.org/index.html" target="_blank">![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)</a>

## Como rodar o projeto 🎡👨‍💻

<br/>

### É necessário ter o [Git](https://git-scm.com/downloads) e a versão LTS do [NodeJS](https://nodejs.org/) instalados.

```bash
# Faça um clone do projeto
git clone git@github.com:LucasMedeiros7/jr-bank.git

# Entre na pasta do projeto
cd jr-bank

# Instale as dependências do projeto
npm install


# Rode a aplicação e acesse as rotas em http://localhost:3333
npm run dev
```

### Utilize o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/) para acessar as rotas do projetos.

<br/>

## Rotas disponíveis


#### POST `/accounts`

Criar uma nova conta

#### Conteúdo que deve ser passado no corpo da requisição para a criação de uma nova conta

```json
{
  "name": "Papadopoulos",
  "cpf": "532.780.780-04",
  "password": "senhasegura123"
}
```

#### GET `/accounts`

Listagem de todas as contas cadastradas no JR

#### GET `/accounts/{account_id}/balance`

Rota para consultar o saldo da conta pelo ID da conta

#### POST `/login`

Rota de login

##### Login request payload example

```json
{
  "cpf": "79503460000",
  "password": "vascodagama"
}
```

#### POST `/transfers`

Criar uma nova transferência (Necessário que seja passado o token do usuário)

##### Create transfer payload example

```json
Content-type: application/json
authorization: Bearer <TOKEN JWT>

{
    "account_destination_id": "438e4746-fb04-4339-bd09-6cba20561835",
    "amount": 500 // Os valores são representados em centavos para não ocorrer erros de arredondamento
}
```

#### GET `/transfers`

Rota para listar todas as tranferências feitas
