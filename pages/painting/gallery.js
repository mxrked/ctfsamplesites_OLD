// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/Painting/Painting.module.css";

export default function PaintingGallery() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Painting Visits")) {
      console.log(
        "Total Visits on Painting Website: " +
          sessionStorage.getItem("Painting Visits")
      );
    }
  }, []);

  return "";
}
