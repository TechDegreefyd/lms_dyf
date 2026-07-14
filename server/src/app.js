const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const leadsRoutes = require("./routes/leads.routes");
const collegesRoutes = require("./routes/colleges.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DegreeFYD LMS API server" });
});

// Wire routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/colleges", collegesRoutes);
app.use("/api/chat", chatRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
