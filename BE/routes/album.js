const express = require('express');

const router = express.Router({ caseSensitive: false });
const AlbumModel = require("../model/Album")

router.get('/', (req, res) => {
    AlbumModel.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                message: 'No Album found'
            })
        }
        return res.status(200).json(result)
    })
})
router.post('/', async (req, res, next) => {
    let data = {
        userId: req.body.userId,
        name: req.body.name,
        lastUpdateDate: req.body.lastUpdateDate
    }
    console.log(data)
    try {
        const savedAlbum = await AlbumModel.create(data)
        res.json({
          message: 'Album Created successful',
          user: savedAlbum
        });
    
      } catch (err) {
        next(err)
      }
});
module.exports = router;