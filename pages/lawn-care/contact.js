// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/LawnCare/LawnCare.module.css";

export default function LawnCareContact() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Lawn Care Visits")) {
      console.log(
        "Total Visits on Lawn Care Website: " +
          sessionStorage.getItem("Lawn Care Visits")
      );
    }
  }, []);

  return "";
}
