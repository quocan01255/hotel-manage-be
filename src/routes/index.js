import express from "express"
import { getRooms } from "../controllers/getRooms.js";

const indexRouter = express.Router();

// Lấy thông tin phòng
indexRouter.get('/rooms', getRooms);

export default indexRouter;

