import { Auth } from 'aws-amplify';
import { MdOutlineCoronavirus } from 'react-icons/md';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Spinner } from './Spinner';

interface HomeHeaderProps {
  isAuthenticated: boolean;
}

export function HomeHeader({ isAuthenticated }: HomeHeaderProps) {
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);

    try {
      await Auth.signOut();
    } catch (err) {
      
    }

    setIsLoading(false);

    router.reload();
  }, []);

  return (
    <>
      {
        isModalOpen && (
          <>
            {
              isAuthenticated ? (
                <div className="sm:hidden fixed z-10 w-screen h-screen bg-black/75 flex items-center justify-center flex-col">
                  <Link href="/dashboard" className="px-4 py-3 font-bold bg-indigo-600 rounded text-white mb-3">Dashboard</Link>
                  <button onClick={handleSignOut} disabled={isLoading} className="px-4 py-3 rounded text-red-600">
                    {
                      isLoading ? (
                        <Spinner className="w-8 h-8 text-white animate-spin fill-indigo-600" />
                      ) : "Sair da conta"
                    }
                  </button>
                </div>
              ) : (
                <div className="sm:hidden fixed z-10 w-screen h-screen bg-black/75 flex items-center justify-center flex-col">
                  <Link href="/login" className="px-4 py-3 font-bold bg-indigo-600 rounded text-white mb-3">Entrar</Link>
                  <Link href="/register" className="px-4 py-3 font-bold bg-indigo-600 rounded text-white">Criar conta</Link>
                </div>
              )
            }
          </>
        )
      }

      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-indigo-600">
        <div className="flex items-center">
          <MdOutlineCoronavirus size={32} color="white" />
          <h2 className="py-2 ml-2 text-white font-bold drop-shadow-md">COVIDANDO</h2>
        </div>
        
        { isAuthenticated ? (
            <>
              <div className="hidden sm:block">
                <button onClick={handleSignOut} disabled={isLoading} className="rounded text-white hover:text-red-500 transition duration-300">
                {
                  isLoading ? (
                    <Spinner className="w-4 h-4 text-white animate-spin fill-indigo-600" />
                  ) : "Sair da conta"
                }
                </button>
                <Link href="/dashboard" className="ml-4 px-3 py-2 border-2 border-white rounded text-white hover:bg-white hover:text-indigo-600 transition duration-300">Dashboard</Link>
              </div>

              <div className="sm:hidden z-20">
                <Hamburger
                  color="white"
                  size={20}
                  onToggle={() => setIsModalOpen(!isModalOpen)}
                  toggled={isModalOpen}
                />
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:block">
                <Link href="/login" className="mr-4 px-3 py-2 text-white font-medium rounded hover:bg-white hover:text-indigo-600 transition duration-300">Entrar</Link>
                <Link href="/register" className="px-3 py-2 border-2 border-white rounded text-white hover:bg-white hover:text-indigo-600 transition duration-300">Criar conta</Link>
              </div>

              <div className="sm:hidden z-20">
                <Hamburger
                  color="white"
                  size={20}
                  onToggle={() => setIsModalOpen(!isModalOpen)}
                  toggled={isModalOpen}
                />
              </div>
            </>
          )
        }
      </header>
    </>
  );
}
