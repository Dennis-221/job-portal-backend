require("dotenv").config();
const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationsRoutes = require("./routes/applicationsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const resumeRoutes = require("./routes/resumeRoutes");
const companyRoutes = require("./routes/companyRoutes");
// Employer analytics
const employerAnalyticsRoutes = require("./routes/employerAnalyticsRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/employer/analytics", employerAnalyticsRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Global error handler
app.use(errorHandler);
app.use(requestLogger);

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Job Portal API is running!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
