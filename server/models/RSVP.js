const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  eventId: mongoose.Schema.Types.ObjectId
});

schema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("RSVP", schema);
