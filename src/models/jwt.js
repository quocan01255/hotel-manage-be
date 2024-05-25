import { jwtExpiresIn, jwtSecret } from '../settings';

const jwt = require('jsonwebtoken');
const jwt_options = { expiresIn: jwtExpiresIn };

// tạo token từ user object
export const enToken = user => {
  const payload = { email: user.email, id: user.id, role: user.role };
  return jwt.sign(payload, jwtSecret, jwt_options);
};

// phân tích token
export const deToken = token => {
  try {
    return jwt.verify(token, jwtSecret, jwt_options);
  } catch (error) {
    return null;
  }
};
