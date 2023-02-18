import { Auth } from "aws-amplify";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BackButton } from "../components/BackButton";
import { SimpleButton } from "../components/SimpleButton";
import { SimpleInput } from "../components/SimpleInput";
import { Spinner } from "../components/Spinner";
import { authenticatedUser } from "../utils/authenticatedUser";

export default function ConfirmAccountPage() {
  const router = useRouter();

  const [verificationCode, setVerificationCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmSignUp = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { username } = router.query;

      if (!username || typeof username !== "string") {
        toast.error("Email para veridicação inválido");

        return;
      }

      await Auth.confirmSignUp(username, verificationCode);
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      let errorMessage = "";
      
      // It is needed because the aws-amplify doesn't have a typescript type for handle errors
      // @ts-ignore
      switch (err.message) {
        case "Invalid verification code provided, please try again.":
          errorMessage = "Código de verificação inválida";
          break;

        default:
          errorMessage = "Erro ao verificar conta";
      }

      toast.error(errorMessage);
    }

    setIsLoading(false);
  }, [verificationCode]);

  return (
    <>
      <Head>
        <title>COVIDANDO | Confirmar conta</title>
        <link rel="icon" href="/covidando-logo-blue.png" />
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
              src="/svg/confirm-illustration.svg"
              className="w-96 lg:mr-16"
              alt="Confirm account illustration"
            />
            <form onSubmit={handleConfirmSignUp} className="w-auto text-center mt-12 lg:text-left lg:mt-0">
              <h2 className="text-3xl mb-2 font-medium">Confirmação de conta</h2>
              <p className="mb-6">Foi enviado um código de verificação para o email: {router.query.username}</p>

              <div className="mb-6">
                <SimpleInput
                  placeholder="Código de verificação"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type="number"
                />
              </div>
              
              <SimpleButton type="submit" disabled={isLoading}>
                {
                  isLoading ? (
                    <Spinner className="w-5 h-5 mx-12 text-white animate-spin fill-indigo-600" />
                  ) : "Confirmar conta"
                }
                
              </SimpleButton>
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
