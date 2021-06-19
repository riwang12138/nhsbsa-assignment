const express = require('express');

const router = express.Router();
const dataEntry = require('./data-entry');

const DATA_ENTRY_PATH = '/data-entry';

router.use('/', [dataEntry]);

/* Redirect to data entry page default */
router.get('/', (_, res) => {
  res.redirect(DATA_ENTRY_PATH);
});

module.exports = router;
