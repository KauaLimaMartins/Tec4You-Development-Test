*Read this in [portuguese](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/api/README.pt.md)*

# Backend

this backend contains a REST API that searches for cases of covid and saves in the cache to provide the data to the frontend

<br />

## Summary

- [Technologies used in the backend](#technologies-used-in-the-backend)
- [How to run the API](#how-to-run-the-api)
- [Testing the API](#testing-the-api)

<br />

## Technologies used in the backend

[NodeJS](https://nodejs.org/) with [NestJS](https://docs.nestjs.com/) to create the API

[Redis](https://redis.io/) to save in cache and [Cache Manager](https://www.npmjs.com/package/cache-manager) package which is used in the [NestJS caching documentation](https://docs.nestjs.com/techniques/caching)

[Covid 19 statistics API](https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/) to get the statistics of covid 19

[Docker](https://www.docker.com/) to run the [Redis](https://redis.io/) Server

[Swagger](https://swagger.io/) to document the API

[Jest](https://jestjs.io/pt-BR/) for automated testing

<br />

## How to run the API

First of all, you need to have [Docker](https://www.docker.com/) installed on your machine

<br />

1 - Clone the repository:
```bash
git clone https://github.com/KauaLimaMartins/Tec4You-Development-Test.git
```

<br />

2 - Open the repository folder in a terminal and enter the api folder:
```bash
cd api
```

<br />

3 - Install all dependencies:
```bash
npm install
```
or
```bash
yarn install
```

<br />

4 - Rename the .env.example file to .env:
```bash
mv .env.example .env
```

<br />

5 - Open the .env file and add your RapidAPI key to RAPIDAPI_KEY environment variable

<br />

6 - Run the docker compose command:
```bashapi
docker compose up -d
```
or
```bash
docker-compose up -d
```

<br />

7 - Run the api start command:
```bash
npm run start:dev
```
or
```bash
yarn start:dev
```

<br />

Now you can access the API by calling: http://localhost:8000/

You can also access the api documentation in: http://localhost:8000/api

<br />

## Testing the API

You can test the API by running:
```bash
npm run test
```
or
```bash
yarn test
```