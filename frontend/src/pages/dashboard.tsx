import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { SimpleButton } from "../components/SimpleButton";
import { SimpleSelect } from "../components/SimpleSelect";
import { Spinner } from "../components/Spinner";
import { authenticatedUser } from "../utils/authenticatedUser";
import { formatDateToApi, formatDateToUI } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";
import { api } from "../services/api";
import { toast, ToastContainer } from "react-toastify";

interface DashboardPageProps {
  todaysCovidReports: CovidReport;
}

export default function DashboardPage({ todaysCovidReports }: DashboardPageProps) {
  const [filteredCovidReports, setFilteredCovidReports] = useState<FilteredCovidReport>({} as CovidReport);
  const [countries, setCountries] = useState<Country[]>([]);

  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [maxDate, setMaxDate] = useState(new Date());;

  useEffect(() => {
    let yesterday = new Date(maxDate);

    yesterday.setDate(yesterday.getDate() - 1)

    setMaxDate(yesterday);
  }, [])

  useEffect(() => {
    api.get<{ regions: Country[] }>("/regions").then(({ data }) => setCountries(data.regions));
  }, [])

  const handleFilterReports = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get<{ reports: FilteredCovidReport }>(`/reports/filtered?region-iso=${country}&date=${formatDateToApi(date)}`);
    
      setFilteredCovidReports(data.reports);
    } catch (err) {
      toast.error("Erro ao filtrar casos");
    }

    setIsLoading(false);
  }, [
    date, country
  ]);

  return (
    <>
      <Head>
        <title>COVIDANDO | Dashboard</title>
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

      <header className="flex items-center justify-center px-6 py-4 bg-indigo-600">
        <Link href="/" className="py-2 text-white font-bold drop-shadow-md">COVIDANDO</Link>
      </header>
      <main className="p-8">
        <div className="mb-8 text-center md:text-left">
          <p className="text-indigo-600 text-xs">COVID 19</p>
          <h1 className="text-2xl text-neutral-900">Casos de Coronavírus no Mundo Hoje</h1>
          <span className="text-xs text-gray-400">Ultima atualização: {formatDateToUI(todaysCovidReports.last_update.split(" ")[0])} {formatTime(todaysCovidReports.last_update.split(" ")[1])}</span>
        </div>
      
        <div className="flex flex-wrap items-center gap-10 border-b-2 pb-12 justify-center md:justify-left">
          <div className="p-8 bg-indigo-600 rounded-lg text-center hover:bg-indigo-800 transition duration-300">
            <h3 className="uppercase text-white text-sm mb-1">Casos Confirmados</h3>
            <p className=" text-white text-3xl font-bold">{todaysCovidReports.confirmed.toLocaleString('pt-BR')}</p>
          </div>

          <div className="p-8 rounded-lg text-center border-2 hover:border-green-600 transition duration-300">
            <h3 className="uppercase text-sm mb-1">Casos Recuperados</h3>
            <p className="text-neutral-800 text-3xl font-bold">{todaysCovidReports.recovered.toLocaleString('pt-BR')}</p>
          </div>

          <div className="p-8 rounded-lg text-center border-2 hover:border-red-600 transition duration-300">
            <h3 className="uppercase">Óbitos confirmados</h3>
            <p className="text-neutral-800 text-3xl font-bold">{todaysCovidReports.deaths.toLocaleString('pt-BR')}</p>
          </div>
          
          <div className="p-8 rounded-lg text-center border-2 hover:border-fuchsia-800 transition duration-300">
            <h3 className="uppercase">Letalidade</h3>
            <p className="text-neutral-800 text-3xl font-bold">{todaysCovidReports.fatality_rate}%</p>
          </div>
        </div>

        <div className="mb-12 mt-12 text-center md:text-left">
          <p className="text-indigo-600 text-xs">COVID 19</p>
          <h1 className="text-2xl text-neutral-900">Filtar casos</h1>
          {
            filteredCovidReports.date && (
              <span className="text-xs text-gray-400">Data: {formatDateToUI(filteredCovidReports.date.split(" ")[0])} {formatTime(todaysCovidReports.last_update.split(" ")[1])}</span>
            )
          }
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-start">
          <Calendar
            value={date}
            onChange={setDate}
            locale="pt-BR"
            maxDate={maxDate}
            minDate={new Date(2020, 1, 2)}
          />

          <div className="w-96 ml-0 flex flex-col mt-4 md:mt-0 md:ml-8 md:block">
            <SimpleSelect value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Escolha um país">
              {countries.map((country) => (
                <option key={country.name} value={country.iso}>{country.name}</option>
              ))}
            </SimpleSelect>
            <SimpleButton handleClick={handleFilterReports} type="button" style={{ marginTop: 25 }}>
              {
                isLoading ? (
                  <Spinner className="w-5 h-5 mx-11 text-white animate-spin fill-indigo-600" />
                ) : "Filtrar casos"
              }
            </SimpleButton>
          </div>
        </div>

        {
          filteredCovidReports.active && (
            <div className="flex flex-wrap items-center gap-10 mt-10 justify-center md:justify-left">
              <div className="p-8 bg-indigo-600 rounded-lg text-center hover:bg-indigo-800 transition duration-300">
                <h3 className="uppercase text-white text-sm mb-1">Casos Confirmados</h3>
                <p className=" text-white text-3xl font-bold">{filteredCovidReports.confirmed.toLocaleString('pt-BR')}</p>
              </div>

              <div className="p-8 rounded-lg text-center border-2 hover:border-green-600 transition duration-300">
                <h3 className="uppercase text-sm mb-1">Casos Recuperados</h3>
                <p className="text-neutral-800 text-3xl font-bold">{filteredCovidReports.recovered.toLocaleString('pt-BR')}</p>
              </div>

              <div className="p-8 rounded-lg text-center border-2 hover:border-red-600 transition duration-300">
                <h3 className="uppercase">Óbitos confirmados</h3>
                <p className="text-neutral-800 text-3xl font-bold">{filteredCovidReports.deaths.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          )
        }
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isUserAuthenticated = await authenticatedUser(ctx);

  if (!isUserAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const { data } = await api.get<{ reports: CovidReport }>(`/reports?date=${formatDateToApi(new Date())}`);
  
    const { reports } = data;

    return {
      props: {
        todaysCovidReports: {
          last_update: reports.last_update,
          confirmed: reports.confirmed,
          deaths: reports.deaths,
          recovered: reports.recovered,
          active: reports.active,
          fatality_rate: reports.fatality_rate,
        }
      }
    }
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
