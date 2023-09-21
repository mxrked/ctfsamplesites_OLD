import axios from "axios";
import { connectToDatabase } from "@/utils/connections/HomeImprovement_connection";

// const IPSTACK_KEY = "6eafccee3db72681fcd3589b807c0f2e";

// Define the URL to fetch AWS IP ranges
const AWS_IP_RANGES_URL = "https://ip-ranges.amazonaws.com/ip-ranges.json";
// Define the IP ranges for Googlebot, GWC, and Zscaler
const GOOGLEBOT_IP_RANGES = ["66.249.75.15", "66.249.75.19"];
const GWC_IP_RANGES = ["74.125.0.0/16"]; // Google Web Crawler
const ZSCALER_IP_RANGES = ["205.169.39.105"];

const isExcludedIP = (ip, excludedRanges) => {
  // Check if the IP address belongs to any of the excluded ranges
  return excludedRanges.some((range) => {
    if (range.includes("/")) {
      // Handle CIDR notation
      const [rangeIp, rangePrefix] = range.split("/");
      const rangeStart = ipToNumber(rangeIp);
      const ipNumber = ipToNumber(ip);
      const shift = 32 - parseInt(rangePrefix);
      const mask = (0xffffffff << shift) >>> 0;
      return (rangeStart & mask) === (ipNumber & mask);
    } else {
      // Handle single IP address
      return ip === range;
    }
  });
};

const ipToNumber = (ip) => {
  const parts = ip.split(".");
  return (
    (parseInt(parts[0]) << 24) |
    (parseInt(parts[1]) << 16) |
    (parseInt(parts[2]) << 8) |
    parseInt(parts[3])
  );
};

const getAWSCIDRRanges = () => {
  try {
    const cmd =
      "aws ec2 describe-managed-prefix-lists --query \"PrefixLists[?PrefixListName=='com.amazonaws.global.cloudfront.origin-facing'].[PrefixListId]\" --output text";
    const prefixListId = execSync(cmd, { encoding: "utf-8" }).trim();
    const cmd2 = `aws ec2 describe-managed-prefix-lists --query "PrefixLists[?PrefixListId==\'${prefixListId}\'].[PrefixListEntries]" --output json`;
    const prefixListEntries = JSON.parse(execSync(cmd2, { encoding: "utf-8" }));

    if (!prefixListEntries) {
      // Handle the case where prefixListEntries is null or undefined
      console.error("Prefix List Entries are null or undefined");
      return [];
    }

    const awsIpRanges = [];
    for (const entry of prefixListEntries[0]) {
      // Check if entry is an object and has a Cidr property that is not null
      if (typeof entry === "object" && entry.Cidr !== null) {
        awsIpRanges.push(entry.Cidr);
      } else {
        console.warn("Skipping entry without valid Cidr:", entry);
      }
    }
    return awsIpRanges;
  } catch (error) {
    console.error("Error fetching AWS IP ranges: " + error);
    return [];
  }
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

    // Fetch AWS IP ranges
    // const awsIpRangesResponse = await axios.get(AWS_IP_RANGES_URL);
    // const awsIpRanges = awsIpRangesResponse.data.prefixes.map(
    //   (entry) => entry.ip_prefix
    // );
    const awsIpRanges = getAWSCIDRRanges();

    // Check if the current IP address belongs to any excluded range
    if (
      !isExcludedIP(IP_ADDRESS, [
        ...awsIpRanges,
        ...GOOGLEBOT_IP_RANGES,
        ...GWC_IP_RANGES,
        ...ZSCALER_IP_RANGES,
      ])
    ) {
      const currentDateTime = new Date().toISOString();
      await IP_COLLECTION.insertOne({
        IP_ADDRESS,
        added_at: currentDateTime,
      });
    }

    // Define the aggregation pipeline to identify and delete duplicates
    const deduplicationPipeline = [
      {
        $group: {
          _id: "$IP_ADDRESS",
          duplicates: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // Filter for duplicates
        },
      },
    ];

    // Execute the aggregation pipeline to find duplicate documents
    const duplicateResults = await IP_COLLECTION.aggregate(
      deduplicationPipeline
    ).toArray();

    // Iterate through the results and remove duplicates
    for (const result of duplicateResults) {
      // Keep one document (you can choose how to determine which one to keep) and delete the rest
      const [documentToKeep, ...documentsToDelete] = result.duplicates;
      await IP_COLLECTION.deleteMany({ _id: { $in: documentsToDelete } });
    }

    // Remove null, excluded IP addresses, and others based on your criteria
    await IP_COLLECTION.deleteMany(
      {
        $or: [
          { IP_ADDRESS: null },
          {
            IP_ADDRESS: {
              $in: [
                ...awsIpRanges,
                ...GOOGLEBOT_IP_RANGES,
                ...GWC_IP_RANGES,
                ...ZSCALER_IP_RANGES,
              ],
            },
          },
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
