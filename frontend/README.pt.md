*Leia em [inglês](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/frontend/README.md)*

<br />

# Frontend

Esse frontend é um site com autenticação que mostra as estatísticas vindas da API
<br />

## Sumário

- [Tecnologias usadas no frontend](#tecnologias-usadas-no-frontend)
- [Como rodar o site](#como-rodar-o-site)
- [Testando o site](#testando-o-site)

<br />

# Tecnologias usadas no frontend

[ReactJS](https://reactjs.org/) com [NextJS](https://nextjs.org/) para criar o site

[Tailwind CSS](https://tailwindcss.com/) para estilizar o site

[AWS Amplify](https://docs.amplify.aws/) com [AWS Cognito](https://aws.amazon.com/pt/cognito/) para fazer o fluxo de autenticação

[Axios](https://axios-http.com/ptbr/docs/intro) para chamar a API

[NextJS SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) para rodar algumas tasks no lado do servidor

[Jest](https://jestjs.io/pt-BR/) para os testes automatizados

<br />

## Como rodar o site

1 - Clone o repositório:
```bash
git clone https://github.com/KauaLimaMartins/Tec4You-Development-Test.git
```

<br />

2 - Abra o projeto em um terminal e entre na pasta frontent:
```bash
cd frontend
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

5 - Instale a [CLI do AWS Amplify para Node.js](https://github.com/aws-amplify/amplify-cli):
```bash
sudo npm install -g @aws-amplify/cli
```

<br />

6 - Configure a CLI:
```bash
amplify configure
```

Apenas siga os passos que aparecerem, é bem simples

<br />

7 - Inicie o Amplify:
```bash
amplify init
```

Siga os passos a baixo:

<br />

7.1 - Coloque um nome para o projeto

7.2 - Em *"Initialize the project with the above configuration"* pressione *"Y"*

7.3 - Em *"Select the authentication method you want to use"* selecione *"AWS Profile"* e selecione o perfil da AWS que voce criou no passo 5 e espere ele terminar

7.4 - Em *"Help improve Amplify CLI by sharing..."* pressione *"Y"*

<br />

8 - adicione o modulo auth para o Amplify
```bash
amplify add auth
```

Siga os passos a baixo:

8.1 - Em *"Do you want to use the default authentication..."* selecione *"Default configuration"*

8.2 - Em *"How do you want users to be able to sign in"* selecione *"Email"*

8.3 - Em *"Do you want to configure advanced settings"* selecione *"No, I am done"* e aguarde ele terminar

<br />

9 - Envie a configuração de autenticação para o Amplify:
```bash
amplify push
```

Siga os passos a baixo:

9.1 - Em *"Are you sure you want to continue"* pressione *"Y"* e aguarde ele terminar, pode demorar alguns minutos

<br />

10 - Rode o site:
```bash
npm run dev
```
ou
```bash
yarn dev
```

Agora você consegue acessar o site em http://localhost:3000/

<br />

## Testando o site

Você pode testar o site rodando o seguinte comando:
```bash
npm run test
```
ou
```bash
yarn test
```
