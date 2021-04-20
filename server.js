const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/user");
require("dotenv/config");

app.use(express.json());
connectDB();
app.use("/api/users", userRouter);
const port = process.env.port;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
