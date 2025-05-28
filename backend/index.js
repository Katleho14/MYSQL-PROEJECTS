require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database"); // Connect to MySQL
const querystring = require("querystring");

// Middleware
app.use(cors());
app.use(express.json());

// Route Handlers
app.use("/Product", require("./Routes/Product/Product"));
app.use("/Supplier", require("./Routes/Supplier/Supplier"));
app.use("/Order", require("./Routes/Order/Order"));
app.use("/Statistics", require("./Routes/Statistics/Statistics"));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running and connected to MySQL");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
