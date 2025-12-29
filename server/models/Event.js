const mongoose = require("mongoose");

module.exports = mongoose.model("Event",
  new mongoose.Schema({
    title: String,
    description: String,
    dateTime: Date,
    location: String,
    capacity: Number,
    attendeesCount: { type: Number, default: 0 },
    imageUrl: String,
    createdBy: mongoose.Schema.Types.ObjectId
  })
);
