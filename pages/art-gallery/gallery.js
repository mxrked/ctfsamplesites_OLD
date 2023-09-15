// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../../assets/styles/modules/Sites/ArtGallery/ArtGallery.module.css";

export default function ArtGalleryGallery() {
  const router = useRouter();

  // Displaying website visits
  useEffect(() => {
    if (sessionStorage.getItem("Art Gallery Visits")) {
      console.log(
        "Total Visits on Pressure Washing Website: " +
          sessionStorage.getItem("Art Gallery Visits")
      );
    }
  }, []);

  return "";
}
