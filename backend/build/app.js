"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const events_1 = require("./routes/events");
const users_1 = require("./routes/users");
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/api/events", events_1.eventRoutes);
exports.app.use("/api/users", users_1.usersRoutes);
if (process.env.NODE_ENV !== 'test') { // Prevent server startup during tests
    const PORT = process.env.PORT || 1234;
    exports.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
