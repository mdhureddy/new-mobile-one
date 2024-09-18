const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./components/config/db");
const userRouter = require("./components/routes/userRouters");
dotenv.config();
const app = express();
connectDB();
// Middleware to parse JSON request bodies
app.use(express.json());
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
