import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { HomeHeader } from "../components/HomeHeader";
import { SimpleButton } from "../components/SimpleButton";
import { authenticatedUser } from "../utils/authenticatedUser";

interface HomePageProps {
  isUserAuthenticated: boolean;
}

export default function HomePage({ isUserAuthenticated }: HomePageProps) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>COVIDANDO | Início</title>
        <link rel="icon" href="/covidando-logo-blue.png" />
      </Head>

      <HomeHeader isAuthenticated={isUserAuthenticated} />
      <main className="p-6 mt-6">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <img
            src="/svg/home-illustration.svg"
            alt="Illustration"
            className="h-80"
          />

          <div className="text-center mt-6 lg:text-left lg:ml-8 lg:mt-0 lg:w-2/5">
            <h1 className="font-bold text-2xl sm:text-3xl">Relatórios de casos da COVID 19</h1>
            <p className="mt-1 text-md sm:text-lg">Tenha acesso aos casos de coronavirus no mundo e filtre por data e país!</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {
            isUserAuthenticated ? (
                <SimpleButton
                  type="button"
                  handleClick={() => {
                    router.push('/dashboard');
                  }}
                >
                  Ir para o dashboard
                </SimpleButton>
            ) : (
              <>
                <SimpleButton
                  type="button"
                  handleClick={() => {
                    router.push('/login');
                  }}
                >
                  Fazer login
                </SimpleButton>

                <SimpleButton
                  type="button"
                  handleClick={() => {
                    router.push('/register');
                  }}
                >
                  Criar conta
                </SimpleButton>
              </>
            )
          }
        </div>
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

