import { database } from '../models/pool';
import { deleteCartItem } from './cart';


export const getAllBookings = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM bookings';
        const dbData = await database.query(query);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching all bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: error.message
        });
    }
}

export const getBookings = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM bookings WHERE id_user = $1';
        const dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: error.message
        });
    }
}

export const getBookingById = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM bookings WHERE id = $1';
        let dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching get booking by id:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching get booking by id",
            error: error.message
        });
    }
}

export const getBookingItem = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM booking_item WHERE id_booking = $1';
        let dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching get booking item:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching get booking item",
            error: error.message
        });
    }
}

export const createBooking = async (req, res, error) => {
    try {
        const { name, email, total_price, id_user, address, phone, cart} = req.body;
        const query = 'INSERT INTO bookings (name, email, total_price, id_user, address, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        const dbData = await database.query(query, [name, email, total_price, id_user, address, phone])

        console.log(dbData[0])

        for (const item of cart) {
            await createBookingItem(dbData[0].id, item.id_room);
            await deleteCartItem(item.id);
        }

        return res.status(200).json({
            success: true,
            message: 'Booking successs'
        });
    } catch {
        console.error("Error fetching create booking:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching create booking",
            error: error.message
        });
    }
}

export const createBookingItem = async (id_booking, id_room) => {
    try {
        const query = 'SELECT price FROM rooms WHERE id = $1';
        const room = await database.query(query, [id_room]);

        const insertQuery = 'INSERT INTO booking_item (id_booking, id_room, total_price) VALUES ($1, $2, $3)';
        await database.query(insertQuery, [id_booking, id_room, room[0].price]);
    } catch {
        console.error("Error fetching Add booking item:", error);
        return;
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const requestId = req.query.id;
        const query = 'DELETE FROM bookings WHERE id = $1';
        await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            message: 'Delete booking success'
        });
    } catch {
        console.error("Error fetching delete booking:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delete booking",
            error: error.message
        });
    }
}

export const getBookingInfo = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM booking_item WHERE id_booking = $1';
        let dbData = await database.query(query, requestId);

        const result = []

        for (const item of dbData) {
            const queryRoom = 'SELECT * FROM rooms WHERE id = $1'
            const room = await database.query(queryRoom, item.id_room)
            result.push(room[0].name)
        }

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch {
        console.error("Error fetching get booking info:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching get booking info",
            error: error.message
        });
    }
}