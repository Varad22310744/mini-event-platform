const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");
const RSVP = require("../models/RSVP");
const auth = require("../middleware/auth");

router.post("/join", auth, async (req,res)=>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findOneAndUpdate(
      {_id:req.body.eventId, attendeesCount:{$lt:req.body.capacity}},
      {$inc:{attendeesCount:1}},
      {new:true, session}
    );

    if(!event) throw "Event Full";

    await RSVP.create([{userId:req.user.id,eventId:req.body.eventId}],{session});
    await session.commitTransaction();
    res.send("RSVP Done");
  } catch {
    await session.abortTransaction();
    res.status(400).send("Event Full");
  }
});

module.exports = router;
