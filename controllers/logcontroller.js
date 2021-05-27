const Express = require('express');
const router = Express.Router();

router.get('/practice', (req,res) => {
    res.send('Practice')
});

module.exports = router;
