import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';

import type { AppProps } from "next/app";
import { Amplify, withSSRContext } from "aws-amplify";
import awsconfig from "../aws-exports";

try {
  Amplify.configure({...awsconfig, ssr: true});
  
  const { Auth } = withSSRContext();
  
  Auth.configure({
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    mandatorySignIn: false,
    cookieStorage: {
      domain: 'localhost',
      secure: false,
      path: '/',
      expires: 2,
    },
  })
} catch (err) {
  console.log("Error to connect to amplify");
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
