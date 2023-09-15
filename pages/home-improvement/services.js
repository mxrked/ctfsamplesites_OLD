// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/HomeImprovement/HomeImprovement.module.css";

export default function HomeImprovementServices() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Home Improvement Visits")) {
      console.log(
        "Total Visits on Home Improvement Website: " +
          sessionStorage.getItem("Home Improvement Visits")
      );
    }
  }, []);

  return "";
}
