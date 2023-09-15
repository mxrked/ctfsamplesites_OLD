// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/PressureWashing/PressureWashing.module.css";

export default function PressureWashingServices() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Pressure Washing Visits")) {
      console.log(
        "Total Visits on Pressure Washing Website: " +
          sessionStorage.getItem("Pressure Washing Visits")
      );
    }
  }, []);

  return "";
}
