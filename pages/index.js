// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Data/Functions/Images Imports
import TriggerInViewMotion from "@/assets/functions/dom/triggers/TriggerInViewMotion";
import DeclareStorageVariable from "@/assets/functions/data/storage/DeclareStorageVariable";
import { TriggerExitAnimations } from "@/assets/functions/dom/triggers/TriggerExitAnimations";

import { FADE_IN } from "@/assets/animations/FADES";

// Component Imports
import { PageHead } from "@/assets/components/global/PageHead";

// Style Imports
import styles from "../assets/styles/modules/Index/Index.module.css";
import "../assets/styles/modules/Index/Index.module.css";

export async function getStaticProps() {
  let data = null;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/main/files/json/page-head-data/Main.json"
    );

    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    data = await response.json();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const router = useRouter();

  const CONTROLS = useAnimation();
  const [REF, INVIEW] = useInView();

  const [MAIN_USER_IP_ADDRESS, SET_MAIN_USER_IP_ADDRESS] = useState(null);
  const [TOTAL_UNIQUE_IPS, SET_TOTAL_UNIQUE_IPS] = useState(null);

  const [PROJECTS, SET_PROJECTS] = useState([]);

  const PLACEHOLDER_URLS = [
    "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/main/imgs/placeholders/blue.webp",
    "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/main/imgs/placeholders/green.webp",
    "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/main/imgs/placeholders/purple.webp",
    "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/main/imgs/placeholders/red.webp",
  ];

  const COLUMN_CLASSES = ["col-lg-6", "col-md-6", "col-sm-6", "col-xs-12"];
  const SINGLE_COLUMN = ["col-lg-12", "col-md-12", "col-sm-12", "col-xs-12"];
  const DOUBLE_COLUMN = ["col-lg-6", "col-md-6", "col-sm-6", "col-xs-6"];
  const TRIPLE_COLUMN = ["col-lg-4", "col-md-4", "col-sm-4", "col-xs-4"];
  const QUAD_COLUMN = ["col-lg-3", "col-md-3", "col-sm-6", "col-xs-6"];

  // Triggering scroll animations
  useEffect(() => {
    TriggerInViewMotion(CONTROLS, INVIEW);
  }, [CONTROLS, INVIEW]);

  // Fetching/setting the total number of visits via unique IP addresses
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

  // Fetching/setting current user's ip address
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

  // Fetching/setting projects data
  useEffect(() => {
    fetch("json/Sample-Site-Data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok.");
        }
        return response.json();
      })
      .then((data) => SET_PROJECTS(data))
      .catch((error) =>
        console.error("Error fetching projects data: " + error)
      );
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
      console.log("Total Visits on Main Page: " + TOTAL_UNIQUE_IPS);
    }

    if (MAIN_USER_IP_ADDRESS !== null) {
      console.log("Current User's IP Address: " + MAIN_USER_IP_ADDRESS);
    }
  }, [TOTAL_UNIQUE_IPS]);

  // Triggering exit animations
  useEffect(() => {
    TriggerExitAnimations();
  }, []);

  // Adding current year to website
  useEffect(() => {
    document.getElementById("year").innerText = new Date().getFullYear();
  }, []);

  return (
    <div
      id="PAGE"
      className={`${styles.index_page} index-page page full-second`}
    >
      <PageHead data={data} />

      <main id="PAGE_CNT">
        <motion.div
          ref={REF}
          initial="hidden"
          animate={CONTROLS}
          variants={FADE_IN}
          className={`${styles.index_page_inner} fm-motion fade-in fade-in-fix full-second`}
        >
          <div className={`${styles.index_page_inner_top}`}>
            <h1 className="main-selected orientation-change-element half-second">
              codingthefront
            </h1>
            <span className="main-selected orientation-change-element half-second">
              SAMPLE WEBSITES
            </span>
          </div>

          <div className={`${styles.index_page_inner_text}`}>
            <span
              className={`${styles.bullet} ${styles.bullet_1} orientation-change-element half-second`}
            />
            <span
              className={`${styles.bullet} ${styles.bullet_2} orientation-change-element half-second`}
            />
            <span
              className={`${styles.bullet} ${styles.bullet_3} orientation-change-element half-second`}
            />
            <span
              className={`${styles.bullet} ${styles.bullet_4} orientation-change-element half-second`}
            />

            <div className={`${styles.index_page_inner_text_inner}`}>
              <div className={`${styles.index_page_inner_text_inner_cnt}`}>
                <p className="main-selected orientation-change-element half-second">
                  Hello! My name is Parker Phelps. I am a Freelance Web
                  Developer based out in North Carolina.
                </p>
                <p className="main-selected orientation-change-element half-second">
                  This website hosts all of my sample websites that my clients
                  can have a look at to possibly consider working with me.
                </p>
                <p className="main-selected orientation-change-element half-second">
                  If you would like to book a project/website, you can by
                  filling out the contact form on the{" "}
                  <a
                    className="main-selected"
                    href="https://codingthefront.com/contact"
                  >
                    contact page
                  </a>
                  . You can also view the pricing plans for my projects on that
                  page as well.
                </p>
                <p className="main-selected orientation-change-element half-second">
                  There are ZERO limits to what I can create with my web
                  development knowledge. :)
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.index_page_inner_projects}`}>
            <div className={`${styles.index_page_inner_projects_inner}`}>
              <div
                className={`${styles.index_page_inner_projects_inner_box} container-fluid`}
              >
                <div
                  className={`${styles.index_page_inner_projects_inner_row} row`}
                >
                  {PROJECTS.map((project) => (
                    <div
                      id={project._siteID}
                      key={project._siteID}
                      className={`${styles.project} project col-lg-6 col-md-6 col-sm-6 col-xs-12`}
                    >
                      <div className={`${styles.project_inner}`}>
                        <div className={`${styles.project_inner_cnt_top}`}>
                          <div
                            className={`${styles.project_inner_cnt_top_cnt}`}
                          >
                            <span
                              className={`${styles.project_heading} orientation-change-element half-second`}
                            >
                              {project._siteName}
                            </span>

                            <div
                              className={`${styles.project_main_img_holder} orientation-change-element half-second`}
                            >
                              <div
                                id={`projectMainImg${project._siteID}`}
                                className={`${styles.project_main_img}`}
                                style={{
                                  backgroundImage: `url(${project._siteImgs[0]})`,
                                }}
                              />
                            </div>

                            <div className={`${styles.project_imgs_holder}`}>
                              <div
                                className={`${styles.project_imgs_holder_box} container-fluid`}
                              >
                                <div
                                  className={`${styles.project_imgs_holder_row} row`}
                                >
                                  {project._siteImgs.map((img, index) => (
                                    <div
                                      id={`sites${project._siteID}_img_holder${index}`}
                                      key={`site${project._siteID}_img_${index}`}
                                      className={`${styles.img} project-img-holder col-lg-3 col-md-3 col-sm-6 col-xs-12`}
                                      onLoad={(e) => {
                                        // if (
                                        //   e.currentTarget
                                        //     .querySelector(".project-img")
                                        //     .getAttribute("data-src") ===
                                        //   PLACEHOLDER_URLS[0]
                                        // ) {
                                        //   e.currentTarget.style.display =
                                        //     "none";
                                        // }
                                        // if (
                                        //   e.currentTarget
                                        //     .querySelector(".project-img")
                                        //     .getAttribute("data-src") ===
                                        //   PLACEHOLDER_URLS[1]
                                        // ) {
                                        //   e.currentTarget.style.display =
                                        //     "none";
                                        // }
                                        // if (
                                        //   e.currentTarget
                                        //     .querySelector(".project-img")
                                        //     .getAttribute("data-src") ===
                                        //   PLACEHOLDER_URLS[2]
                                        // ) {
                                        //   e.currentTarget.style.display =
                                        //     "none";
                                        // }
                                        // if (
                                        //   e.currentTarget
                                        //     .querySelector(".project-img")
                                        //     .getAttribute("data-src") ===
                                        //   PLACEHOLDER_URLS[3]
                                        // ) {
                                        //   e.currentTarget.style.display =
                                        //     "none";
                                        // }
                                        // const DISPLAYED_IMG_HOLDERS_LENGTH =
                                        //   document.querySelectorAll(
                                        //     ".project-img-holder[style='display: none;']"
                                        //   ).length;
                                      }}
                                    >
                                      <img
                                        id={`site${project._siteID}_img_${index}`}
                                        data-src={img}
                                        alt={img}
                                        className={`lazyload project-img`}
                                      />

                                      <button
                                        className="half-second"
                                        onClick={(e) => {
                                          const MAIN_IMG =
                                            document.getElementById(
                                              `projectMainImg${project._siteID}`
                                            );
                                          const SELECTED_IMG_ID = `site${project._siteID}_img_${index}`;

                                          console.log(SELECTED_IMG_ID);

                                          const SELECTED_IMG_SRC = document
                                            .getElementById(SELECTED_IMG_ID)
                                            .getAttribute("data-src");

                                          console.log(SELECTED_IMG_SRC);

                                          MAIN_IMG.style.backgroundImage = `url(${SELECTED_IMG_SRC})`;
                                        }}
                                      ></button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={`${styles.project_inner_cnt_bottom}`}>
                          <div
                            className={`${styles.project_inner_cnt_bottom_cnt}`}
                          >
                            <a
                              href={project._siteDemoLink}
                              className="half-second orientation-change-element"
                            >
                              View Site
                            </a>

                            <button
                              onClick={() => {
                                console.log(
                                  `Opening site_${project._siteID}_modal`
                                );
                              }}
                              className="orientation-change-element half-second"
                            >
                              <span>Learn More</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.index_page_footer}`}>
            <div>
              <span>2023-</span>
              <span id="year"></span>{" "}
              <span>
                , Created by{" "}
                <a href="https://www.codingthefront.com">codingthefront.com</a>
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
