const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Message Got!")
    res.send("API under Construction!");
});

module.exports = router;