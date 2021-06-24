const express = require('express');

const dataEntry = express.Router();
const { validateChecks, validationResult } = require('../model/input-data');

const DATA_ENTRY_VIEW = 'data-entry';
const DATA_ENTRY_PATH = `/${DATA_ENTRY_VIEW}`;
const SUCCESS_PAGE_VIEW = 'success-page';
const SUCCESS_PAGE_PATH = `/${SUCCESS_PAGE_VIEW}`;

/* GET data-entry page. */
dataEntry.get(DATA_ENTRY_PATH, (_, res) => {
  res.render(DATA_ENTRY_VIEW);
});

dataEntry.post(DATA_ENTRY_PATH, validateChecks, (req, res) => {
  console.info(`Received input data :[${req.body.input}]`);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.info('Received validation errors, redirect to the data entry page');

    const [{ msg }] = errors.errors;

    req.flash('error', msg);
    // Use status 303 to redirect after a PUT or a POST, so that refreshing the result page doesn't re-trigger the operation.
    res.redirect(303, DATA_ENTRY_PATH);
    return;
  }

  res.redirect(SUCCESS_PAGE_PATH);
});

dataEntry.get(SUCCESS_PAGE_PATH, (_, res) => {
  // Use 201 success status response code indicates that the data entry has succeeded
  res.status(201).render(SUCCESS_PAGE_VIEW);
});

module.exports = dataEntry;
