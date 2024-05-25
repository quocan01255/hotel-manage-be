import { database } from '../models/pool';

export const getRooms = async (req, res, error) => {
    try {
        const query = 'SELECT * FROM rooms';
        let dbData = await database.many(query);

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
