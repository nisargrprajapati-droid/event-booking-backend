import Event from "../model/EventModel.js";

/* ================= CREATE EVENT ================= */
export const createEvent = async (req, res) => {
  try {

    let imageUrl = "";

    if (req.file) {
      imageUrl = `http://localhost:5000/upload/${req.file.filename}`;
    }

    const price = Number(req.body.price);

    const event = new Event({
      title: req.body.title,
      location: req.body.location,

      // ✅ ADMIN PRICE
      adminPrice: price,

      // ✅ SAME AS ADMIN (INITIAL)
      userPrice: price,

      // ✅ USER NOT MODIFIED
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
      message: "Event created successfully",
      data: event
    });

  } catch (error) {

    console.error("CREATE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });

  }
};

/* ================= GET ALL EVENTS (ADMIN) ================= */
export const getEvents = async (req, res) => {
  try {

    // ✅ ADMIN SHOULD SEE ALL EVENTS
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ================= GET EVENTS BY CATEGORY (USER) ================= */
export const getByCategory = async (req, res) => {
  try {

    const category = req.params.category.toLowerCase();

    // ✅ USER ONLY SEE ACTIVE EVENTS
    const events = await Event.find({
      category: category,
      status: "active"
    });

    res.status(200).json({
      success: true,
      data: events
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ================= GET SINGLE EVENT ================= */
export const getSingle = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });

  } catch (error) {

    res.status(500).json({
      success: false,
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
        success: false,
        message: "Event not found"
      });
    }

    const newPrice = Number(price);

    event.adminPrice = newPrice;

    // ✅ ONLY UPDATE USER PRICE IF USER HAS NOT CHANGED IT
    if (!event.isUserPriceManual) {
      event.userPrice = newPrice;
    }

    await event.save();

    res.json({
      success: true,
      message: "Admin price updated",
      data: event
    });

  } catch (error) {

    res.status(500).json({
      success: false,
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
        success: false,
        message: "Event not found"
      });
    }

    event.userPrice = Number(price);

    // ✅ USER HAS MANUALLY CHANGED PRICE
    event.isUserPriceManual = true;

    await event.save();

    res.json({
      success: true,
      message: "User price updated",
      data: event
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ================= UPDATE FULL EVENT ================= */
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

    if (req.file) {
      updateData.image = `http://localhost:5000/upload/${req.file.filename}`;
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Event updated successfully",
      data: event
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ================= DELETE EVENT ================= */
export const deleteEvent = async (req, res) => {
  try {

    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
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
        success: false,
        message: "Event not found"
      });
    }

    event.status = event.status === "active" ? "inactive" : "active";

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event status updated",
      status: event.status
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};