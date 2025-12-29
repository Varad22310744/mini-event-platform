const router = require("express").Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// ✅ CREATE EVENT (WITH IMAGE)
router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

        imageUrl = uploadResult.secure_url;
      }

      const event = await Event.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        capacity: Number(req.body.capacity),
        imageUrl,
        createdBy: req.user.id
      });

      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating event");
    }
  }
);

// GET ALL EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// EDIT EVENT (ONLY CREATOR)
router.put("/:id", auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send("Event not found");

  if (event.createdBy.toString() !== req.user.id) {
    return res.status(403).send("Not allowed");
  }

  Object.assign(event, req.body);
  await event.save();
  res.send("Event updated");
});

// DELETE EVENT (ONLY CREATOR)
router.delete("/:id", auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send("Event not found");

  if (event.createdBy.toString() !== req.user.id) {
    return res.status(403).send("Not allowed");
  }

  await event.deleteOne();
  res.send("Event deleted");
});

module.exports = router;
