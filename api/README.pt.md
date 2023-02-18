*Leia em [inglês](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/api/README.md)*

# Backend

Esse backend contém uma API REST que pesquisa por casos de covid e salva em cache para servir os dados para o frontend

<br />

## Sumário

- [Tecnologias usadas no backend](#tecnologias-usadas-no-backend)
- [Como rodar a API](#como-rodar-a-api)
- [Testando a API](#testando-a-api)

<br />

## Tecnologias usadas no backend

[NodeJS](https://nodejs.org/) com [NestJS](https://docs.nestjs.com/) para criar a API

[Redis](https://redis.io/) para salvar no cache e o pacote [Cache Manager](https://www.npmjs.com/package/cache-manager) que é usado na [documentação de cache do NestJS](https://docs.nestjs.com/techniques/caching)

[Covid 19 statistics API](https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/) para pegar as estatisticas da covid 19

[Docker](https://www.docker.com/) para rodar o servidor do [Redis](https://redis.io/)

[Swagger](https://swagger.io/) para documentar a API

[Jest](https://jestjs.io/pt-BR/) para testes automatizados

<br />

## Como rodar a API

Antes de tudo, você precisa ter o [Docker](https://www.docker.com/) instalado na sua máquina

<br />

1 - Clone o repositório:
```bash
git clone https://github.com/KauaLimaMartins/Tec4You-Development-Test.git
```

<br />

2 - Abra a pastado reposirório em um terminal e entre na pasta api:
```bash
cd api
```

<br />

3 - Instale todas as dependências:
```bash
npm install
```
ou
```bash
yarn install
```

<br />

4 - Renomeie o arquivo .env.example para .env:
```bash
mv .env.example .env
```

<br />

5 - Abra o arquivo .env e adicione a sua chave do RapidAPI para a variavel de ambiente RAPIDAPI_KEY

<br />

6 - Rode o comando do docker compose:
```bashapi
docker compose up -d
```
ou
```bash
docker-compose up -d
```

<br />

7 - Rode o comando para iniciar a api:
```bash
npm run start:dev
```
ou
```bash
yarn start:dev
```

<br />

Agora você pode acessar a api em: http://localhost:8000/

Você também pode acessar a documentação da api em: http://localhost:8000/api

<br />

## Testando a API

Você pode testar a API rodando:
```bash
npm run test
```
ou
```bash
yarn test
```