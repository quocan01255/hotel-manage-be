import { database } from "../models/pool";

export const createCart = async (id_user) => {
    try {
        const query = 'INSERT INTO user_cart (id_user) VALUES ($1)';
        await database.none(query, id_user);

        return;
    } catch (err) {
        console.log(err);
        return;
    }
};

export const getCartItem = async (req, res, error) => {
    try {
        const requestId = req.query.id; 
        // Lấy id cart
        const queryCart = 'SELECT * from user_cart WHERE id_user = $1 limit 1'
        const cart = await database.query(queryCart, requestId)
        if (!cart || cart.length === 0) {
            return res.status(200).json({
                success: false,
                message: "User cart is not exist"
            })
        }

        // Lấy cart item
        const queryItem = 'SELECT * FROM cart_item WHERE id_cart = $1 limit 1';
        const dbData = await database.query(queryItem, cart[0].id);

        if (!dbData || dbData.length === 0) {
            return res.status(500).json({
                success: false,
                message: 'Cart is empty'
            })
        }

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