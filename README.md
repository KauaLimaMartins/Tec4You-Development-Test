<h3 align="center">
  <img src="./frontend/public/covidando-logo-blue.png" width="200" height="200" />

  <p style="font-size: 20px; font-weight: bold">COVIDANDO</p>
</h3>

<br />

*Read this in [portuguese](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/README.pt.md)*

<br />

Covidando is an application to view and filter COVID 19 statistics


[Click here to access the Covidando website](https://master.dkns4bwsivz.amplifyapp.com/) 

<br />

## Sumary

- [Backend](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/api/README.md)

- [Frontend](https://github.com/KauaLimaMartins/Tec4You-Development-Test/blob/master/frontend/README.md)

- [Cloud and Deploy](#cloud-and-deploy)

---

# Cloud and Deploy

All the cloud and deploy part were done on AWS

## AWS services used

[Amplify](https://aws.amazon.com/pt/amplify/) to deploy the website

[Amplify](https://aws.amazon.com/pt/amplify/) with [Cognito](https://aws.amazon.com/pt/cognito/) to make the authentication flow

[EC2](https://aws.amazon.com/pt/ec2/) with [ELB](https://aws.amazon.com/pt/elasticloadbalancing/) and [Auto Scaling](https://aws.amazon.com/pt/autoscaling/) to create an instance and deploy API and Redis with Docker

[Route 53](https://aws.amazon.com/pt/route53/) with [Cerfiicate Manager](https://aws.amazon.com/pt/certificate-manager/) to attach an HTTPS domain to the EC2 instance of the API

