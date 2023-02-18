<h3 align="center">
  <img src="./frontend/public/covidando-logo-blue.png" width="200" height="200" />

  <p style="font-size: 20px; font-weight: bold">COVIDANDO</p>
</h3>

<br />

*Leia em [inglês](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/README.md)*

<br />

Covidando é uma aplicação para visualizar e filtrar estatísticas da COVID 19

[Clique aqui para acessar o site da Covidando](https://master.dkns4bwsivz.amplifyapp.com/) 

<br />

## Sumário

- [Backend](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/api/README.pt.md)

- [Frontend](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/frontend/README.pt.md)

- [Cloud e Deploy](#cloud-e-deploy)

---

# Cloud and Deploy

Todas as partes de Cloud e Deploy foram feitas na AWS 

## Serviços da AWS utilizados

[Amplify](https://aws.amazon.com/pt/amplify/) para fazer deploy do site

[Amplify](https://aws.amazon.com/pt/amplify/) com [Cognito](https://aws.amazon.com/pt/cognito/) para fazer o fluxo de autenticação

[EC2](https://aws.amazon.com/pt/ec2/) com [ELB](https://aws.amazon.com/pt/elasticloadbalancing/) e [Auto Scaling](https://aws.amazon.com/pt/autoscaling/) para criar uma instância e fazer deploy da API e do Redis com Docker

[Route 53](https://aws.amazon.com/pt/route53/) com [Cerfiicate Manager](https://aws.amazon.com/pt/certificate-manager/) para anexar um domínio HTTPS na instância da API no EC2

