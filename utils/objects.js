/**
 *
 *  This is where all the connections are being stored
 *
 */

import { connectToDatabase } from "./connections/Main_connection";

const MAIN_CONNECTION = connectToDatabase(
  "mongodb+srv://admin:main_DB_020700@ctfsamplesites-main.q1qz4xs.mongodb.net/?retryWrites=true&w=majority"
);
const ART_GALLERY_CONNECTION = connectToDatabase(
  process.env.ART_GALLERY_DB_URI
);
const HOME_IMPROVEMENT_CONNECTION = connectToDatabase(
  process.env.HOME_IMPROVEMENT_DB_URI
);
const LAWN_CARE_CONNECTION = connectToDatabase(process.env.LAWN_CARE_DB_URI);
const PAINTING_CONNECTION = connectToDatabase(process.env.PAINTING_DB_URI);
const PHOTOGRAPHY_CONNECTION = connectToDatabase(
  process.env.PHOTOGRAPHY_DB_URI
);
const PRESSURE_WASHING_CONNECTION = connectToDatabase(
  process.env.PRESSURE_WASHING_DB_URI
);

export {
  MAIN_CONNECTION,
  ART_GALLERY_CONNECTION,
  HOME_IMPROVEMENT_CONNECTION,
  LAWN_CARE_CONNECTION,
  PAINTING_CONNECTION,
  PHOTOGRAPHY_CONNECTION,
  PRESSURE_WASHING_CONNECTION,
};
