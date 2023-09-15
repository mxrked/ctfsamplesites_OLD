// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/Photography/Photography.module.css";

export default function PhotographyGallery() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Photography Visits")) {
      console.log(
        "Total Visits on Photography Website: " +
          sessionStorage.getItem("Photography Visits")
      );
    }
  }, []);

  return "";
}
