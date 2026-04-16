import Notification from "../model/NotificationModel.js";

// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification
      .find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: notifications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// MARK AS READ
export const markAsRead = async (req, res) => {

  try {

    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, {
      isRead: true
    });

    res.json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};