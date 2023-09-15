// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports
import DeclareStorageVariable from "@/assets/functions/data/storage/DeclareStorageVariable";

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/PressureWashing/PressureWashing.module.css";

export default function PressureWashingIndex() {
  const router = useRouter();
  const [MAIN_USER_IP_ADDRESS, SET_MAIN_USER_IP_ADDRESS] = useState(null);
  const [TOTAL_UNIQUE_IPS, SET_TOTAL_UNIQUE_IPS] = useState(null);

  // Fetching the total number of visits via unique IP addresses
  useEffect(() => {
    fetch("../api/trackers/PressureWashing_trackIps")
      .then((response) => response.json())
      .then((data) => {
        SET_TOTAL_UNIQUE_IPS(data.TOTAL_UNIQUE_IPS);
      })
      .catch((error) => {
        console.error("(Pressure Washing) Fetch Error: " + error);
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

  // Storing data to sessionStorage
  useEffect(() => {
    DeclareStorageVariable(
      "session",
      "Pressure Washing Visits",
      TOTAL_UNIQUE_IPS
    );
  }, [TOTAL_UNIQUE_IPS]);

  // Writing data to console
  useEffect(() => {
    if (TOTAL_UNIQUE_IPS !== null) {
      console.log(
        "Total Visits on Pressure Washing Website: " + TOTAL_UNIQUE_IPS
      );
    }

    if (MAIN_USER_IP_ADDRESS !== null) {
      console.log("Current User's IP Address: " + MAIN_USER_IP_ADDRESS);
    }
  }, [TOTAL_UNIQUE_IPS]);

  return "";
}
