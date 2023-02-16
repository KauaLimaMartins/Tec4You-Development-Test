import { GetServerSideProps } from "next";
import Head from "next/head";

import { HomeHeader } from "../components/HomeHeader";
import { authenticatedUser } from "../utils/authenticatedUser";

interface HomePageProps {
  isUserAuthenticated: boolean;
}

export default function HomePage({ isUserAuthenticated }: HomePageProps) {
  return (
    <>
      <Head>
        <title>COVIDANDO | Início</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeHeader isAuthenticated={isUserAuthenticated} />
      <main>
        <h1>Início</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserAuthenticated = await authenticatedUser(ctx);

  return {
    props: {
      isUserAuthenticated,
    }
  }
}

