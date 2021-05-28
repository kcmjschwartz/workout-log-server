const router = require('express').Router();
const {LogModel} = require('../models');
const middleware = require("../middleware");

/*
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

/*
====================
* GET LOGS BY USER
====================
 */

router.get("/mine", middleware.validateSession, async(req, res) => {
    let {id} = req.user;
    try{
        const userLogs = await LogModel.findAll({
            where:{
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ 
            message: "Unable to retrieve logs",
            error: err });
    }
});

/*
=======================
* GET LOGS BY LOG ID
=======================
*/

router.get("/mine/:entryId", middleware.validateSession, async(req, res) => {
    const logId = req.params.entryId;
    const userId = req.user.id;
    try {
    const results = await LogModel.findAll({
        where: {
            id: logId,
            owner_id: userId
        }
    });
        res.status(200).json(results);
} catch (err) {
    res.status(500).json({
        message:'Unable to retrieve log',
        error: err
    })
}    
    
});

/*
=======================
* UPDATE LOGS 
=======================
*/




/*
=======================
* DELETE LOGS 
=======================
*/


module.exports = router;
