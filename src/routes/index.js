import express from "express"
import { addRoom, deleteRoom, getRoomById, getRooms, getRoomsByType, getTypeById, getTypeRooms, searchRoom, updateRoom } from "../controllers/room.js";
import { signin, signout, signup, getRole } from "../controllers/user/local.js";
import { addCartItem, getCartItem, removeCartItem } from "../controllers/cart.js";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getBookingInfo, getBookingItem, getBookings, updateBooking } from "../controllers/booking.js";
import { deleteUser, getTotalAccounts } from "../controllers/common.js";

const indexRouter = express.Router();

// Rooms
indexRouter.get('/rooms', getRooms);
indexRouter.get('/getroom', getRoomById);
indexRouter.post('/add-room', addRoom);
indexRouter.delete('/delete-room', deleteRoom);
indexRouter.patch('/update-room', updateRoom);
indexRouter.get('/rooms/type', getRoomsByType);
indexRouter.get('/rooms/types', getTypeRooms);
indexRouter.get('/rooms/type-by', getTypeById);
// indexRouter.post('/rooms/search', searchRoom);

// Lấy thông tin giỏ hàng
indexRouter.get('/getcart', getCartItem);
indexRouter.post('/add-cart-item', addCartItem);
indexRouter.delete('/remove-cart-item', removeCartItem);

// 
indexRouter.get('/allbookings', getAllBookings);
indexRouter.get('/bookings', getBookings);
indexRouter.get('/getbooking', getBookingById);
indexRouter.patch('/updatebooking', updateBooking);
indexRouter.get('/get-booking-item', getBookingItem);
indexRouter.post('/create-booking', createBooking);
indexRouter.delete('/delete-booking', deleteBooking);
indexRouter.get('/bookinginfo', getBookingInfo);

// user
indexRouter.post('/signin', signin);
indexRouter.post('/signup', signup);
indexRouter.post('/signout', signout);
indexRouter.get('/role', getRole);
indexRouter.delete('/delete-user', deleteUser);
indexRouter.get('/get-total-users', getTotalAccounts);


export default indexRouter;

