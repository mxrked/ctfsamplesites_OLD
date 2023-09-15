// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import styles from "../assets/styles/modules/Index/Index.module.css";
import "../assets/styles/modules/Index/Index.module.css";

export default function Home() {
  const router = useRouter();

  const [MAIN_USER_IP_ADDRESS, SET_MAIN_USER_IP_ADDRESS] = useState(null);
  const [TOTAL_UNIQUE_IPS, SET_TOTAL_UNIQUE_IPS] = useState(null);

  // Fetching the total number of visits via unique IP addresses
  useEffect(() => {
    fetch("/api/trackers/Main_trackIps")
      .then((response) => response.json())
      .then((data) => {
        SET_TOTAL_UNIQUE_IPS(data.TOTAL_UNIQUE_IPS);
      })
      .catch((error) => {
        console.error("(Main) Fetch Error: " + error);
      });
  }, []);

  // Fetching current user's ip address
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        SET_MAIN_USER_IP_ADDRESS(data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address: " + error);
      });
  }, []);

  // Writing data to console
  useEffect(() => {
    if (TOTAL_UNIQUE_IPS !== null) {
      console.log("Total Visits on Main Page: " + TOTAL_UNIQUE_IPS);
    }

    if (MAIN_USER_IP_ADDRESS !== null) {
      console.log("Current User's IP Address: " + MAIN_USER_IP_ADDRESS);
    }
  }, [TOTAL_UNIQUE_IPS]);

  return (
    <div id="PAGE" className={`${styles.index_page} page full-second`}>
      <main id="PAGE_CNT"></main>
    </div>
  );
}
