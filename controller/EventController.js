import Event from "../model/EventModel.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE EVENT ================= */
export const createEvent = async (req, res) => {
  try {

    let imageUrl = "";

    // CLOUDINARY IMAGE UPLOAD
    if (req.file) {

      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    const price = Number(req.body.price);

    const event = new Event({
      title: req.body.title,
      location: req.body.location,
      adminPrice: price,
      userPrice: price,
      isUserPriceManual: false,
      category: req.body.category.toLowerCase(),
      image: imageUrl,
      date: req.body.date,
      time: req.body.time,
      status: "active"
    });

    await event.save();

    res.status(201).json({
      success: true,
      data: event
    });

  } catch (error) {

    console.log("CREATE EVENT ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= GET ALL EVENTS ================= */
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= GET BY CATEGORY ================= */
export const getByCategory = async (req, res) => {
  try {

    const category = req.params.category.toLowerCase();

    const events = await Event.find({
      category,
      status: "active"
    });

    res.status(200).json({
      success: true,
      data: events
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= GET SINGLE ================= */
export const getSingle = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= UPDATE ADMIN PRICE ================= */
export const updateAdminPrice = async (req, res) => {
  try {

    const { id } = req.params;
    const { price } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const newPrice = Number(price);

    event.adminPrice = newPrice;

    if (!event.isUserPriceManual) {
      event.userPrice = newPrice;
    }

    await event.save();

    res.json({
      success: true,
      data: event
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= UPDATE USER PRICE ================= */
export const updateUserPrice = async (req, res) => {
  try {

    const { id } = req.params;
    const { price } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    event.userPrice = Number(price);
    event.isUserPriceManual = true;

    await event.save();

    res.json({
      success: true,
      data: event
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= UPDATE EVENT ================= */
export const updateEvent = async (req, res) => {
  try {

    const { id } = req.params;

    let updateData = {
      title: req.body.title,
      location: req.body.location,
      category: req.body.category.toLowerCase(),
      date: req.body.date,
      time: req.body.time
    };

    // CLOUDINARY IMAGE UPDATE
    if (req.file) {

      const result = await cloudinary.uploader.upload(req.file.path);

      updateData.image = result.secure_url;
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: event
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= DELETE EVENT ================= */
export const deleteEvent = async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

/* ================= TOGGLE STATUS ================= */
export const toggleEventStatus = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    event.status =
      event.status === "active"
        ? "inactive"
        : "active";

    await event.save();

    res.json({
      success: true,
      status: event.status
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};