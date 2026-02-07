const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check file mimetype
    const allowedFileTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not supported"));
      return;
    }

    cb(null, "./uploads"); //cb(error,success) //cb(euta matra arguments)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
