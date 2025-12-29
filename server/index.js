const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors({
  origin: "https://mini-event-project-fnfhoof7o-varad22310744s-projects.vercel.app"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"));

app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));
app.use("/rsvp", require("./routes/rsvp"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

