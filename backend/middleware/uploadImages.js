const multer = require("multer");

const StoreImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imageDoc"); // folder to save images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // keep original name
    }
});

const uploadImage = multer({
    storage: StoreImage
});

module.exports = uploadImage;
