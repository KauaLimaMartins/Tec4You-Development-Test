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

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signUp({
        username,
        password,
        autoSignIn: {
          enabled: true,
        },
      });
      
      router.push(`/confirm-account?username=${encodeURIComponent(username)}`);
    } catch (err) {
      let errorMessage = "";
      
      // It is needed because the aws-amplify doesn't have a typescript type for handle errors
      // @ts-ignore
      switch (err.message) {
        case "Password did not conform with policy: Password not long enough":
          errorMessage = "A senha precisa conter 8 caracteres ou mais";
          break;

        case "An account with the given email already exists.":
          errorMessage = "Esse email já foi cadastrado ";
          break;

        default:
          errorMessage = "Erro ao criar conta";
      }

      toast.error(errorMessage);
    }

    setIsLoading(false);
  }, [username, password]);

  return (
    <>
      <Head>
        <title>COVIDANDO | Registro</title>
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
              src="/svg/register-illustration.svg"
              className="w-96 md:mr-16"
              alt="Register illustration"
            />
            <form onSubmit={handleSignUp} className="w-auto text-center mt-12 lg:text-left lg:mt-0">
              <h2 className="text-3xl mb-4 font-medium">Criar conta</h2>
              <p className="mb-6">Digite um endereço de email válido<br />senão não será possivel verificar sua conta</p>

              <div className="mb-4">
                <SimpleInput
                  placeholder="Email"
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
                <SimpleButton type="submit" disabled={isLoading}>
                  {
                    isLoading ? (
                      <Spinner className="w-5 h-5 mx-11 text-white animate-spin fill-indigo-600" />
                    ) : "Criar conta"
                  }
                </SimpleButton>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Já tem uma conta?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-violet-600 transition duration-300"
                  >
                    Fazer login
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
