import { database } from '../models/pool';

export const getRooms = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM rooms';
        let dbData = await database.query(query);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching rooms",
            error: error.message
        });
    }
}

export const getAvailableRooms = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM rooms WHERE status = $1';
        let dbData = await database.query(query, ['available']);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching available rooms:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching available rooms",
            error: error.message
        });
    }
}

export const getRoomById = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM rooms WHERE id = $1';
        let dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching get room:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching get room",
            error: error.message
        });
    }
}

export const getRoomsByType = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM rooms WHERE type_id = $1';
        let dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching rooms by types:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching rooms by types",
            error: error.message
        });
    }
}

export const addRoom = async (req, res, error) => {
    try {
        const { name, details, price, description, type_id } = req.body;
        let img = req.file ? req.file.filename  : null;

        if (img) {
            img = `${process.env.LIVE_API_URL}/static/images/${img}`;
        }

        const query = 'INSERT INTO rooms (name, details, img, price, description, type_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await database.query(query, [name, details, img, price, description, type_id, 'available']);

        return res.status(200).json({
            success: true,
            message: 'Add room success'
        });
    } catch {
        console.error("Error fetching add room:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching add room",
            error: error.message
        });
    }
}

export const updateRoom = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const { name, details, price, description, type_id } = req.body;
        let img = req.file ? req.file.filename  : null;

        if (img) {
            img = `${process.env.LIVE_API_URL}/static/images/${img}`;
        }

        const query = 'UPDATE rooms SET name = $1, details = $2, img = $3, price = $4, description = $5, type_id = $6 WHERE id = $7';
        await database.query(query, [name, details, img, price, description, type_id, requestId]);

        return res.status(200).json({
            success: true,
            message: 'Update room success'
        });
    } catch {
        console.error("Error fetching update room:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching update room",
            error: error.message
        });
    }
}

export const deleteRoom = async (req, res, error) => {
    try {
        const requestId = req.query.id;

        const deleteBooking = 'DELETE FROM booking_item WHERE id_room = $1';
        await database.query(deleteBooking, requestId);

        const deleteCart = 'DELETE FROM cart_item WHERE id_room = $1';
        await database.query(deleteCart, requestId);

        const query = 'DELETE FROM rooms WHERE id = $1';
        await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            message: 'Delete room success'
        });
    } catch {
        console.error("Error fetching delete room:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delete room",
            error: error.message
        });
    }
}

export const getTypeRooms = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM room_type';
        let dbData = await database.query(query);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching type rooms:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching type rooms",
            error: error.message
        });
    }
}

export const getTypeById = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT * FROM room_type WHERE id = $1';
        let dbData = await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        console.error("Error fetching get type by id:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching get type by id",
            error: error.message
        });
    }
}

export const addType = async (req, res, error) => {
    try {
        const { name } = req.body;

        const query = 'INSERT INTO room_type (name) VALUES ($1)';
        await database.query(query, [name]);

        return res.status(200).json({
            success: true,
            message: 'Add room type success'
        });
    } catch {
        console.error("Error fetching add room type:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching add room type",
            error: error.message
        });
    }
}

export const updateType = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const { name } = req.body;

        const query = 'UPDATE room_type SET name = $1 WHERE id = $2';
        await database.query(query, [name, requestId]);

        return res.status(200).json({
            success: true,
            message: 'Update type success'
        });
    } catch {
        console.error("Error fetching update type:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching update type",
            error: error.message
        });
    }
}

export const deleteType = async (req, res, error) => {
    try {
        const requestId = req.query.id;

        const deleteRoomByType = 'DELETE FROM rooms WHERE type_id = $1';
        await database.query(deleteRoomByType, requestId);

        const deleteType = 'DELETE FROM room_type WHERE id = $1';
        await database.query(deleteType, requestId);

        return res.status(200).json({
            success: true,
            message: 'Delete room type success'
        });
    } catch {
        console.error("Error fetching delete room type:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delete room type",
            error: error.message
        });
    }
}



// export const searchRoom = async (req, res, error) => {
//     try {
//         const { check_in, check_out } = req.body;
//         console.log(req.body)
//         const query = 'SELECT * FROM rooms WHERE check_in >= $1 AND $2 <= check_out';
//         let dbData = await database.query(query, [check_in, check_out]);

//         return res.status(200).json({
//             success: true,
//             data: dbData,
//         });
//     } catch {
//         console.error("Error fetching search room:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching search room",
//             error: error.message
//         });
//     }
// }

export const checkOut = async (req, res, error) => {
    try {
        const requestId = req.query.id;

        const query = 'UPDATE rooms SET status = $1 WHERE id = $2';
        await database.query(query, ['available', requestId]);

        return res.status(200).json({
            success: true,
            message: 'Check out room success'
        });
    } catch {
        console.error("Error fetching Check out room:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching Check out room",
            error: error.message
        });
    }
}

