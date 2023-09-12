// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import styles from "../assets/styles/modules/Index/Index.module.css";
import "../assets/styles/modules/Index/Index.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div id="PAGE" className={`${styles.index_page} page full-second`}>
      <main id="PAGE_CNT"></main>
    </div>
  );
}
