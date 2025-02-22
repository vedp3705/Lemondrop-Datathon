// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Define the /predict endpoint that returns a simple success message
app.post("/predict", (req, res) => {
  console.log("Received data:", req.body);
  // Here you can later integrate your model for prediction.
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
