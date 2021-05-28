const router = require('express').Router();
const {LogModel} = require('../models');
const middleware = require("../middleware");

/**
===============
 * CREATE LOG
===============
*/

router.post('/create', middleware.validateSession, async (req, res) =>{
    const {description, definition, result} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try{
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ 
            message: "Unable to create log",
            error :err })
    }
});




module.exports = router;
