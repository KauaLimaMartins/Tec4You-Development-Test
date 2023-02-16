import { Auth } from "aws-amplify";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BackButton } from "../components/BackButton";
import { SimpleButton } from "../components/SimpleButton";
import { SimpleInput } from "../components/SimpleInput";
import { Spinner } from "../components/Spinner";
import { authenticatedUser } from "../utils/authenticatedUser";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn({
        username,
        password,
      });

      router.push('/dashboard');
    } catch (err) {
      let errorMessage = "";
      
      // It is needed because the aws-amplify doesn't have a typescript type for handle errors
      // @ts-ignore
      switch (err.message) {
        case "User does not exist.":
          errorMessage = "Email não cadastrado";
          break;

        case "Incorrect username or password.":
          errorMessage = "Email ou senha incorretos";
          break;

        default:
          errorMessage = "Erro ao fazer login";
      }

      toast.error(errorMessage);
    }

    setIsLoading(false);
  }, [username, password]);

  return (
    <>
      <Head>
        <title>COVIDANDO | Login</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="h-screen">
        <BackButton />

        <div className="h-full p-6 text-gray-800">
          <div className="h-full w-full flex items-center justify-center flex-col lg:flex-row">
            <img
              src="/svg/login-illustration.svg"
              className="w-96 md:mr-16"
              alt="Login illustration"
            />
            <form onSubmit={handleSignIn} className="w-auto text-center mt-12 lg:text-left lg:mt-0">
              <h2 className="text-center lg:text-left text-3xl mb-6 capitalize font-medium">
                Fazer login
              </h2>

              <div className="mb-4">
                <SimpleInput
                  placeholder="E-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                />
              </div>

              <div className="mb-6">
                <SimpleInput
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>

              <div className="text-center lg:text-left">
                <SimpleButton disabled={isLoading} type="submit">
                  {
                    isLoading ? (
                      <Spinner className="w-5 h-5 mx-5 text-white animate-spin fill-indigo-600" />
                    ) : "Entrar"
                  }
                </SimpleButton>

                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Não tem uma conta?{" "}
                  <Link
                    href="/register"
                    className="text-indigo-600 hover:text-violet-600 transition duration-300"
                  >
                    Registrar-se
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserAuthenticated = await authenticatedUser(ctx);

  if (!isUserAuthenticated) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
