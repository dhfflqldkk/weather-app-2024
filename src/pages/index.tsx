import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    router.push(`/weather/${locationInput}`);
  };

  return (
    <main className={styles.main}>
      <h1>CloudSight</h1>
      {isLoading ? (
        <div className="sec-loading">
          <div className="cloud"></div>
        </div>
      ) : (
        <form onSubmit={handleSearch} className={styles.InputContainer}>
          <input
            type="text"
            placeholder="Enter location"
            className={styles.input}
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </form>
      )}
      <div className={styles.instructionsCard}>
        <p>Enter a location</p>
        <p>Find the City's Current Weather & 5-Day Forecast</p>
      </div>
    </main>
  );
}
