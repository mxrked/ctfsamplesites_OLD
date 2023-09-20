import axios from "axios";
import { connectToDatabase } from "@/utils/connections/Main_connection";

// const IPSTACK_KEY = "6eafccee3db72681fcd3589b807c0f2e";

const fetchAWSIPRanges = async () => {
  try {
    const response = await axios.get(
      "https://ip-ranges.amazonaws.com/ip-ranges.json"
    );
    const data = response.data;
    return data.prefixes.map((entry) => entry.ip.ip_prefix); // This contains the AWS IP address ranges
  } catch (error) {
    console.error("Error fetching AWS IP ranges:", error);
    return [];
  }
};

const isIPInExcludedRanges = (ip, excludedRanges) => {
  return excludedRanges.some((range) => ip.startsWith(range));
};

export default async (req, res) => {
  const TARGET_ADDED_AT = req.query.targetAddedAt; // Getting the added_at value for each index
  const { headers } = req;
  let IP_ADDRESS =
    headers["x-forwarded-for"] || req.connection.remoteAddress || "";

  // Skipping the localhost ip address and marking it as null for later removal
  if (IP_ADDRESS === "127.0.0.1" || IP_ADDRESS === "::1") {
    IP_ADDRESS = null;
  }

  try {
    const DB = await connectToDatabase();
    const IP_COLLECTION = DB.collection("ips");

    // Define the excluded IP ranges (AWS, GCP, Zscaler, Googlebot)
    const excludedIPRanges = await fetchAWSIPRanges();
    // You can add more excluded IP ranges if needed for other providers

    // Check if the current IP address is in the excluded ranges
    if (isIPInExcludedRanges(IP_ADDRESS, excludedIPRanges)) {
      console.log("Skipping AWS IP:", IP_ADDRESS);
    } else {
      // Check if the IP address already exists in the collection
      const existingIP = await IP_COLLECTION.findOne({ IP_ADDRESS });

      if (!existingIP) {
        const currentDateTime = new Date().toISOString();

        // Insert the document only if it doesn't already exist
        await IP_COLLECTION.insertOne({
          IP_ADDRESS,
          added_at: currentDateTime,
        });
      }
    }

    // Remove null, Amazon Web Services (AWS) ip addresses, and others based on your criteria
    await IP_COLLECTION.deleteMany(
      {
        $or: [
          { IP_ADDRESS: null },
          { IP_ADDRESS: { $in: excludedIPRanges } },
          // Add more conditions for other excluded IP ranges if needed
        ],
      },
      { added_at: TARGET_ADDED_AT }
    );

    const TOTAL_UNIQUE_IPS = await IP_COLLECTION.countDocuments();

    res.status(200).json({ TOTAL_UNIQUE_IPS });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "An error occurred" });
  }

  // try {
  //   // Creating the connection
  //   const DB = await connectToDatabase();

  //   // Creating the collection
  //   const IP_COLLECTION = DB.collection("ips");

  //   // Check if the current IP address is already in the database.
  //   const EXISTING_IP = await IP_COLLECTION.findOne({ IP_ADDRESS });

  //   console.log("IP_ADDRESS: " + IP_ADDRESS);

  //   if (!EXISTING_IP) {
  //     const currentDateTime = new Date().toISOString(); // Get the current date and time in ISO format
  //     await IP_COLLECTION.insertOne({
  //       IP_ADDRESS,
  //       added_at: currentDateTime, // Add the timestamp property here
  //     });

  //     //   // Make API request to IPStack to get location information
  //     //   const LOCATION_INFO = await fetch(
  //     //     `http://api.ipstack.com/${IP_ADDRESS}?access_key=6eafccee3db72681fcd3589b807c0f2e`
  //     //   )
  //     //     .then((response) => response.json())
  //     //     .catch((error) => {
  //     //       console.error(
  //     //         `Error fetching location data for IP ${IP_ADDRESS}: ${error}`
  //     //       );
  //     //       return null; // Handles error gracefully
  //     //     });

  //     //   if (LOCATION_INFO) {
  //     //     await IP_COLLECTION.updateOne(
  //     //       { IP_ADDRESS },
  //     //       { $set: { location: LOCATION_INFO } }
  //     //     );
  //     //   }
  //   }

  //   // Removing null, Amazon Web Services (AWS) ip addresses
  //   const AWS_IP_RANGES = await fetchAWSIPRanges();
  //   await IP_COLLECTION.deleteMany(
  //     { IP_ADDRESS: { $in: AWS_IP_RANGES } },
  //     { added_at: TARGET_ADDED_AT }
  //   );
  //   await IP_COLLECTION.deleteMany(
  //     { IP_ADDRESS: null },
  //     { added_at: TARGET_ADDED_AT }
  //   );
  //   await IP_COLLECTION.deleteMany(
  //     { IP_ADDRESS: "::1" },
  //     { added_at: TARGET_ADDED_AT }
  //   );

  //   // Removing 3.238.66.225 ip (I have no idea what this is. I assume it might be Netlify)

  //   // Getting the total count of unique IPs
  //   const TOTAL_UNIQUE_IPS = await IP_COLLECTION.countDocuments();

  //   res.status(200).json({ TOTAL_UNIQUE_IPS });
  // } catch (error) {
  //   console.log("Error: " + error);
  //   res.status(500).json({ error: "An error occured" });
  // }
};
