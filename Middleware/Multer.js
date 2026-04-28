import multer from "multer";
import fs from "fs";

if (!fs.existsSync("upload")) {
  fs.mkdirSync("upload");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });