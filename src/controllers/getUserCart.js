import { database } from '../models/pool';

export const getUserCart = async (req, res, error) => {
    try {
        const requestId = req.query.id; 
        const query = 'SELECT * FROM user_cart WHERE id_user = $1';
        let dbData = await database.many(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message
        });
    }
}
