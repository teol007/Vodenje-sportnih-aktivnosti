import express from "express";
const eventController = require("../controllers/eventController");

const router = express.Router();

router.post("/", eventController.addEvent);
router.get("/", eventController.getAllEvents);
router.delete("/:id", eventController.deleteEvent);
router.put("/:id", eventController.updateEvent);

router.post('/register', eventController.registerForEvent); //za prijavoNaDogodek
router.post('/deregister/:eventId', eventController.deregisterFromEvent);
router.get('/notifications/:userId', eventController.getUserNotifications);


export {router as eventRoutes};

//module.exports = router;
