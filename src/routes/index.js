import express from "express"
import { getRooms } from "../controllers/getRooms.js";
import { getUserCart } from "../controllers/getUserCart.js";
import { signin, signout, signup } from "../controllers/user/local.js";

const indexRouter = express.Router();

// Lấy thông tin phòng
indexRouter.get('/rooms', getRooms);

// Lấy thông tin giỏ hàng
indexRouter.get('/usercart', getUserCart);

// user
indexRouter.post('/signin', signin);
indexRouter.post('/signup', signup);
indexRouter.post('/signout', signout);

export default indexRouter;

