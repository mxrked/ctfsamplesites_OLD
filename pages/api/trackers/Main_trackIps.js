import axios from "axios";

// const IPSTACK_KEY = "6eafccee3db72681fcd3589b807c0f2e";

const fetchAWSIPRanges = async () => {
  try {
    const response = await axios.get(
      "https://ip-ranges.amazonaws.com/ip-ranges.json"
    );
    const data = response.data;
    return data.prefixes; // This contains the AWS IP address ranges
  } catch (error) {
    console.error("Error fetching AWS IP ranges:", error);
    return [];
  }
};

export default async (req, res) => {};
