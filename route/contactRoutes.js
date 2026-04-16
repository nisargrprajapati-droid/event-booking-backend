import express from "express";
import { addContact, contactList, deleteContact } from "../controller/contactController.js";

const router = express.Router();

router.post("/add", addContact);
router.get("/list", contactList);
router.delete("/delete/:id", deleteContact);

export default router;