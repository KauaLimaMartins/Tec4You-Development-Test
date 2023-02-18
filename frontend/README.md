*Read this in [portuguese](https://github.com/KauaLimaMartins/Digital-Republic-Code-Challenge/blob/master/frontend/README.pt.md)*

<br />

# Frontend

This frontend is a website with authentication which shows the statistics coming from the API

<br />

## Summary

- [Technologies used in the frontend](#technologies-used-in-the-frontend)
- [How to run the Website](#how-to-run-the-website)
- [Testing the Website](#testing-the-website)

<br />

# Technologies used in the frontend

[ReactJS](https://reactjs.org/) with [NextJS](https://nextjs.org/) to create the Website

[Tailwind CSS](https://tailwindcss.com/) to style the website

[AWS Amplify](https://docs.amplify.aws/) with [AWS Cognito](https://aws.amazon.com/pt/cognito/) to do the authentication flow

[Axios](https://axios-http.com/ptbr/docs/intro) to call the API

[NextJS SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to run some tasks on the server side

[Jest](https://jestjs.io/pt-BR/) for automated testing

<br />

## How to run the website

1 - Clone the repository:
```bash
git clone https://github.com/KauaLimaMartins/Tec4You-Development-Test.git
```

<br />

2 - Open the repository folder in a terminal and enter the frontend folder:
```bash
cd frontend
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

5 - Install [AWS Amplify Node.js CLI](https://github.com/aws-amplify/amplify-cli):
```bash
sudo npm install -g @aws-amplify/cli
```

6 - Configure the CLI:
```bash
amplify configure
```

Just follow the steps that appear, it's very simple

<br />

7 - Init the Amplify:
```bash
amplify init
```

Follow the steps below:

<br />

7.1 - Enter a name for the project

7.2 - In *"Initialize the project with the above configuration"* press *"Y"*

7.3 - In *"Select the authentication method you want to use"* select *"AWS Profile"* and select the AWS Profile that you created on the step 5 and wait it ends

7.4 - In *"Help improve Amplify CLI by sharing..."* press *"Y"*

<br />

8 - Add auth module to amplify
```bash
amplify add auth
```

Follow the steps below:

8.1 - In *"Do you want to use the default authentication..."* select *"Default configuration"*

8.2 - In *"How do you want users to be able to sign in"* select *"Email"*

8.3 - In *"Do you want to configure advanced settings"* select *"No, I am done"* and wait it finish

<br />

9 - Push the auth configuration to Amplify:
```bash
amplify push
```

Follow the steps below:

9.1 - In *"Are you sure you want to continue"* press *"Y"* and wait it finish, it may take a few minutes

<br />

10 - Run the Website:
```bash
npm run dev
```
or
```bash
yarn dev
```

Now you can access the Website in http://localhost:3000/

<br />

## Testing the Website

You can test the Website by running:
```bash
npm run test
```
or
```bash
yarn test
```
