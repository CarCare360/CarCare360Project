const express = require('express');
const {setNewPassword} = require('../controllers/customerController');

const router = express.Router();

router.post('/',setNewPassword );

module.exports = router;
