import Contact from "../model/ContactModel.js";
import Notification from "../model/NotificationModel.js";
export const addContact = async (req, res) => {

  try {

    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    await contact.save();
    await Notification.create({
      title: "New Contact Message",
      type: "contact"
    });

    res.json({
      success: true,
      message: "Message Sent Successfully"
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ success: false });

  }

};

export const contactList = async (req, res) => {

  try {

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ success: false });

  }

};


export const deleteContact = async (req, res) => {

  try {

    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error deleting contact"
    });

  }

};