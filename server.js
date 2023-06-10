require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
  
//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Rouutes
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/user')

app.use("/api", authRoutes);
app.use("/api", profileRoutes);

const port = 8000 || process.env.port;

//Starting the server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
