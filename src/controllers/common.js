import { database } from "../models/pool";

// tìm user, mặc định là local
export const findUser = async (user_unique, strategy = 'local') => {
    if (!user_unique) {
        return null;
    }

    user_unique = user_unique.toLowerCase();

    let sqlQuery = 'SELECT * FROM accounts WHERE email = $1 limit 1';

    const user = await database.query(sqlQuery, [user_unique]);

    if (user.length === 0) {
        return null;
    } else {
        return user[0];
    }
};

export const createUser = async user => {
    // nếu user ko có tên (local signup)
    // thì tên nó chính là email trước @
    try {
        if (user.email) {
            user.email = user.email.toLowerCase();
        }

        if (!user.name) {
            user.name = user.email.split('@')[0];
        }

        const newUser = await database.query(
            `INSERT INTO accounts 
      (email, password_digest, name, token) VALUES 
      ($1, $2, $3, $4) RETURNING *`,
            [
                user.email,
                user.password_digest,
                user.name,
                user.token,
            ]
        );

        return newUser[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const deleteUser = async (req, res) => {
    try {
        const requestId = req.query.id;
        const query = 'DELETE FROM accounts WHERE id = $1';
        await database.query(query, requestId);

        return res.status(200).json({
            success: true,
            message: 'Delete user success'
        });
    } catch {
        console.error("Error fetching delete user:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delete user",
            error: error.message
        });
    }
}
