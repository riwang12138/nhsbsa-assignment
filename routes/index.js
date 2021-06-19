const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('data-entry', {
    title: 'Express'
  });
});

module.exports = router;
