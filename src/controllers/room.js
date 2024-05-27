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

export const addRoom = async (req, res, error) => {
    try {
        const { name, quantity, details, img, price, check_in, check_out, description, type_id } = req.body;

        const query = 'INSERT INTO rooms (name, quantity, details, img, price, check_in, check_out, description, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        await database.query(query, [name, quantity, details, img, price, check_in, check_out, description, type_id]);

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
        const { name, quantity, details, img, price, check_in, check_out, description, type_id } = req.body;

        const query = 'UPDATE rooms SET name = $1, quantity = $2, details = $3, img = $4, price = $5, check_in = $6, check_out = $7, description = $8, type_id = $9 WHERE id = $10';
        await database.query(query, [name, quantity, details, img, price, check_in, check_out, description, type_id, requestId]);

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

export const deleteRoom = async (req, res) => {
    try {
        const requestId = req.query.id;
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