const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send({greeting : 'React x Node.js 연결'});
});

module.exports = router;