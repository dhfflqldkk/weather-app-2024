import { GetServerSideProps } from "next";
import { WeatherData, ForecastItem } from "../../types/types";
import styles from "../../styles/Weather.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";

interface WeatherDetailsProps {
  currentWeather: WeatherData;
  sixDayForecast: ForecastItem[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.params as { location: string };
  const apiKey = process.env.OPENWEATHERMAP_API_KEY as string;
  let currentWeather: WeatherData | null = null;
  let sixDayForecast: ForecastItem[] = [];

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  );
  if (weatherRes.ok) {
    currentWeather = await weatherRes.json();
  } else {
    return { notFound: true };
  }

  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
  );
  if (forecastRes.ok) {
    const forecastData = await forecastRes.json();
    sixDayForecast = forecastData.list
      .filter((_, index) => index % 8 === 0)
      .slice(0, 6);
  } else {
    return { notFound: true };
  }

  return {
    props: {
      currentWeather,
      sixDayForecast,
    },
  };
};

export default function WeatherDetails({
  currentWeather,
  sixDayForecast,
}: WeatherDetailsProps) {
  const formatDate = (dateString: number) =>
    new Date(dateString * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formatDateTime = (dateTimeString: string) =>
    new Date(dateTimeString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  if (!currentWeather || !sixDayForecast) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{`CloudSight | ${currentWeather.name}, ${currentWeather.sys.country}`}</title>
        <meta
          name="description"
          content={`Current weather and 5-day forecast for ${currentWeather.name}, ${currentWeather.sys.country}`}
        />
      </Head>
      <Navbar />
      <div className={styles.weatherContainer}>
        <h1 className={styles.title}>
        📍{currentWeather.name}, {currentWeather.sys.country}
        </h1>
        <h2 className={styles.forecastTitle}>Current Weather</h2>

        <div className={styles.weatherDetails}>
          <div className={styles.currentWeatherContainer}>
            <div className={styles.imageContainer}>
              <Image
                src={`/images/weather/${currentWeather.weather[0].icon}.png`}
                alt={currentWeather.weather[0].description}
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
            <p>Last Updated: {formatDate(currentWeather.dt)}</p>
            <p>{currentWeather.main.temp.toFixed(1)}°C</p>
            <p>{currentWeather.weather[0].description}</p>
          </div>
        </div>
        <h2 className={styles.forecastTitle}>5-Day Forecast</h2>
        <div className={styles.forecastContainer}>
          {sixDayForecast.map((forecast, index) => (
            <div key={index} className={styles.forecastItem}>
              <Image
                src={`/images/weather/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                width={100}
                height={100}
              />
              <p>{formatDateTime(forecast.dt_txt)}</p>
              <p>{forecast.main.temp.toFixed(1)}°C</p>
              <p>{forecast.weather[0].description}</p>
              <p>{forecast.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
