const mongoose = require("mongoose");
const Event = require("../models/Event");
const RSVP = require("../models/RSVP");

exports.joinEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventId, attendeesCount: { $lt: capacity } },
      { $inc: { attendeesCount: 1 } },
      { new: true, session }
    );

    if (!event) throw "Event Full";

    await RSVP.create([{ userId, eventId }], { session });

    await session.commitTransaction();
    res.json({ message: "RSVP Successful" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err });
  }
};
