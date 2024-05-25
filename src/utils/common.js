const bcrypt = require('bcrypt');

// hash password trước khi lưu vào db
export const hashPassword = async password => {
    const bcrypt_saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, bcrypt_saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });

    return hashedPassword;
};

// kiểm tra password được gửi lên và password được lưu trong db
export const checkPassword = async (reqPassword, foundUser) => {
    const chkPwd = await new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
            if (err) {
                reject(err);
            }
            resolve(response);
        })
    );

    return chkPwd;
};

// kiểm tra email hợp lệ hay không
export const validEmail = email => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// kiểm tra độ dài password
export const pwdLen = (pwd, len) => {
    if (!pwd) return false;
    if (pwd.length < len) return false;
    return true;
};