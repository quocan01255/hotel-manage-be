import express from "express"
import { addRoom, addType, checkOut, deleteRoom, deleteType, getAvailableRooms, getRoomById, getRooms, getRoomsByType, getTypeById, getTypeRooms, searchRoom, updateRoom, updateType } from "../controllers/room.js";
import { signin, signout, signup, getRole } from "../controllers/user/local.js";
import { addCartItem, getCartItem, removeCartByUserId, removeCartItem } from "../controllers/cart.js";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getBookingInfo, getBookingItem, getBookings, updateBooking } from "../controllers/booking.js";
import { deleteUser, getTotalAccounts } from "../controllers/common.js";
import { upload } from "../models/upload-img.js";

const indexRouter = express.Router();

// Rooms
indexRouter.get('/rooms', getRooms);
indexRouter.get('/getroom', getRoomById);
indexRouter.get('/rooms-available', getAvailableRooms);
indexRouter.post('/add-room', upload.single('image'), addRoom);
indexRouter.delete('/delete-room', deleteRoom);
indexRouter.patch('/update-room', upload.single('image'), updateRoom);
indexRouter.get('/rooms/type', getRoomsByType);
indexRouter.get('/rooms/types', getTypeRooms);
indexRouter.get('/rooms/type-by', getTypeById);
indexRouter.patch('/check-out', checkOut);
// indexRouter.post('/rooms/search', searchRoom);
indexRouter.post('/add-type', addType);
indexRouter.delete('/delete-type', deleteType);
indexRouter.patch('/update-type', updateType);

// Lấy thông tin giỏ hàng
indexRouter.get('/getcart', getCartItem);
indexRouter.post('/add-cart-item', addCartItem);
indexRouter.delete('/remove-cart-item', removeCartItem);
indexRouter.delete('/remove-cart-by-user', removeCartByUserId);

// booking
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

