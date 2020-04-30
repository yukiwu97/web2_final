const router = require('express').Router();
const addRouter = require('./records');
const path = require('path');

// API routes
router.use('/record', addRouter);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;