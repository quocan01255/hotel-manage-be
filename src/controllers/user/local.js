import { database } from "../../models/pool";
import { findUser, createUser } from "../common";
import { validEmail, pwdLen, checkPassword, hashPassword } from "../../utils/common";
import { enToken } from "../../models/jwt";
import { errorCodeList } from "../../constants";
import { createCart } from "../cart";

export const signin = async (req, res) => {
    try {
        const userReq = req.body;
        const userEmail = userReq.email.toLowerCase();
        const userPwd = userReq.password;
        // console.log('signin:', userReq);

        // validation param
        if (!validEmail(userEmail) || !pwdLen(userPwd)) {
            return res.status(200).send({
                success: false,
                message: errorCodeList.invalid.message,
            });
        }

        // tìm user bằng email
        const user = await findUser(userEmail);
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not exist',
            });
        }

        // check password
        const chkPwd = await checkPassword(userPwd, user);

        // Đúng email và pass
        if (chkPwd) {
            // tạo token
            const token = enToken(user);

            // Lấy id user
            const queryId = 'SELECT id from accounts WHERE email = $1';
            const dbData = await database.one(queryId, userEmail);
            const userId = dbData.id;
            // gửi token về client
            return res.status(200).send({
                token,
                user: {userId, userEmail},
                message: 'Login success'
                // id: user.id,
            });
        } else {
            // Unauthorized
            return res.status(200).send({
                success: false,
                message: 'Wrong password'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'internal error',
        });
    }
};

// đăng ký
export const signup = async (req, res) => {
    try {
        const user = req.body;
        // console.log('signup param: ', user);

        const userPwd = user.password;
        const userEmail = user.email.toLowerCase();

        // validation param
        if (!validEmail(userEmail) || !pwdLen(userPwd)) {
            return res.status(200).send({
                success: false,
                message: errorCodeList.invalid.description,
            });
        }

        const userEmailExist = await findUser(userEmail);

        // nếu email đã đc đăng ký trước đó thì báo lỗi
        if (userEmailExist) {
            return res.status(200).send({
                success: false,
                message: errorCodeList.emailExist.description, // email exist error
            });
        }

        const hashPwd = await hashPassword(userPwd);

        // user.token = await createVerifyMail(user.locale, userEmail, user.name);

        // // if (!user.token) {
        // //   throw 'Can not create new user!';
        // // }

        user.password_digest = hashPwd;

        // tạo thêm user vào db
        const createdUser = await createUser(user);

        // const createdUser = 1;

        if (!createdUser) {
            throw 'Can not create new user!';
        }

        console.log(
            `++ New User added: ID[${createdUser.id}], Email[${userEmail}]'`
        );

        createCart(createdUser.id)

        return res.status(200).send({
            success: true,
            message: 'Register success'
        });
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            success: false,
            message: 'INE', // internal error
        });
    }
};

// đăng xuất
export const signout = async (req, res) => {
    try {
        return res.status(200).send({
            message: 'SignedOut',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: 'Cannot sign out',
        });
    }
};

export const getRole = async (req, res, error) => {
    try {
        const requestId = req.query.id;
        const query = 'SELECT role FROM accounts WHERE id = $1';
        let dbData = await database.many(query, requestId);

        return res.status(200).json({
            success: true,
            data: dbData,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Error fetching role",
            error: error.message
        });
    }
}
