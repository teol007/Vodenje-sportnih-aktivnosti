"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const eventController = require("../controllers/eventController");
const router = express_1.default.Router();
exports.eventRoutes = router;
router.post("/", eventController.addEvent);
router.get("/", eventController.getAllEvents);
router.delete("/:id", eventController.deleteEvent);
router.put("/:id", eventController.updateEvent);
router.post('/register', eventController.registerForEvent); //za prijavoNaDogodek
router.post('/deregister/:eventId', eventController.deregisterFromEvent);
router.get('/notifications/:userId', eventController.getUserNotifications);
//module.exports = router;
