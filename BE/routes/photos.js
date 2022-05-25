const express = require('express');
const path = require("path")
const router = express.Router({ caseSensitive: false });
const PhotosModel = require("../model/Photos")
const multer = require("multer");
const crypto = require("crypto");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, callback) => {
        var filetype = '';
        if (file.mimetype === 'image/jpg') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        callback(null, 'image-' + crypto.randomBytes(3).toString('hex') + '-' +
            Date.now() + '.' + filetype);

    }
});

const upload = multer({
    storage: storage, fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})



router.get("/", (req, res) => {
    res.render("upload")
})

router.post("/", upload.single("imageUrl"), (req, res, next) => {
    // res.send("Image uploaded")
    console.log(req.file.path)

    console.log(req.body.albumId)
    let data = {
        albumId: req.body.albumId,
        userId: req.body.userId,
        name: req.body.name,
        imageUrl: req.file.path
    }
    try {
        const savedPhoto = PhotosModel.create(data)
        res.json({
            message: 'Photos Created successful',
            user: savedPhoto
        });

    } catch (err) {
        next(err)
    }
})




module.exports = router;