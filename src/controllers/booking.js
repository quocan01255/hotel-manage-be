import { database } from '../models/pool';

export const getBookings = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM bookings';
        let dbData = await database.many(query);

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

export const createBooking = async (req, res) => {
    try {
        const { name, email, total_price, id_user, address, phone } = req.body;
        const query = 'INSERT INTO bookings (name, email, total_price, id_user, address, phone) VALUES ($1, $2, $3, $4, $5, $6)';
        await database.query(query, [name, email, total_price, id_user, address, phone])

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