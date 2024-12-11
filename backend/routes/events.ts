import express from "express";
const eventController = require("../controllers/eventController");
const ratingController = require("../controllers/ratingsController");

const router = express.Router();

router.post("/", eventController.addEvent);
router.get("/", eventController.getAllEvents);
router.delete("/:id", eventController.deleteEvent);
router.put("/:id", eventController.updateEvent);

router.post('/register', eventController.registerForEvent); //za prijavoNaDogodek
router.post('/deregister/:eventId', eventController.deregisterFromEvent);
router.get('/notifications/:userId', eventController.getUserNotifications);

router.post("/:eventId/ratings", ratingController.addRatingToEvent);
router.get("/:eventId/ratings", ratingController.getAllRatingsOfEvent);
router.delete("/ratings/:ratingId", ratingController.deleteRating);
router.put("/ratings/:ratingId", ratingController.updateRating);


export {router as eventRoutes};

//module.exports = router;
