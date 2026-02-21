require("dotenv").config();
const router = require("./App/routes/authRoutes")
const productRoutes = require("./App/routes/productRoutes")
const express = require("express");
const cors = require("cors");
const connectDB = require("./App/config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", router);
app.use("/products", productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
