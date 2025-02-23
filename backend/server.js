const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5002;

// Middleware
app.use(express.json());
app.use(cors());

// Predict endpoint
app.post("/predict", async (req, res) => {
  console.log("Received data:", req.body);

  const { county, month, year, cause } = req.body; // Extract inputs from frontend

  try {
    // Call the Python script to send data to Groq AI
    const response = await axios.post("http://localhost:5003/groq-analysis", {
      county,
      month,
      year,
      cause,
    });

    res.json({ message: "success", mitigation_plan: response.data });
  } catch (error) {
    console.error("Error calling Groq:", error.message);
    res.status(500).json({ error: "Failed to get fire mitigation plan." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
